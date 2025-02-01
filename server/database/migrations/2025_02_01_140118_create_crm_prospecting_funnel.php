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
        Schema::create('crm_prospecting_funnel', function (Blueprint $table) {
            $table->id();
            $table->string('stage')->nullable();
            $table->boolean('is_rental')->default(false);
            $table->integer('duration_of_treatment')->default(0);
            $table->json('commercial_actions')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('crm_prospecting_funnel');
    }
};
