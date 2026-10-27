<?php

use App\Http\Controllers\Api\ArticleController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\FaqController;
use App\Http\Controllers\Api\PageController;
use App\Http\Controllers\Api\ResourceController;
use App\Http\Controllers\Api\SchoolController;
use App\Http\Controllers\Api\SettingController;
use App\Http\Controllers\Api\SiteContentController;
use App\Http\Controllers\Api\TeamMemberController;
use App\Http\Controllers\Api\UploadController;
use Illuminate\Support\Facades\Route;

Route::get('/content', SiteContentController::class);

Route::post('/auth/login', [AuthController::class, 'login'])->middleware('throttle:5,1');

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/auth/me', [AuthController::class, 'me']);
    Route::post('/auth/logout', [AuthController::class, 'logout']);

    Route::apiResource('pages', PageController::class)->only(['index', 'show', 'update']);
    Route::apiResource('articles', ArticleController::class);
    Route::apiResource('faqs', FaqController::class);
    Route::apiResource('schools', SchoolController::class);
    Route::apiResource('resources', ResourceController::class);
    Route::apiResource('team-members', TeamMemberController::class);

    Route::get('/settings', [SettingController::class, 'index']);
    Route::put('/settings/{key}', [SettingController::class, 'update']);

    Route::post('/uploads', UploadController::class);
});
