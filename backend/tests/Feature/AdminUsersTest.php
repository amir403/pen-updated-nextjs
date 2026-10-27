<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class AdminUsersTest extends TestCase
{
    use RefreshDatabase;

    public function test_admins_can_add_and_remove_other_admins(): void
    {
        $me = User::factory()->create();
        Sanctum::actingAs($me);

        $id = $this->postJson('/api/users', [
            'name' => 'Second Admin',
            'email' => 'second@pen.test',
            'password' => 'a-long-password-1',
            'password_confirmation' => 'a-long-password-1',
        ])->assertCreated()->assertJsonMissingPath('data.password')->json('data.id');

        $this->postJson('/api/users', ['name' => 'X', 'email' => 'second@pen.test', 'password' => 'short', 'password_confirmation' => 'other'])
            ->assertJsonValidationErrors(['email', 'password']);

        $this->getJson('/api/users')->assertJsonCount(2, 'data');
        $this->deleteJson("/api/users/{$me->id}")->assertJsonValidationErrors('user');
        $this->deleteJson("/api/users/{$id}")->assertNoContent();
        $this->assertSame(1, User::count());
    }

    public function test_password_change_requires_the_current_password_and_signs_out_other_sessions(): void
    {
        $user = User::factory()->create(['email' => 'me@pen.test', 'password' => 'the-old-password']);
        $other = $user->createToken('other')->plainTextToken;
        $current = $user->createToken('current')->plainTextToken;

        $this->withToken($current)->putJson('/api/auth/password', [
            'current_password' => 'wrong',
            'password' => 'the-new-password',
            'password_confirmation' => 'the-new-password',
        ])->assertJsonValidationErrors('current_password');

        $this->withToken($current)->putJson('/api/auth/password', [
            'current_password' => 'the-old-password',
            'password' => 'the-new-password',
            'password_confirmation' => 'the-new-password',
        ])->assertNoContent();

        $this->app['auth']->forgetGuards();
        $this->withToken($other)->getJson('/api/auth/me')->assertUnauthorized();
        $this->app['auth']->forgetGuards();
        $this->withToken($current)->getJson('/api/auth/me')->assertOk();
        $this->postJson('/api/auth/login', ['email' => 'me@pen.test', 'password' => 'the-new-password'])->assertOk();
    }

    public function test_user_endpoints_require_a_token(): void
    {
        $this->getJson('/api/users')->assertUnauthorized();
        $this->putJson('/api/auth/password', [])->assertUnauthorized();
    }
}
