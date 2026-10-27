<?php

namespace Tests\Feature;

use App\Models\ContentItem;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class CollectionsApiTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        config([
            'content.collections.test_cards' => [
                'rules' => [
                    'title' => ['required', 'string', 'max:20'],
                    'points' => ['present', 'array'],
                    'points.*' => ['string'],
                ],
                'attributes' => ['points.*' => 'point'],
            ],
            'content.settings.test_contact' => [
                'rules' => [
                    'value' => ['required', 'array'],
                    'value.email' => ['required', 'email'],
                ],
                'attributes' => ['value.email' => 'email'],
            ],
        ]);
    }

    public function test_collection_endpoints_require_a_token(): void
    {
        $this->getJson('/api/collections/test_cards')->assertUnauthorized();
        $this->getJson('/api/summary')->assertUnauthorized();
    }

    public function test_collection_item_crud_and_ordering(): void
    {
        Sanctum::actingAs(User::factory()->create());

        $first = $this->postJson('/api/collections/test_cards', ['title' => 'First', 'points' => ['a', 'b']])
            ->assertCreated()
            ->assertJsonPath('data.position', 1)
            ->assertJsonPath('data.points.1', 'b')
            ->json('data.id');
        $this->postJson('/api/collections/test_cards', ['title' => 'Second', 'points' => [], 'position' => 0])
            ->assertCreated();

        $this->getJson('/api/collections/test_cards')->assertJsonPath('data.0.title', 'Second');

        $this->putJson("/api/collections/test_cards/{$first}", ['title' => 'Updated', 'points' => []])
            ->assertOk()
            ->assertJsonPath('data.title', 'Updated')
            ->assertJsonPath('data.position', 1);

        $this->postJson('/api/collections/test_cards', ['title' => str_repeat('x', 21), 'points' => []])
            ->assertJsonValidationErrors('title');
        $this->postJson('/api/collections/test_cards', ['title' => 'Extra', 'points' => [], 'unknown' => 'dropped'])
            ->assertCreated()
            ->assertJsonMissingPath('data.unknown');

        $this->deleteJson("/api/collections/test_cards/{$first}")->assertNoContent();
        $this->assertSame(2, ContentItem::where('collection', 'test_cards')->count());
    }

    public function test_unknown_collections_and_foreign_items_are_not_found(): void
    {
        Sanctum::actingAs(User::factory()->create());
        $item = ContentItem::create(['collection' => 'other', 'data' => ['title' => 'x'], 'position' => 1]);

        $this->getJson('/api/collections/missing')->assertNotFound();
        $this->getJson("/api/collections/test_cards/{$item->id}")->assertNotFound();
    }

    public function test_public_content_lists_every_collection_and_settings_use_their_schema(): void
    {
        Sanctum::actingAs(User::factory()->create());
        ContentItem::create(['collection' => 'test_cards', 'data' => ['title' => 'Shown', 'points' => []], 'position' => 1]);

        $this->getJson('/api/content')->assertJsonPath('collections.test_cards.0.title', 'Shown');

        $this->putJson('/api/settings/test_contact', ['value' => ['email' => 'nope']])
            ->assertJsonValidationErrors('value.email');
        $this->putJson('/api/settings/test_contact', ['value' => ['email' => 'info@example.org']])->assertOk();
        $this->getJson('/api/content')->assertJsonPath('settings.test_contact.email', 'info@example.org');

        $this->getJson('/api/summary')->assertJsonPath('data.collections/test_cards', 1);
    }
}
