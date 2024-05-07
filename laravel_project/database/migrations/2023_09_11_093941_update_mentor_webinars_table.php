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
        Schema::table('webinar_payments', function (Blueprint $table) {
            // Rename columns to match the 'payments' table
            $table->renameColumn('user_id', 'user_id');
            $table->renameColumn('webinar_id', 'webinar_id');
            $table->string('payment_type');
            $table->string('gateway');
            $table->string('payment_status');
            $table->string('transaction_id');
            $table->string('amount')->default("0");
            $table->string('currency');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mentor_webinars');
    }
};