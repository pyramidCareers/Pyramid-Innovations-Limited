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
        Schema::create('webinar_payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('webinar_id');
            $table->foreignId('user_id');
            $table->timestamps();

            $table->foreign('webinar_id')->references('id')->on('mentor_webinars');  
            $table->foreign('user_id')->references('id')->on('users'); 

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('webinar_payments');
    }
};
