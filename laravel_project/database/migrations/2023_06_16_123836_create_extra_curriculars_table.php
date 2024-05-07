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
        Schema::create('extra_curriculars', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id');
            $table->string('organization_name');
            $table->string('role')->default('volunteer')->nullable();
            $table->string('category')->default('environment')->nullable();
            $table->dateTime('start_date')->nullable();
            $table->dateTime('end_date')->nullable();
            $table->text('description')->nullable();
            $table->timestamps();

            //Make migration command and the fillables/rules in model

            $table->foreign(['user_id'])->references(['id'])->on('users')->onDelete('CASCADE');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('extra_curriculars');
    }
};
