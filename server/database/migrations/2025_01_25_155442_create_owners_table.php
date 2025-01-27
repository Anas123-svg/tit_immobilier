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
        Schema::create('owners', function (Blueprint $table) {
            $table->id();
            //private owners
            $table->string('private_pronouns')->nullable();
            $table->string('private_name')->nullable();
            $table->string('private_gender')->nullable();
            $table->string('private_birth_date')->nullable();
            $table->string('private_place_of_birth')->nullable();
            $table->text('private_address')->nullable();
            $table->string('private_nationality')->nullable();
            $table->string('private_document_type')->nullable();
            $table->string('private_document_number')->nullable();
            $table->string('private_date_of_issue')->nullable();
            $table->string('private_expiry_date')->nullable();
            $table->string('private_taxpayer_identification_number')->nullable();
            $table->string('private_occupation')->nullable();
            $table->string('private_contact')->nullable();
            $table->string('private_whatsapp_contact')->nullable();
            $table->string('private_email')->nullable();
            $table->string('private_po_box')->nullable();
            $table->string('private_marital_status')->nullable();
            $table->string('private_spouses_name')->nullable();
            $table->integer('private_number_of_children')->nullable();
            $table->string('private_employer_name')->nullable();
            $table->string('private_bank_statement_rib')->nullable();
            $table->string('private_emergency_contact_name')->nullable();
            $table->string('private_emergency_contact')->nullable();
            $table->string('private_emergency_contact_relation')->nullable();
            $table->string('private_photo')->nullable();
            $table->json('private_documents')->nullable();
            //business owners
            $table->string('business_company_name')->nullable();
            $table->string('business_taxpayer_identification_number')->nullable();
            $table->string('business_business_registration_number')->nullable();
            $table->string('business_industry_sector')->nullable();
            $table->string('business_office_phone_number')->nullable();
            $table->string('business_whatsapp_contact')->nullable();
            $table->string('business_email')->nullable();
            $table->string('business_head_office')->nullable();
            $table->string('business_po_box')->nullable();
            $table->integer('business_capital')->nullable();
            $table->string('business_manager_pronouns_title')->nullable();
            $table->string('business_manager_name')->nullable( );
            $table->string('business_manager_gender')->nullable();
            $table->string('business_manager_contact')->nullable();
            $table->string('business_manager_date_of_birth')->nullable();
            $table->string('business_manager_place_of_birth')->nullable();
            $table->text('business_manager_address')->nullable();
            $table->string('business_manager_job_position')->nullable();
            $table->string('business_manager_type_of_document')->nullable();
            $table->string('business_manager_document_number')->nullable();
            $table->string('business_manager_date_of_issue')->nullable();
            $table->string('business_manager_authorizing_authority')->nullable();
            $table->string('business_manager_expiry_date')->nullable();
            $table->string('business_photo')->nullable();
            $table->json('business_documents')->nullable();
            $table->boolean('is_business_owner')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('owners');
    }
};
