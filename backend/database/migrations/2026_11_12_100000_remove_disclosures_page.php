<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

/**
 * The Disclosures page was taken off the website: remove its page record and categories, and the
 * menu and footer links and the cross-cutting theme link that pointed to it.
 */
return new class extends Migration
{
    public function up(): void
    {
        DB::table('pages')->where('slug', 'disclosures')->delete();
        DB::table('content_items')->where('collection', 'disclosure_categories')->delete();

        $points = fn (string $link) => (bool) preg_match('#^/disclosures(\#.*)?$#', trim($link));

        foreach (DB::table('content_items')->whereIn('collection', ['nav_menu', 'footer_columns', 'cross_cutting_themes'])->get() as $item) {
            $data = json_decode($item->data, true);
            if ($item->collection === 'cross_cutting_themes') {
                if (! $points($data['link_href'] ?? '')) {
                    continue;
                }
                $data['link_href'] = '/contact-us';
                $data['link_label'] = 'Contact PEN';
            } else {
                $links = array_values(array_filter($data['links'] ?? [], fn (string $line) => ! $points(trim(explode('|', $line, 2)[1] ?? ''))));
                if ($links === ($data['links'] ?? [])) {
                    continue;
                }
                $data['links'] = $links;
            }
            DB::table('content_items')->where('id', $item->id)->update(['data' => json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES)]);
        }
    }

    public function down(): void
    {
        // The removed page, categories and links are not restored.
    }
};
