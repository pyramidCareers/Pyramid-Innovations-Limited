<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('webinar_payment_status', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id');
            $table->foreignId('webinar_id');
            $table->string('amount');
            $table->string('gateway');
            $table->string('status'); // 0 = false, 1 = true.
            $table->timestamps();

            $table->foreign(['user_id'])->references(['id'])->on('users');
            $table->foreign(['webinar_id'])->references(['id'])->on('mentor_webinars');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('webinar_payment_status');
    }
};