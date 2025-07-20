<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Perspectiva extends Model
{
   protected $fillable = ['nombre', 'bsc_id'];

    public function bsc()
    {
        return $this->belongsTo(BSC::class);
    }

    public function objetivos()
    {
        return $this->hasMany(Objetivo::class);
    }
}
