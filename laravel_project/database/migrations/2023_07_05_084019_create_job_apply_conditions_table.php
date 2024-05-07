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
        Schema::create('job_apply_conditions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('job_id');
            $table->string('condition_type'); // PET, Experience, Certification etc.
            $table->string('condition_value');  // Course id (Moodle), years of exp, developer certification etc.
            $table->string('condition_description')->nullable(); // Course name, keyword, description of cert etc.
            $table->timestamps();

            $table->foreign(['job_id'])->references(['id'])->on('jobs')->onDelete('CASCADE');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('job_apply_conditions');
    }
};
