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
        Schema::create('employers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id');
            $table->string('org_name')->nullable();
            $table->text('org_details')->nullable();
            $table->string('logo')->nullable();
            $table->string('location')->nullable();
            $table->string('org_address1')->nullable();
            $table->string('org_address2')->nullable();
            $table->string('org_url')->nullable();
            $table->string('org_size_upper_limit')->nullable();
            $table->string('org_size_lower_limit')->nullable();
            $table->string('industry')->nullable();
            $table->timestamps();
            $table->foreign(['user_id'])->references(['id'])->on('users')->onDelete('CASCADE');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('employers');
    }
};
