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
        Schema::create('cv_access_request_filters', function (Blueprint $table) {
            $table->id();
            $table->foreignId('request_id');
            $table->string('filter_name');
            $table->string('filter_value');
            $table->timestamps();
            $table->foreign(['request_id'])->references(['id'])->on('cv_access_requests')->onDelete('CASCADE');
           
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cv_access_request_filters');
    }
};
