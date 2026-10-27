<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * Shared CRUD endpoints for an admin-managed content model.
 */
abstract class ContentController extends Controller
{
    /**
     * @var class-string<Model>
     */
    protected string $model;

    /**
     * Validation rules for creating or updating a record.
     *
     * @return array<string, mixed>
     */
    abstract protected function rules(?Model $record): array;

    protected function query(): Builder
    {
        return $this->model::query()->orderBy('position')->orderBy('id');
    }

    public function index(): JsonResponse
    {
        return response()->json(['data' => $this->query()->get()]);
    }

    public function store(Request $request): JsonResponse
    {
        $data = $this->validated($request, null);
        // New records go to the end of the list unless an explicit position is given.
        $data['position'] ??= $this->model::max('position') + 1;
        $record = $this->model::create($data);

        return response()->json(['data' => $record], 201);
    }

    public function show(string $id): JsonResponse
    {
        return response()->json(['data' => $this->model::findOrFail($id)]);
    }

    public function update(Request $request, string $id): JsonResponse
    {
        $record = $this->model::findOrFail($id);
        $record->update($this->validated($request, $record));

        return response()->json(['data' => $record]);
    }

    /**
     * @return array<string, mixed>
     */
    protected function validated(Request $request, ?Model $record): array
    {
        $data = $request->validate($this->rules($record));

        // A blank position keeps the stored order instead of writing NULL.
        if (array_key_exists('position', $data) && $data['position'] === null) {
            unset($data['position']);
        }

        return $data;
    }

    public function destroy(string $id): JsonResponse
    {
        $this->model::findOrFail($id)->delete();

        return response()->json(null, 204);
    }
}
