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
        Schema::create('location_prospect_official_response', function (Blueprint $table) {
            $table->id();
            $table->foreignId('prospect_id')->constrained('sale_prospects')->onDelete('cascade');
            $table->string('pre_booking')->default(false);
            $table->string('status')->nullable();
            $table->string('availability')->nullable();
            $table->string('assessment')->nullable();
            $table->text('assessment_from_us')->nullable();
            $table->string('object')->nullable();
            $table->text('comments')->nullable();
            $table->json('documents')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('location_prospect_official_response');
    }
};
