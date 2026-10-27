<?php

namespace App\Http\Controllers\Api;

use App\Models\School;
use Illuminate\Database\Eloquent\Model;

class SchoolController extends ContentController
{
    protected string $model = School::class;

    protected function rules(?Model $record): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'district' => ['required', 'string', 'max:120'],
            'enrollment' => ['nullable', 'integer', 'min:0'],
            'boys' => ['nullable', 'integer', 'min:0'],
            'girls' => ['nullable', 'integer', 'min:0'],
            'map' => ['nullable', 'url', 'max:1000'],
            'position' => ['nullable', 'integer', 'min:0'],
        ];
    }
}
