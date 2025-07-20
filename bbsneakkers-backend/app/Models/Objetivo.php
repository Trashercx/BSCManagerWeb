<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Objetivo extends Model
{
    protected $fillable = ['nombre', 'descripcion', 'perspectiva_id'];

    public function perspectiva()
    {
        return $this->belongsTo(Perspectiva::class);
    }

    public function kpis()
    {
        return $this->hasMany(KPI::class, 'objetivo_id');

    }
}
