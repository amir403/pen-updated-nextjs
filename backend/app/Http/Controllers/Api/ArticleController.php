<?php

namespace App\Http\Controllers\Api;

use App\Models\Article;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Validation\Rule;

class ArticleController extends ContentController
{
    protected string $model = Article::class;

    protected function rules(?Model $record): array
    {
        return [
            'slug' => ['required', 'string', 'max:160', 'regex:/^[a-z0-9]+(?:-[a-z0-9]+)*$/', Rule::unique('articles')->ignore($record), Rule::unique('pages', 'slug')],
            'title' => ['required', 'string', 'max:200'],
            'category' => ['required', Rule::in(Article::CATEGORIES)],
            'date_label' => ['required', 'string', 'max:60'],
            'image' => ['required', 'string', 'max:255'],
            'summary' => ['required', 'string', 'max:500'],
            'body' => ['required', 'array', 'min:1'],
            'body.*' => ['required', 'string', 'max:5000'],
            'source' => ['nullable', 'string', 'max:255'],
            'source_url' => ['nullable', 'url', 'max:500'],
            'position' => ['nullable', 'integer', 'min:0'],
        ];
    }
}
