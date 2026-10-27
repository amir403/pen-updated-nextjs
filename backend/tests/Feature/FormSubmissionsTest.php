<?php

namespace Tests\Feature;

use App\Models\Submission;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class FormSubmissionsTest extends TestCase
{
    use RefreshDatabase;

    private function contact(array $overrides = []): array
    {
        return [
            'topic' => 'Partnership',
            'name' => 'Ayesha Khan',
            'email' => 'ayesha@example.org',
            'subject' => 'Partnership idea',
            'message' => 'We would like to support a school library.',
            ...$overrides,
        ];
    }

    private function volunteer(array $overrides = []): array
    {
        return [
            'name' => 'Bilal Ahmed',
            'mobile' => '+92 300 1234567',
            'father_name' => 'Ahmed Ali',
            'cnic' => '35202-1234567-1',
            'email' => 'bilal@example.org',
            'address' => 'House 1, Lahore',
            ...$overrides,
        ];
    }

    public function test_contact_form_entries_are_saved(): void
    {
        $this->postJson('/api/forms/contact', $this->contact())->assertCreated();

        $submission = Submission::sole();
        $this->assertSame(['contact', 'new', 'Partnership'], [$submission->type, $submission->status, $submission->data['topic']]);
    }

    public function test_spam_and_invalid_entries_are_rejected(): void
    {
        $this->postJson('/api/forms/contact', $this->contact(['website' => 'http://spam.example']))->assertJsonValidationErrors('website');
        $this->postJson('/api/forms/contact', $this->contact(['message' => 'short', 'topic' => 'Other']))->assertJsonValidationErrors(['message', 'topic']);
        $this->postJson('/api/forms/volunteer', $this->volunteer(['cnic' => '123']))->assertJsonValidationErrors('cnic');
        $this->assertSame(0, Submission::count());
    }

    public function test_forms_are_rate_limited_per_visitor(): void
    {
        config(['services.forms.proxy_key' => 'shared-secret']);
        $relay = fn (string $ip) => ['X-Forms-Key' => 'shared-secret', 'X-Client-IP' => $ip];

        for ($i = 0; $i < 5; $i++) {
            $this->withHeaders($relay('203.0.113.1'))->postJson('/api/forms/contact', $this->contact())->assertCreated();
        }

        $this->withHeaders($relay('203.0.113.1'))->postJson('/api/forms/contact', $this->contact())->assertTooManyRequests();
        // A different visitor relayed by the same site is not affected.
        $this->withHeaders($relay('203.0.113.2'))->postJson('/api/forms/contact', $this->contact())->assertCreated();
        // A forged client IP without the shared key counts against the caller's own address.
        $this->withHeaders(['X-Client-IP' => '203.0.113.3'])->postJson('/api/forms/contact', $this->contact())->assertCreated();
    }

    public function test_volunteer_documents_are_stored_privately_and_downloadable_by_admins(): void
    {
        Storage::fake('local');

        $this->post('/api/forms/volunteer', [
            ...$this->volunteer(),
            'documents' => [UploadedFile::fake()->create('cnic.pdf', 100, 'application/pdf'), UploadedFile::fake()->image('photo.jpg')],
        ], ['Accept' => 'application/json'])->assertCreated();

        $submission = Submission::sole();
        $this->assertCount(2, $submission->files);
        Storage::disk('local')->assertExists($submission->files[0]['path']);
        $this->post('/api/forms/volunteer', [...$this->volunteer(), 'documents' => [UploadedFile::fake()->create('virus.exe', 10)]], ['Accept' => 'application/json'])
            ->assertJsonValidationErrors('documents.0');

        $this->getJson("/api/submissions/{$submission->id}/files/0")->assertUnauthorized();

        Sanctum::actingAs(User::factory()->create());
        $this->get("/api/submissions/{$submission->id}/files/0")->assertOk()->assertDownload('cnic.pdf');
        $this->get("/api/submissions/{$submission->id}/files/5")->assertNotFound();
        $this->getJson("/api/submissions/{$submission->id}")
            ->assertJsonPath('data.data.cnic', '35202-1234567-1')
            ->assertJsonPath('data.documents.1.name', 'photo.jpg')
            ->assertJsonMissingPath('data.files');

        $paths = array_column($submission->files, 'path');
        $this->deleteJson("/api/submissions/{$submission->id}")->assertNoContent();
        Storage::disk('local')->assertMissing($paths[0]);
    }

    public function test_admin_inbox_filters_and_statuses(): void
    {
        $this->postJson('/api/forms/contact', $this->contact())->assertCreated();
        $this->postJson('/api/forms/volunteer', $this->volunteer())->assertCreated();
        $this->getJson('/api/submissions')->assertUnauthorized();

        Sanctum::actingAs(User::factory()->create());
        $this->getJson('/api/summary')->assertJsonPath('data.submissions-new', 2);
        $this->getJson('/api/submissions')->assertJsonCount(2, 'data');
        $id = $this->getJson('/api/submissions?type=volunteer')->assertJsonCount(1, 'data')->json('data.0.id');

        $this->getJson("/api/submissions/{$id}")->assertJsonPath('data.status', 'read');
        $this->putJson("/api/submissions/{$id}", ['status' => 'archived'])->assertOk();
        $this->getJson('/api/submissions')->assertJsonCount(1, 'data');
        $this->getJson('/api/submissions?status=archived')->assertJsonCount(1, 'data');
        $this->putJson("/api/submissions/{$id}", ['status' => 'spam'])->assertJsonValidationErrors('status');
    }
}
