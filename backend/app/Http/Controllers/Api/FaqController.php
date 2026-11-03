<?php

namespace App\Http\Controllers\Api;

use App\Models\Faq;
use Illuminate\Database\Eloquent\Model;

class FaqController extends ContentController
{
    protected string $model = Faq::class;

    protected function rules(?Model $record): array
    {
        return [
            'question' => ['required', 'string', 'max:255'],
            'answer' => ['required', 'string', 'max:2000'],
            'position' => ['nullable', 'integer', 'min:0'],
        ];
    }
}
