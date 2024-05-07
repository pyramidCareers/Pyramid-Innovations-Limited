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
        Schema::create('job_seekers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id');
            $table->boolean('jobseeking_status')->default(true);
            $table->double('expected_salary', 9, 2)->default(0);
            $table->string('currency')->default('BDT');
            $table->integer('current_notice_period')->default(30);
            $table->string('current_profession')->nullable();
            $table->string('industry')->nullable();
            $table->string('speciality')->nullable();
            $table->string('field_of_study')->nullable();
            $table->string('resume')->nullable();
            $table->timestamps();
            $table->foreign(['user_id'])->references(['id'])->on('users')->onDelete('CASCADE');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('job_seekers');
    }
};