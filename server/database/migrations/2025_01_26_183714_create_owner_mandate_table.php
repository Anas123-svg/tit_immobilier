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
        Schema::create('owner_mandate', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('owner_id');
            $table->string('type_of_mandate');
            $table->string('owner_name');
            $table->string('very_concerned');
            $table->string('type_of_property');
            $table->string('neighborhood');
            $table->string('tax_payable');
            $table->string('billing_type');
            $table->decimal('commission', 10, 2);
            $table->string('deduct_commission');
            $table->string('vat_on_commission');
            $table->string('date_of_signature');
            $table->string('debut_date');
            $table->string('end_date');
            $table->string('digital_signature_of_the_mandate');
            $table->string('tacit_renewal');
            $table->timestamps();
            $table->foreign('owner_id')->references('id')->on('owners')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('owner_mandate');
    }
};
