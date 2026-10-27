<?php

namespace Database\Seeders;

use App\Models\Article;
use App\Models\ContentItem;
use App\Models\Faq;
use App\Models\Page;
use App\Models\Resource;
use App\Models\School;
use App\Models\Setting;
use App\Models\TeamMember;
use Illuminate\Database\Seeder;

/**
 * Imports the content currently published on the website (data/site-content.json).
 *
 * Tables that already hold records are skipped, so re-running never overwrites admin edits.
 */
class SiteContentSeeder extends Seeder
{
    public function run(): void
    {
        $content = json_decode(file_get_contents(__DIR__.'/data/site-content.json'), true, flags: JSON_THROW_ON_ERROR);

        $models = [
            'pages' => Page::class,
            'articles' => Article::class,
            'faqs' => Faq::class,
            'schools' => School::class,
            'resources' => Resource::class,
            'team' => TeamMember::class,
        ];

        foreach ($models as $key => $model) {
            if ($model::query()->exists()) {
                $this->command?->warn("Skipping {$key}: table already has records.");

                continue;
            }

            foreach ($content[$key] as $record) {
                $model::create($record);
            }
        }

        foreach ($content['collections'] ?? [] as $collection => $items) {
            if (ContentItem::where('collection', $collection)->exists()) {
                $this->command?->warn("Skipping {$collection}: collection already has items.");

                continue;
            }

            foreach (array_values($items) as $index => $data) {
                ContentItem::create(['collection' => $collection, 'data' => $data, 'position' => $index + 1]);
            }
        }

        foreach ($content['settings'] as $key => $value) {
            Setting::firstOrCreate(['key' => $key], ['value' => $value]);
        }
    }
}
