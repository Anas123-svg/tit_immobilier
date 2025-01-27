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
        Schema::create('private_owners', function (Blueprint $table) {
            $table->id();
            $table->string('pronouns')->nullable();
            $table->string('name');
            $table->string('gender')->nullable();
            $table->string('birth_date')->nullable();
            $table->string('place_of_birth')->nullable();
            $table->text('address')->nullable();
            $table->string('nationality')->nullable();
            $table->string('document_type')->nullable();
            $table->string('document_number')->nullable();
            $table->string('date_of_issue')->nullable();
            $table->string('expiry_date')->nullable();
            $table->string('taxpayer_identification_number')->nullable();
            $table->string('occupation')->nullable();
            $table->string('contact')->nullable();
            $table->string('whatsapp_contact')->nullable();
            $table->string('email')->unique();
            $table->string('po_box')->nullable();
            $table->string('marital_status')->nullable();
            $table->string('spouses_name')->nullable();
            $table->integer('number_of_children')->nullable();
            $table->string('employer_name')->nullable();
            $table->string('bank_statement_rib')->nullable();
            $table->string('emergency_contact_name')->nullable();
            $table->string('emergency_contact')->nullable();
            $table->string('emergency_contact_relation')->nullable();
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
        Schema::dropIfExists('private_owners');
    }
};
