<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Model;

/**
 * A contact or volunteer form entry sent from the website.
 */
#[Fillable(['type', 'status', 'name', 'email', 'phone', 'subject', 'message', 'data', 'files'])]
#[Hidden(['files'])]
class Submission extends Model
{
    public const STATUSES = ['new', 'read', 'archived'];

    /**
     * The entry as the admin API returns it; file paths stay on the server.
     *
     * @return array<string, mixed>
     */
    public function toApi(): array
    {
        return [
            ...$this->toArray(),
            'documents' => array_map(fn (array $file) => ['name' => $file['name'], 'size' => $file['size']], $this->files),
        ];
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'data' => 'array',
            'files' => 'array',
        ];
    }
}
