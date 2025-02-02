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
        Schema::create('tenant_payment', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('tenant_id')->nullable();
            $table->foreign('tenant_id')
                ->references('id')
                ->on('tenants')
                ->onDelete('set null');

            $table->unsignedBigInteger('contract_id')->nullable();
            $table->foreign('contract_id')
                ->references('id')
                ->on('tenant_contracts')
                ->onDelete('set null');
            $table->string('type_payment')->nullable();
            $table->string('Treasury')->nullable();
            $table->string('payment_method')->nullable();
            $table->string('payment_date')->nullable();
            $table->string('done_by')->nullable();
            $table->string('other_name')->nullable();
            $table->string('phone_no')->nullable();
            $table->string('Transaction_details')->nullable();
            $table->decimal('amount',10,2)->nullable();
            $table->json('documents')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tenant_payment');
    }
};
