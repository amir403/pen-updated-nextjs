<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['slug', 'title', 'category', 'date_label', 'image', 'summary', 'body', 'source', 'source_url', 'position'])]
class Article extends Model
{
    /**
     * Categories the website groups articles under.
     */
    public const CATEGORIES = ['News', 'PEN heroes', 'Blog'];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'body' => 'array',
        ];
    }
}
