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
        Schema::create('job_ready_courses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('job_id');
            $table->string('course_id');
            $table->string('course_name');
            $table->timestamps();

            $table->foreign(['job_id'])->references(['id'])->on('jobs')->onDelete('CASCADE');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('job_ready_courses');
    }
};
