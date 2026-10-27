<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\Faq;
use App\Models\Page;
use App\Models\Resource;
use App\Models\School;
use App\Models\Setting;
use App\Models\TeamMember;
use Illuminate\Http\JsonResponse;

/**
 * Everything the public website renders, in one cacheable response.
 */
class SiteContentController extends Controller
{
    public function __invoke(): JsonResponse
    {
        return response()->json([
            'pages' => Page::query()->orderBy('slug')->get(['slug', 'title', 'heading', 'intro']),
            'articles' => Article::query()->orderBy('position')->orderBy('id')
                ->get(['slug', 'title', 'category', 'date_label', 'image', 'summary', 'body', 'source', 'source_url']),
            'faqs' => Faq::query()->orderBy('position')->orderBy('id')->get(['question', 'answer']),
            'schools' => School::query()->orderBy('position')->orderBy('id')
                ->get(['name', 'district', 'enrollment', 'boys', 'girls', 'map']),
            'resources' => Resource::query()->orderBy('position')->orderBy('id')->get(['type', 'title', 'url', 'image']),
            'team' => TeamMember::query()->orderBy('position')->orderBy('id')->get(['name', 'role', 'image']),
            'settings' => Setting::query()->pluck('value', 'key'),
        ]);
    }
}
