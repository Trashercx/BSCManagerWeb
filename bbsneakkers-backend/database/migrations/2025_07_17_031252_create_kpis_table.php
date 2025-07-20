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
       Schema::create('kpis', function (Blueprint $table) {
            $table->id();
            $table->string('nombre');
            $table->decimal('meta', 10, 2);
            $table->string('unidad_medida'); // %, S/, etc
            $table->string('frecuencia');    // Mensual, Trimestral...
            $table->foreignId('objetivo_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kpis');
    }
};
