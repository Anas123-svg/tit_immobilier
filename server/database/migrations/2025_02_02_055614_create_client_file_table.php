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
        Schema::create('client_file', function (Blueprint $table) {
            $table->id();
            $table->foreignId('client_id')->nullable()->constrained('clients')->nullOnDelete();
            $table->string('customer_name')->nullable();
            $table->string('legal_status')->nullable();
            $table->string('contact')->nullable();
            $table->string('email')->nullable();
            $table->date('opening_date')->nullable();
            $table->text('opening_reason')->nullable();
            $table->string('business_manager')->nullable();
            $table->string('digital_signature_of_file')->nullable();
            $table->json('details')->nullable();
            $table->json('additional_options')->nullable();
            $table->json('documents')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('client_file');
    }
};
