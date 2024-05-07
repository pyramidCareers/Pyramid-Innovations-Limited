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
        Schema::create('career_pages', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id');
            $table->string('verified')->default(0);
            $table->string('brandcolor')->nullable();
            $table->string('cover')->nullable();
            $table->string('galleryimage1')->nullable();
            $table->string('galleryimage2')->nullable();
            $table->string('galleryimage3')->nullable();
            $table->string('galleryimage4')->nullable();
            $table->string('galleryimage5')->nullable();
            $table->string('fblink')->nullable();
            $table->string('linkedinlink')->nullable();
            $table->string('email')->nullable();
            $table->timestamps();
            $table->foreign(['user_id'])->references(['id'])->on('users')->onDelete('CASCADE');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('career_pages');
    }
};
