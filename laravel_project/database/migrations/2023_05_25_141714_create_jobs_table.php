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
        Schema::create('jobs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('employer_user_id');
            $table->string('title');
            $table->longText('description');
            $table->longText('requirement_details');
            $table->longText('additional_requirements');
            $table->longText('responsibilities');
            $table->double('salary_lower_limit', 9, 2)->default(0);
            $table->double('salary_upper_limit', 9, 2)->default(0);
            $table->string('currency');
            $table->text('other_benefits')->nullable();
            $table->string('location')->nullable();
            $table->string('category')->nullable();
            $table->timestamps();
            $table->foreign(['employer_user_id'])->references(['id'])->on('users')->onDelete('CASCADE');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jobs');
    }
};
