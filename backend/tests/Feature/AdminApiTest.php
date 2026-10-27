<?php

namespace Tests\Feature;

use App\Models\Article;
use App\Models\Page;
use App\Models\School;
use App\Models\User;
use Database\Seeders\SiteContentSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class AdminApiTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();
        $this->seed(SiteContentSeeder::class);
    }

    public function test_public_content_contains_seeded_site_data(): void
    {
        $this->getJson('/api/content')
            ->assertOk()
            ->assertJsonCount(31, 'pages')
            ->assertJsonCount(9, 'articles')
            ->assertJsonCount(268, 'schools')
            ->assertJsonCount(51, 'resources')
            ->assertJsonCount(8, 'team')
            ->assertJsonPath('settings.social_media.5.label', 'YouTube');
    }

    public function test_seeding_twice_does_not_duplicate_or_overwrite(): void
    {
        Page::where('slug', 'faq')->update(['title' => 'Edited']);
        $this->seed(SiteContentSeeder::class);

        $this->assertSame(268, School::count());
        $this->assertSame('Edited', Page::where('slug', 'faq')->value('title'));
    }

    public function test_admin_endpoints_require_a_token(): void
    {
        $this->getJson('/api/articles')->assertUnauthorized();
        $this->putJson('/api/pages/1', [])->assertUnauthorized();
    }

    public function test_login_issues_a_token_that_can_log_out(): void
    {
        User::factory()->create(['email' => 'admin@pen.test', 'password' => 'correct-horse-battery']);

        $this->postJson('/api/auth/login', ['email' => 'admin@pen.test', 'password' => 'wrong'])
            ->assertUnprocessable();

        $token = $this->postJson('/api/auth/login', ['email' => 'admin@pen.test', 'password' => 'correct-horse-battery'])
            ->assertOk()
            ->json('token');

        $this->withToken($token)->getJson('/api/auth/me')->assertJsonPath('data.email', 'admin@pen.test');
        $this->withToken($token)->postJson('/api/auth/logout')->assertNoContent();
        $this->assertDatabaseCount('personal_access_tokens', 0);
    }

    public function test_article_crud(): void
    {
        Sanctum::actingAs(User::factory()->create());

        $payload = [
            'slug' => 'new-library-opening',
            'title' => 'A new library opens',
            'category' => 'News',
            'date_label' => '1 November 2026',
            'image' => '/images/camp.jpg',
            'summary' => 'Summary.',
            'body' => ['First paragraph.', 'Second paragraph.'],
            'source' => 'Library opening',
            'source_url' => 'https://pen.org.pk/new-library-opening/',
        ];

        $id = $this->postJson('/api/articles', $payload)
            ->assertCreated()
            ->assertJsonPath('data.position', 10)
            ->json('data.id');

        $this->postJson('/api/articles', $payload)->assertJsonValidationErrors('slug');
        $this->postJson('/api/articles', [...$payload, 'slug' => 'faq'])->assertJsonValidationErrors('slug');
        $this->postJson('/api/articles', [...$payload, 'source_url' => 'not a url'])->assertJsonValidationErrors('source_url');

        $this->putJson("/api/articles/{$id}", [...$payload, 'title' => 'Updated'])
            ->assertOk()
            ->assertJsonPath('data.title', 'Updated')
            ->assertJsonPath('data.body.1', 'Second paragraph.');

        $this->deleteJson("/api/articles/{$id}")->assertNoContent();
        $this->assertSame(9, Article::count());
    }

    public function test_every_seeded_record_collection_item_and_setting_passes_validation(): void
    {
        Sanctum::actingAs(User::factory()->create());

        $endpoints = ['pages', 'articles', 'faqs', 'schools', 'resources', 'team-members'];

        foreach ($endpoints as $endpoint) {
            foreach ($this->getJson("/api/{$endpoint}")->json('data') as $record) {
                $this->putJson("/api/{$endpoint}/{$record['id']}", $record)->assertOk();
            }
        }

        foreach (array_keys(config('content.collections')) as $collection) {
            $items = $this->getJson("/api/collections/{$collection}")->json('data');
            $this->assertNotEmpty($items, "{$collection} has no seed items");

            foreach ($items as $item) {
                $this->putJson("/api/collections/{$collection}/{$item['id']}", $item)->assertOk();
            }
        }

        foreach ($this->getJson('/api/settings')->json('data') as $key => $value) {
            $this->putJson("/api/settings/{$key}", ['value' => $value])->assertOk();
        }
    }

    public function test_pages_can_be_edited_but_not_created_or_deleted(): void
    {
        Sanctum::actingAs(User::factory()->create());
        $page = Page::where('slug', 'faq')->firstOrFail();

        $this->putJson("/api/pages/{$page->id}", ['title' => 'FAQ', 'heading' => 'Questions', 'intro' => 'Answers.'])
            ->assertOk()
            ->assertJsonPath('data.slug', 'faq');

        $this->postJson('/api/pages', [])->assertMethodNotAllowed();
        $this->deleteJson("/api/pages/{$page->id}")->assertMethodNotAllowed();
    }

    public function test_settings_are_validated_by_key(): void
    {
        Sanctum::actingAs(User::factory()->create());

        $this->putJson('/api/settings/social_media', ['value' => [['label' => 'Facebook', 'href' => 'https://facebook.com/pen']]])
            ->assertOk();
        $this->putJson('/api/settings/social_media', ['value' => [['label' => 'Facebook', 'href' => 'not a url']]])
            ->assertJsonValidationErrors('value.0.href');
        $this->putJson('/api/settings/unknown', ['value' => []])->assertNotFound();

        $this->getJson('/api/content')->assertJsonPath('settings.social_media.0.href', 'https://facebook.com/pen');
    }

    public function test_image_upload(): void
    {
        Storage::fake('public');
        Sanctum::actingAs(User::factory()->create());

        $url = $this->postJson('/api/uploads', ['file' => UploadedFile::fake()->image('photo.jpg')])
            ->assertCreated()
            ->json('url');

        Storage::disk('public')->assertExists(str_replace('/storage/', '', parse_url($url, PHP_URL_PATH)));
        $this->postJson('/api/uploads', ['file' => UploadedFile::fake()->create('report.pdf', 200, 'application/pdf')])
            ->assertCreated();
        $this->postJson('/api/uploads', ['file' => UploadedFile::fake()->create('doc.php', 1)])
            ->assertJsonValidationErrors('file');
        $this->postJson('/api/uploads', ['file' => UploadedFile::fake()->create('big.pdf', 10241, 'application/pdf')])
            ->assertJsonValidationErrors('file');
    }
}
