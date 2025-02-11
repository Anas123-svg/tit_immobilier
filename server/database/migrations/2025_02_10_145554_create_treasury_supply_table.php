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
        Schema::create('treasury_supply', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('treasury_id')->nullable();
            $table->foreign('treasury_id')
                ->references('id')
                ->on('treasury')
                ->onDelete('set null');
            $table->unsignedBigInteger('owner_id')->nullable();
            $table->foreign('owner_id')
                    ->references('id')
                    ->on('owners')
                    ->onDelete('set null');
            $table->unsignedBigInteger('property_id')->nullable();
            $table->string('property_type')->nullable();
            $table->string('account_to_be_funded')->nullable();
            $table->string('label')->nullable();
            $table->string('date')->nullable();
            $table->string('mode')->nullable();
            $table->string('external_type_owner')->nullable();
            $table->string('source_of_income')->nullable();
            $table->string('done_by')->nullable();
            $table->string('tiers')->nullable();
            $table->string('bank')->nullable();
            $table->string('cheque')->nullable();
            $table->string('account_no')->nullable();
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
        Schema::dropIfExists('treasury_supply');
    }
};















































