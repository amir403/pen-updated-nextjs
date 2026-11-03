<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SettingController extends Controller
{
    public function index(): JsonResponse
    {
        return response()->json(['data' => Setting::query()->pluck('value', 'key')]);
    }

    public function update(Request $request, string $key): JsonResponse
    {
        $schema = Setting::schema($key) ?? abort(404);
        $value = $request->validate($schema['rules'], [], $schema['attributes'] ?? [])['value'];
        $setting = Setting::updateOrCreate(['key' => $key], ['value' => $value]);

        return response()->json(['data' => $setting->value]);
    }
}
