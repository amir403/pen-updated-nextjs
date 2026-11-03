<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Submission;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;

/**
 * Public endpoints for the website's contact and volunteer forms.
 *
 * Both reject requests that fill the hidden "website" field, which people never see but
 * spam bots usually complete, and are rate limited (see AppServiceProvider).
 */
class FormSubmissionController extends Controller
{
    public const TOPICS = ['General enquiry', 'Partnership', 'Volunteering', 'Careers', 'Donations'];

    public function contact(Request $request): JsonResponse
    {
        $data = $request->validate([
            'website' => ['prohibited'],
            'topic' => ['required', 'in:'.implode(',', self::TOPICS)],
            'name' => ['required', 'string', 'max:120'],
            'email' => ['required', 'email', 'max:200'],
            'phone' => ['nullable', 'string', 'max:40'],
            'subject' => ['required', 'string', 'max:180'],
            'message' => ['required', 'string', 'min:10', 'max:2000'],
        ]);

        Submission::create([
            'type' => 'contact',
            'name' => $data['name'],
            'email' => $data['email'],
            'phone' => $data['phone'] ?? null,
            'subject' => $data['subject'],
            'message' => $data['message'],
            'data' => ['topic' => $data['topic']],
            'files' => [],
        ]);

        return response()->json(['message' => 'Thank you. Your message has been sent to the PEN team.'], 201);
    }

    public function volunteer(Request $request): JsonResponse
    {
        $data = $request->validate([
            'website' => ['prohibited'],
            'name' => ['required', 'string', 'max:120'],
            'mobile' => ['required', 'string', 'max:40', 'regex:/^\+?[0-9 ()-]{7,}$/'],
            'father_name' => ['required', 'string', 'max:120'],
            'cnic' => ['required', 'string', 'regex:/^\d{5}-?\d{7}-?\d$/'],
            'email' => ['required', 'email', 'max:200'],
            'institution' => ['nullable', 'string', 'max:200'],
            'degree' => ['nullable', 'string', 'max:200'],
            'address' => ['required', 'string', 'max:500'],
            'message' => ['nullable', 'string', 'max:2000'],
            'documents' => ['nullable', 'array', 'max:5'],
            'documents.*' => ['file', 'mimes:pdf,jpg,jpeg,png', 'max:5120'],
        ], [], ['father_name' => 'father name', 'cnic' => 'CNIC', 'documents.*' => 'document']);

        $files = array_map(fn (UploadedFile $file) => [
            'name' => $file->getClientOriginalName(),
            'path' => $file->store('submissions/'.now()->format('Y/m'), 'local'),
            'size' => $file->getSize(),
        ], $request->file('documents', []));

        Submission::create([
            'type' => 'volunteer',
            'name' => $data['name'],
            'email' => $data['email'],
            'phone' => $data['mobile'],
            'subject' => 'Volunteer application',
            'message' => $data['message'] ?? null,
            'data' => [
                'father_name' => $data['father_name'],
                'cnic' => $data['cnic'],
                'institution' => $data['institution'] ?? null,
                'degree' => $data['degree'] ?? null,
                'address' => $data['address'],
            ],
            'files' => $files,
        ]);

        return response()->json(['message' => 'Thank you. Your application has been sent to the PEN team.'], 201);
    }
}
