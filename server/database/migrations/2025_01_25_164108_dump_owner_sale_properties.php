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
        Schema::create('owner_sale_properties', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('owner_id')->nullable(); 
            $table->foreign('owner_id')
                  ->references('id')     
                  ->on('owners')         
                  ->onDelete('set null'); 
            $table->string('owner');
            $table->string('property_name');
            $table->string('type_of_property');
            $table->integer('number_of_floors')->nullable();
            $table->float('area')->nullable();
            $table->decimal('market_value', 15, 2)->nullable();
            $table->string('island')->nullable();
            $table->string('batch')->nullable();
            $table->string('cie_identifier_number')->nullable();
            $table->string('sodeci_identifier_number')->nullable();
            $table->string('boundary_marking_done')->nullable();
            $table->string('domain_type')->nullable();
            $table->string('has_title_deed')->nullable();
            $table->string('serviced')->nullable();
            $table->string('approved')->nullable();
            $table->text('description')->nullable();
            $table->string('city')->nullable();
            $table->string('municipality')->nullable();
            $table->string('neighborhood')->nullable();
            $table->float('longitude')->nullable();
            $table->float('latitude')->nullable();
            $table->float('height')->nullable();
            $table->float('altitude')->nullable();
            $table->integer('number_of_parking_spaces')->nullable();
            $table->integer('number_of_levels')->nullable();
            $table->string('garden')->nullable();
            $table->string('pool')->nullable();
            $table->string('on_the_corner')->nullable();
            $table->string('near_water')->nullable();
            $table->string('feet_in_water')->nullable();
            $table->integer('distance_from_water')->nullable();
            $table->string('on_main_road')->nullable();
            $table->integer('distance_from_road')->nullable();
            $table->string('dry_land')->nullable();
            $table->string('low_depth')->nullable();
            $table->string('school_nearby')->nullable();
            $table->string('market_nearby')->nullable();
            $table->json('assigned_agents')->nullable();
            $table->string('photo')->nullable();
            $table->json('documents')->nullable();
            $table->timestamps();

        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
    }
};
