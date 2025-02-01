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
        Schema::create('sales_prospect_commercial_plan', function (Blueprint $table) {
            $table->id();
            $table->foreignId('prospect_id')->constrained('sale_prospects')->onDelete('cascade');
            $table->string('prospect_sales_type_of_commercial_action')->nullable();
            $table->string('prospect_sales_object')->nullable();
            $table->text('description')->nullable();
            $table->json('documents')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sales_prospect_commercial_plan');
    }
};
