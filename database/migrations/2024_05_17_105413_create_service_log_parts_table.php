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
        Schema::create('service_log_parts', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('service_log_id');
            $table->string('part_code')->nullable();
            $table->string('part_name');
            $table->unsignedInteger('part_quantity')->default(0);
            $table->unsignedInteger('part_cost')->default(0);
            $table->unsignedBigInteger('subtotal_part_cost')->default(0);
            $table->boolean('is_guarantee')->default(false);
            $table->date('guarantee_until')->nullable();
            $table->foreign('service_log_id')->references('id')->on('service_logs')->onDelete('cascade');
            $table->softDeletesTz();
            $table->timestampsTz();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('service_log_parts');
    }
};
