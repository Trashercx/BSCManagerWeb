<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Seguimiento extends Model
{
    
    protected $table = 'seguimientos';

    protected $fillable = ['kpi_id', 'valor_actual', 'fecha_registro', 'comentario'];

    public function kpi()
    {
        return $this->belongsTo(KPI::class, 'kpi_id');
    }
}
