<?php

namespace App\Http\Controllers\Api;

use App\Models\TeamMember;
use Illuminate\Database\Eloquent\Model;

class TeamMemberController extends ContentController
{
    protected string $model = TeamMember::class;

    protected function rules(?Model $record): array
    {
        return [
            'name' => ['required', 'string', 'max:120'],
            'role' => ['required', 'string', 'max:255'],
            'image' => ['nullable', 'string', 'max:255'],
            'position' => ['nullable', 'integer', 'min:0'],
        ];
    }
}
