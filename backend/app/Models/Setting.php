<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Model;

#[Fillable(['key', 'value'])]
class Setting extends Model
{
    protected $primaryKey = 'key';

    public $incrementing = false;

    protected $keyType = 'string';

    /**
     * Settings the admin panel may edit, with their validation rules.
     *
     * @return array<string, array<string, mixed>>
     */
    public static function rules(): array
    {
        return [
            'social_media' => [
                'value' => ['present', 'array'],
                'value.*.label' => ['required', 'string', 'max:60'],
                'value.*.href' => ['nullable', 'url', 'max:500'],
            ],
        ];
    }

    /**
     * Readable attribute names for validation messages.
     *
     * @return array<string, string>
     */
    public static function attributes(): array
    {
        return [
            'value.*.label' => 'label',
            'value.*.href' => 'link',
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
            'value' => 'array',
        ];
    }
}
