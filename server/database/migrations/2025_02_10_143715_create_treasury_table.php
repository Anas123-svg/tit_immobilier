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
        Schema::create('treasury', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('manager_id')->nullable();
            $table->foreign('manager_id')
                ->references('id')
                ->on('users')
                ->onDelete('set null');
            $table->string('cash_type')->nullable();
            $table->string('label')->nullable();
            $table->string('comment')->nullable();
            $table->string('account_no')->nullable();
            $table->decimal('minimum_threshold',10,2)->nullable();
            $table->decimal('maximum_threshold',10,2)->nullable();
            $table->json('validator_assignment')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('treasury');
    }
};
