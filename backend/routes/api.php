<?php

use App\Http\Controllers\Api\ArticleController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CollectionItemController;
use App\Http\Controllers\Api\FaqController;
use App\Http\Controllers\Api\FormSubmissionController;
use App\Http\Controllers\Api\PageController;
use App\Http\Controllers\Api\ResourceController;
use App\Http\Controllers\Api\SchoolController;
use App\Http\Controllers\Api\SettingController;
use App\Http\Controllers\Api\SiteContentController;
use App\Http\Controllers\Api\SubmissionController;
use App\Http\Controllers\Api\SummaryController;
use App\Http\Controllers\Api\TeamMemberController;
use App\Http\Controllers\Api\UploadController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Support\Facades\Route;

Route::get('/content', SiteContentController::class);

Route::post('/auth/login', [AuthController::class, 'login'])->middleware('throttle:5,1');

Route::middleware('throttle:forms')->group(function () {
    Route::post('/forms/contact', [FormSubmissionController::class, 'contact']);
    Route::post('/forms/volunteer', [FormSubmissionController::class, 'volunteer']);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/auth/me', [AuthController::class, 'me']);
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::put('/auth/password', [UserController::class, 'password']);

    Route::apiResource('users', UserController::class)->only(['index', 'store', 'destroy']);

    Route::get('/summary', SummaryController::class);

    Route::apiResource('pages', PageController::class)->only(['index', 'show', 'update']);
    Route::apiResource('articles', ArticleController::class);
    Route::apiResource('faqs', FaqController::class);
    Route::apiResource('schools', SchoolController::class);
    Route::apiResource('resources', ResourceController::class);
    Route::apiResource('team-members', TeamMemberController::class);

    Route::get('/collections/{collection}', [CollectionItemController::class, 'index']);
    Route::post('/collections/{collection}', [CollectionItemController::class, 'store']);
    Route::get('/collections/{collection}/{id}', [CollectionItemController::class, 'show']);
    Route::put('/collections/{collection}/{id}', [CollectionItemController::class, 'update']);
    Route::delete('/collections/{collection}/{id}', [CollectionItemController::class, 'destroy']);

    Route::get('/settings', [SettingController::class, 'index']);
    Route::put('/settings/{key}', [SettingController::class, 'update']);

    Route::post('/uploads', UploadController::class);

    Route::apiResource('submissions', SubmissionController::class)->only(['index', 'show', 'update', 'destroy']);
    Route::get('/submissions/{submission}/files/{index}', [SubmissionController::class, 'file'])->whereNumber('index');
});
