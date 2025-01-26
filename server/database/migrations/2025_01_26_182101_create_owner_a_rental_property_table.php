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
        Schema::create('owner_a_rental_property', function (Blueprint $table) {
            $table->id();
            $table->foreignId('owner_id')->constrained('owners')->onDelete('cascade');
            $table->string('owner_name');
            $table->string('very_concerned')->nullable( );
            $table->string('type_of_property')->nullable();
            $table->integer('numerotation')->nullable();
            $table->decimal('total', 10, 2);
            $table->string('door_no');
            $table->string('type_of_rental');
            $table->string('floor');
            $table->integer('number_of_rooms');
            $table->decimal('surface', 8, 2);
            $table->decimal('rent_amount', 10, 2);
            $table->decimal('amount_of_charges', 10, 2);
            $table->string('profile_photo')->nullable();
            $table->json('documents')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('owner_a_rental_property');
    }
};
