<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Perspectiva;
use App\Models\Objetivo;
class ObjetivoController extends Controller
{
    public function store(Request $request, Perspectiva $perspectiva)
    {
        $request->validate([
            'nombre' => 'required|string'
        ]);

        $objetivo = $perspectiva->objetivos()->create([
            'nombre' => $request->nombre
        ]);

        return response()->json($objetivo, 201);
    }
    public function update(Request $request, Objetivo $objetivo)
    {
        $request->validate([
            'nombre' => 'required|string'
        ]);

        $objetivo->update([
            'nombre' => $request->nombre
        ]);

        return response()->json(['message' => 'Objetivo actualizado']);
    }

}
