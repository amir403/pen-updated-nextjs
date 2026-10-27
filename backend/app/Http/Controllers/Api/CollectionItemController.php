<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ContentItem;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * CRUD for the items of a configured collection (config/content.php).
 */
class CollectionItemController extends Controller
{
    public function index(string $collection): JsonResponse
    {
        $this->schema($collection);

        return response()->json([
            'data' => ContentItem::query()->inCollection($collection)->get()->map->toApi(),
        ]);
    }

    public function store(Request $request, string $collection): JsonResponse
    {
        [$data, $position] = $this->validated($request, $collection);

        $item = ContentItem::create([
            'collection' => $collection,
            'data' => $data,
            // New items go to the end of the list unless an explicit position is given.
            'position' => $position ?? ContentItem::where('collection', $collection)->max('position') + 1,
        ]);

        return response()->json(['data' => $item->toApi()], 201);
    }

    public function show(string $collection, string $id): JsonResponse
    {
        return response()->json(['data' => $this->find($collection, $id)->toApi()]);
    }

    public function update(Request $request, string $collection, string $id): JsonResponse
    {
        $item = $this->find($collection, $id);
        [$data, $position] = $this->validated($request, $collection);

        $item->update(['data' => $data, ...($position === null ? [] : ['position' => $position])]);

        return response()->json(['data' => $item->toApi()]);
    }

    public function destroy(string $collection, string $id): JsonResponse
    {
        $this->find($collection, $id)->delete();

        return response()->json(null, 204);
    }

    /**
     * @return array<string, mixed>
     */
    private function schema(string $collection): array
    {
        return config("content.collections.{$collection}") ?? abort(404);
    }

    private function find(string $collection, string $id): ContentItem
    {
        $this->schema($collection);

        return ContentItem::where('collection', $collection)->findOrFail($id);
    }

    /**
     * Validated item fields and the requested position (null keeps the stored order).
     *
     * @return array{0: array<string, mixed>, 1: int|null}
     */
    private function validated(Request $request, string $collection): array
    {
        $schema = $this->schema($collection);
        $data = $request->validate(
            [...$schema['rules'], 'position' => ['nullable', 'integer', 'min:0']],
            [],
            $schema['attributes'] ?? [],
        );
        $position = $data['position'] ?? null;
        unset($data['position']);

        return [$data, $position];
    }
}
