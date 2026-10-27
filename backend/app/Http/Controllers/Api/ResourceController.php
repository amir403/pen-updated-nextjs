<?php

namespace App\Http\Controllers\Api;

use App\Models\Resource;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Validation\Rule;

class ResourceController extends ContentController
{
    protected string $model = Resource::class;

    protected function query(): Builder
    {
        return Resource::query()->orderBy('type')->orderBy('position')->orderBy('id');
    }

    protected function rules(?Model $record): array
    {
        return [
            'type' => ['required', Rule::in(Resource::TYPES)],
            'title' => ['required', 'string', 'max:255'],
            'url' => ['required', 'url', 'max:1000'],
            'image' => ['nullable', 'string', 'max:255'],
            'position' => ['nullable', 'integer', 'min:0'],
        ];
    }
}
