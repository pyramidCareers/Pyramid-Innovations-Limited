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
        Schema::create('cv_templates', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id');
            $table->string('name')->default('cv_template_name');
            $table->string('description')->nullable();
            $table->string('link');
            $table->string('tag')->nullable();
            $table->timestamps();
            $table->foreign(['user_id'])->references(['id'])->on('users')->onDelete('CASCADE');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cv_templates');
    }
};
