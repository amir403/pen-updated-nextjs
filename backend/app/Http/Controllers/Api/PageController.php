<?php

namespace App\Http\Controllers\Api;

use App\Models\Page;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

/**
 * Page slugs map to routes in the Next.js site, so pages are edited but never created or deleted.
 */
class PageController extends ContentController
{
    protected string $model = Page::class;

    protected function query(): Builder
    {
        return Page::query()->orderBy('slug');
    }

    protected function rules(?Model $record): array
    {
        return [
            'title' => ['required', 'string', 'max:120'],
            'heading' => ['required', 'string', 'max:200'],
            'intro' => ['required', 'string', 'max:1000'],
        ];
    }
}
