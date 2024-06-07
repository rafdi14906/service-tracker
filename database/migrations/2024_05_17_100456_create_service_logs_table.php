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
        Schema::create('service_logs', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('vehicle_id');
            $table->date('date');
            $table->string('transaction_number')->nullable();
            $table->string('workshop_name');
            $table->string('workshop_address');
            $table->string('workshop_phone')->nullable();
            $table->string('mechanic')->nullable();
            $table->unsignedInteger('grand_total_cost')->default(0);
            $table->unsignedInteger('total_service_cost')->default(0);
            $table->unsignedInteger('total_parts_cost')->default(0);
            $table->text('note')->nullable();
            $table->text('receipt_path')->nullable();
            $table->softDeletesTz();
            $table->timestampsTz();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('service_logs');
    }
};
