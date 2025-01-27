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
        Schema::create('business_owners', function (Blueprint $table) {
            $table->id();
            $table->string('company_name');
            $table->string('taxpayer_identification_number');
            $table->string('business_registration_number');
            $table->string('industry_sector')->nullable();
            $table->string('office_phone_number')->nullable();
            $table->string('whatsapp_contact')->nullable();
            $table->string('email');
            $table->string('head_office')->nullable();
            $table->string('po_box')->nullable();
            $table->integer('capital')->nullable();

            // Manager details
            $table->string('manager_pronouns_title')->nullable();
            $table->string('manager_name');
            $table->string('manager_gender')->nullable();
            $table->string('manager_contact')->nullable();
            $table->string('manager_date_of_birth')->nullable();
            $table->string('manager_place_of_birth')->nullable();
            $table->text('manager_address')->nullable();
            $table->string('manager_job_position')->nullable();
            $table->string('manager_type_of_document')->nullable();
            $table->string('manager_document_number')->nullable();
            $table->string('manager_date_of_issue')->nullable();
            $table->string('manager_authorizing_authority')->nullable();
            $table->string('manager_expiry_date')->nullable();

            // Additional fields
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
        Schema::dropIfExists('business_owners');
    }
};
