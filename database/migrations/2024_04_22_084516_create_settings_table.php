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
        Schema::create('settings', function (Blueprint $table) {
            $table->id();
            $table->string('retail_name');
            $table->string('retail_address');
            $table->string('retail_phone');
            $table->string('retail_email');
            $table->string('retail_logo')->nullable();
            $table->string('retail_favicon')->nullable();
            $table->unsignedBigInteger('created_by')->nullable();
            $table->unsignedBigInteger('updated_by')->nullable();
            $table->unsignedBigInteger('deleted_by')->nullable();
            $table->softDeletesTz();
            $table->timestampsTz();
            $table->foreign('created_by')->references('id')->on('users')->noActionOnDelete();
            $table->foreign('updated_by')->references('id')->on('users')->noActionOnDelete();
            $table->foreign('deleted_by')->references('id')->on('users')->noActionOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('settings');
    }
};
