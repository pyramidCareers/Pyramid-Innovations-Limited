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
        Schema::create('cv_access_requests', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id');
            $table->string('number_of_cv');
            $table->string('status')->default('pending');
            $table->string('approved_by')->nullable();
            $table->timestamps();
            $table->foreign(['user_id'])->references(['id'])->on('users')->onDelete('CASCADE');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cv_access_requests');
    }
};
