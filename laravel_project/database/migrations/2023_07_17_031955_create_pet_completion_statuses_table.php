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
        Schema::create('pet_completion_statuses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id');
            $table->string('moodle_user_id');
            $table->string('course_id');
            $table->string('email');
            $table->dateTime('time_completed');
            $table->string('status'); // 0 = false, 1 = true.
            $table->timestamps();

            $table->foreign(['user_id'])->references(['id'])->on('users')->onDelete('CASCADE');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('p_e_t_completion_statuses');
    }
};
