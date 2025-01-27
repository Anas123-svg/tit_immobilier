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
        Schema::create('owner_validator_assignment', function (Blueprint $table) {
            $table->id();
            $table->string('type_of_selection')->nullable();
            $table->json('users')->nullable();
            $table->json('owners')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('owner_validator_assignment');
    }
};
