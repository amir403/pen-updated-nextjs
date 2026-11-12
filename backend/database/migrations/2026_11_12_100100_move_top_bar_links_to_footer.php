<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

/**
 * The top bar above the header was removed. Its PEN Academy and Contact us links move to the footer
 * columns (Careers is already there as "Work with us"), and the unused top bar text is dropped.
 */
return new class extends Migration
{
    public function up(): void
    {
        $additions = [
            'Discover PEN' => ['PEN Academy | /pen-academy', 'Corporate information | /corporate-information'],
            'Make a difference' => ['Contact us | /contact-us', null],
        ];

        foreach (DB::table('content_items')->where('collection', 'footer_columns')->get() as $item) {
            $data = json_decode($item->data, true);
            [$line, $before] = $additions[$data['heading'] ?? ''] ?? [null, null];
            $links = $data['links'] ?? [];
            if ($line === null || collect($links)->contains(fn (string $link) => str_ends_with(trim($link), explode('|', $line)[1]))) {
                continue;
            }
            $at = $before === null ? false : array_search($before, $links, true);
            array_splice($links, $at === false ? count($links) : $at, 0, [$line]);
            $data['links'] = $links;
            DB::table('content_items')->where('id', $item->id)->update(['data' => json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES)]);
        }

        $site = DB::table('settings')->where('key', 'site')->first();
        if ($site) {
            $value = json_decode($site->value, true);
            unset($value['topbar_text']);
            DB::table('settings')->where('key', 'site')->update(['value' => json_encode($value, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES)]);
        }
    }

    public function down(): void
    {
        // The links stay in the footer.
    }
};
