<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Submission;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Symfony\Component\HttpFoundation\StreamedResponse;

/**
 * The admin inbox of contact and volunteer form entries.
 */
class SubmissionController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $filters = $request->validate([
            'type' => ['nullable', 'in:contact,volunteer'],
            'status' => ['nullable', Rule::in(Submission::STATUSES)],
        ]);

        $submissions = Submission::query()
            ->when($filters['type'] ?? null, fn ($query, $type) => $query->where('type', $type))
            ->when($filters['status'] ?? null, fn ($query, $status) => $query->where('status', $status), fn ($query) => $query->where('status', '!=', 'archived'))
            ->latest()
            ->limit(500)
            ->get(['id', 'type', 'status', 'name', 'email', 'subject', 'created_at']);

        return response()->json(['data' => $submissions]);
    }

    /**
     * Opening an entry marks it as read.
     */
    public function show(Submission $submission): JsonResponse
    {
        if ($submission->status === 'new') {
            $submission->update(['status' => 'read']);
        }

        return response()->json(['data' => $submission->toApi()]);
    }

    public function update(Request $request, Submission $submission): JsonResponse
    {
        $submission->update($request->validate(['status' => ['required', Rule::in(Submission::STATUSES)]]));

        return response()->json(['data' => $submission->toApi()]);
    }

    public function destroy(Submission $submission): JsonResponse
    {
        Storage::disk('local')->delete(array_column($submission->files, 'path'));
        $submission->delete();

        return response()->json(null, 204);
    }

    public function file(Submission $submission, int $index): StreamedResponse
    {
        $file = $submission->files[$index] ?? abort(404);

        return Storage::disk('local')->download($file['path'], $file['name']);
    }
}
