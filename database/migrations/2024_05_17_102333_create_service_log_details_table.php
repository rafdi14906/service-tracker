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
        Schema::create('service_log_details', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('service_log_id');
            $table->string('service_name');
            $table->unsignedInteger('service_cost')->default(0);
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
        Schema::dropIfExists('service_log_details');
    }
};
