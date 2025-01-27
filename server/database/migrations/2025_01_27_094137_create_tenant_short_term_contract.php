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
        Schema::create('tenant_short_term_contract', function (Blueprint $table) {
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
            $table->string('billing_type')->nullable();
            $table->string('booking_date')->nullable();
            $table->string('entry_date')->nullable();
            $table->string('end_date')->nullable();
            $table->string('due_date')->nullable();
            $table->decimal('rental_amount', 15, 2)->nullable();
            $table->integer('number_of_hours')->nullable();
            $table->json('options')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tenant_short_term_contract');
    }
};
