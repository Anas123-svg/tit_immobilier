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
        Schema::create('sales_prospect_offer', function (Blueprint $table) {
            $table->id();
            $table->string('prospect_sales_type_of_offer')->nullable();
            $table->integer('free_offer_area')->nullable();
            $table->integer('free_offer_bathroom')->nullable();
            $table->integer('free_offer_quantity')->nullable();
            $table->string('free_offer_featured_offer')->nullable();
            $table->text('free_offer_description')->nullable();
            $table->decimal('free_offer_longitude', 10, 7)->nullable();
            $table->decimal('free_offer_latitude', 10, 7)->nullable();
            $table->string('free_offer_photo')->nullable();
            $table->json('free_offer_documents')->nullable();
            $table->integer('rooms')->nullable();
            $table->integer('showers')->nullable();
            $table->integer('living_rooms')->nullable();
            $table->integer('garages')->nullable();
            $table->integer('cuisine')->nullable();
            $table->boolean('wifi')->default(false);
            $table->boolean('air_conditioner')->default(false);
            $table->boolean('parking')->default(false);
            $table->boolean('pool')->default(false);
            $table->boolean('emergency_exit')->default(false);
            $table->boolean('security_guard')->default(false);
            $table->boolean('fire_hydrant')->default(false);
            $table->json('gallery')->nullable();
            $table->string('video')->nullable();
            $table->json('plan')->nullable();
            $table->string('real_estate_dev_programme')->nullable();
            $table->string('real_estate_dev_home')->nullable();
            $table->string('sub_div_project')->nullable();
            $table->string('subdivision')->nullable();
            $table->string('subdivision_island')->nullable();
            $table->string('subdivision_lot')->nullable();
            $table->string('house_for_sale')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sales_prospect_offer');
    }
};
