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
        Schema::create('sale_prospects', function (Blueprint $table) {
            $table->id();
            $table->string('prospect_sales_prospect_type');
            $table->string('prospect_sales_source_of_prospect');
            $table->string('prospect_sales_civility')->nullable();
            $table->string('prospect_sales_name_surname');
            $table->string('prospect_sales_phone')->nullable();
            $table->string('prospect_sales_contact_whatsapp')->nullable();
            $table->string('prospect_sales_email')->nullable();
            $table->string('prospect_sales_marital_status')->nullable();
            $table->string('prospect_sales_children')->nullable();
            $table->string('prospect_sales_profession')->nullable();
            $table->integer('prospect_sales_number_of_children')->default(0);
            $table->string('prospect_sales_type_of_need')->nullable();
            $table->string('prospect_sales_type_of_property')->nullable();
            $table->integer('prospect_sales_management_rentals')->nullable();
            $table->decimal('prospect_sales_management_rentals_income', 10, 2)->nullable();
            $table->integer('prospect_sales_management_percentage')->nullable();
            $table->decimal('prospect_sales_purchase_budget_min', 15, 2)->nullable();
            $table->decimal('prospect_sales_purchase_budget_max', 15, 2)->nullable();
            $table->text('prospect_sales_description')->nullable();
            $table->string('prospect_sales_would');
            $table->string('prospect_sales_municipality');
            $table->string('prospect_sales_neighborhood');
            $table->string('prospect_sales_photo')->nullable();
            $table->json('prospect_sales_documents')->nullable();
            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sale_prospects');
    }
};
