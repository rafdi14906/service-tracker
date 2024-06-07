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
        Schema::create('vehicles', function (Blueprint $table) {
            $table->id();
            $table->string('category');
            $table->string('plate_number')->unique();
            $table->string('brand');
            $table->string('seri');
            $table->string('type')->nullable();
            $table->string('cylinder_capacity');
            $table->string('year');
            $table->string('fuel_type');
            $table->string('color')->nullable();
            $table->string('model');
            $table->string('chassis_number')->nullable();
            $table->string('engine_number')->nullable();
            $table->softDeletesTz();
            $table->timestampsTz();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vehicles');
    }
};
