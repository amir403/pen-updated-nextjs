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
     * Validation schema for an editable setting (config/content.php), or null when the key is unknown.
     *
     * @return array{rules: array<string, mixed>, attributes?: array<string, string>}|null
     */
    public static function schema(string $key): ?array
    {
        return config("content.settings.{$key}");
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
