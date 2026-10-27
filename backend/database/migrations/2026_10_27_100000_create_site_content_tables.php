<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('pages', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('title');
            $table->string('heading');
            $table->text('intro');
            $table->timestamps();
        });

        Schema::create('articles', function (Blueprint $table) {
            $table->id();
            $table->string('slug')->unique();
            $table->string('title');
            $table->string('category');
            // Free text: stories use labels such as "Student stories" instead of dates.
            $table->string('date_label');
            $table->string('image');
            $table->text('summary');
            $table->json('body');
            // Title of the original story; also used as the image description.
            $table->string('source')->nullable();
            $table->string('source_url', 500)->nullable();
            $table->unsignedInteger('position')->default(0);
            $table->timestamps();
        });

        Schema::create('faqs', function (Blueprint $table) {
            $table->id();
            $table->string('question');
            $table->text('answer');
            $table->unsignedInteger('position')->default(0);
            $table->timestamps();
        });

        Schema::create('schools', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('district');
            $table->unsignedInteger('enrollment')->nullable();
            $table->unsignedInteger('boys')->nullable();
            $table->unsignedInteger('girls')->nullable();
            $table->string('map', 1000)->nullable();
            $table->unsignedInteger('position')->default(0);
            $table->timestamps();
        });

        Schema::create('resources', function (Blueprint $table) {
            $table->id();
            $table->string('type');
            $table->string('title');
            $table->string('url', 1000);
            $table->string('image')->nullable();
            $table->unsignedInteger('position')->default(0);
            $table->timestamps();
            $table->index(['type', 'position']);
        });

        Schema::create('team_members', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('role');
            $table->string('image')->nullable();
            $table->unsignedInteger('position')->default(0);
            $table->timestamps();
        });

        Schema::create('settings', function (Blueprint $table) {
            $table->string('key')->primary();
            $table->json('value');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('settings');
        Schema::dropIfExists('team_members');
        Schema::dropIfExists('resources');
        Schema::dropIfExists('schools');
        Schema::dropIfExists('faqs');
        Schema::dropIfExists('articles');
        Schema::dropIfExists('pages');
    }
};
