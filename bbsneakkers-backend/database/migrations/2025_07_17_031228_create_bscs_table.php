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
        Schema::create('bscs', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->string('unidad_negocio')->nullable();
            $table->text('mision')->nullable();
            $table->text('vision')->nullable();
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bscs');
    }
};
