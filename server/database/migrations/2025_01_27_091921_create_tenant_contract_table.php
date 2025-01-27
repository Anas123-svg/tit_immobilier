<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tenant_contracts', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('owner_id')->nullable();
            $table->foreign('owner_id')
                ->references('id')
                ->on('owners')
                ->onDelete('set null');
            $table->unsignedBigInteger('tenant_id')->nullable();
            $table->foreign('tenant_id')
                ->references('id')
                ->on('tenants')
                ->onDelete('set null');
            $table->string('concerned')->nullable();
            $table->string('location')->nullable();
            $table->decimal('cost_of_rent', 15, 2)->nullable();
            $table->string('contract_type')->nullable();

            $table->string('date_of_signature')->nullable();
            $table->string('entry_date')->nullable();
            $table->string('end_date')->nullable();
            $table->integer('Number_of_months_of_deposit')->nullable();
            $table->decimal('deposit_amount', 15, 2)->nullable();
            $table->string('caution_to_be_paid')->nullable();

            $table->integer('number_of_months_in_advance')->nullable();
            $table->decimal('advance_amount', 15, 2)->nullable();
            $table->integer('penalty_for_delay')->nullable();
            $table->string('payment_limit')->nullable();
            $table->string('tacit_renewal')->nullable();
            $table->string('Frequency')->nullable();
            $table->string('digital_signature_of_the_contract')->nullable();
            $table->string('due_date')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tenant_contract');
    }
};
