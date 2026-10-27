<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\ContentItem;
use App\Models\Faq;
use App\Models\Page;
use App\Models\Resource;
use App\Models\School;
use App\Models\TeamMember;
use Illuminate\Http\JsonResponse;

/**
 * Record counts for the admin dashboard, keyed by API path.
 */
class SummaryController extends Controller
{
    public function __invoke(): JsonResponse
    {
        $counts = ContentItem::query()->selectRaw('collection, count(*) as total')->groupBy('collection')->pluck('total', 'collection');

        return response()->json(['data' => [
            'pages' => Page::count(),
            'articles' => Article::count(),
            'faqs' => Faq::count(),
            'schools' => School::count(),
            'resources' => Resource::count(),
            'team-members' => TeamMember::count(),
            ...collect(ContentItem::collections())->mapWithKeys(fn (string $name) => ["collections/{$name}" => (int) ($counts[$name] ?? 0)]),
        ]]);
    }
}
