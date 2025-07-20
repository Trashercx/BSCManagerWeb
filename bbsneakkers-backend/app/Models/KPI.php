<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class KPI extends Model
{
    protected $table = 'kpis';

    protected $fillable = ['nombre', 'meta', 'unidad_medida', 'frecuencia', 'objetivo_id'];

    public function objetivo()
    {
        return $this->belongsTo(Objetivo::class);
    }

    public function seguimientos()
    {
        return $this->hasMany(Seguimiento::class, 'kpi_id');
    }

}
