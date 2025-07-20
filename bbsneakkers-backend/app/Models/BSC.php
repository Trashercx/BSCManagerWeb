<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class BSC extends Model
{
    protected $table = 'bscs';

    protected $fillable = ['nombre', 'unidad_negocio', 'mision', 'vision'];

    public function perspectivas()
    {
        return $this->hasMany(Perspectiva::class, 'bsc_id'); 
    }
}
