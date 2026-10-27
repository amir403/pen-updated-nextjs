<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Five form submissions per visitor every ten minutes.
        RateLimiter::for('forms', fn (Request $request) => Limit::perMinutes(10, 5)->by($this->formsClient($request)));
    }

    /**
     * The visitor's IP address. Requests relayed by the Next.js site carry it in X-Client-IP,
     * trusted only alongside the shared FORMS_PROXY_KEY.
     */
    private function formsClient(Request $request): string
    {
        $key = config('services.forms.proxy_key');
        $relayed = $key && hash_equals($key, (string) $request->header('X-Forms-Key')) ? $request->header('X-Client-IP') : null;

        return 'forms|'.($relayed ?: $request->ip());
    }
}
