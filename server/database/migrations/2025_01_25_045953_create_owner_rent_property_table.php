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
        Schema::create('owner_rent_property', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('owner_id')->nullable(); 
            $table->string('owner'); // Foreign key for Owner
            $table->string('property_name');
            $table->string('type_of_property');
            $table->integer('number_of_floors');
            $table->integer('number_of_rentals');
            $table->string('type_of_numbering');
            $table->string('area_m2');
            $table->decimal('market_value', 15, 2);
            $table->string('island');
            $table->string('batch');
            $table->string('block');
            $table->string('cie_identifier_number');
            $table->string('sodeci_identifier_number');
            $table->text('description')->nullable();
            $table->string('city');
            $table->string('municipality');
            $table->string('neighborhood');
            $table->decimal('longitude', 10, 7)->nullable();
            $table->decimal('latitude', 10, 7)->nullable();
            $table->integer('height')->nullable();
            $table->integer('altitude')->nullable();
            $table->string('on_the_corner')->nullable();
            $table->string('near_water')->nullable();
            $table->string('feet_in_the_water')->nullable();
            $table->string('distance_from_water')->nullable();
            $table->string('on_the_main_road')->nullable();
            $table->string('distance_from_road')->nullable();
            $table->string('dry_land')->nullable();
            $table->string('low_depth')->nullable();
            $table->string('school_nearby')->nullable();
            $table->string('market_nearby')->nullable();
            $table->json('assigned_agents')->nullable();
            $table->string('photo')->nullable();
            $table->json('documents')->nullable();
            $table->integer('level')->nullable();
            $table->string('door_number')->nullable();
            $table->string('rental_type');
            $table->integer('rent');
            $table->integer('charges')->nullable();
            $table->integer('room')->nullable();
            $table->float('area')->nullable();
            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('owner_rent_property');
    }
};
