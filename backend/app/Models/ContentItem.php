<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

/**
 * One item of an admin-managed collection (see config/content.php).
 */
#[Fillable(['collection', 'data', 'position'])]
class ContentItem extends Model
{
    /**
     * Names of the configured collections.
     *
     * @return list<string>
     */
    public static function collections(): array
    {
        return array_keys(config('content.collections'));
    }

    /**
     * Items of a collection in display order.
     *
     * @param  Builder<ContentItem>  $query
     */
    public function scopeInCollection(Builder $query, string $collection): void
    {
        $query->where('collection', $collection)->orderBy('position')->orderBy('id');
    }

    /**
     * The item as the admin API returns it: its fields plus id and position.
     *
     * @return array<string, mixed>
     */
    public function toApi(): array
    {
        return ['id' => $this->id, 'position' => $this->position, ...$this->data];
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
        ];
    }
}
