<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\KPI;
use App\Models\Seguimiento;
class SeguimientoController extends Controller
{
     public function store(Request $request, KPI $kpi)
    {
        $request->validate([
            'valor_actual' => 'required|numeric',
            //'fecha_registro' => 'required|date',
            'comentario' => 'nullable|string',
        ]);

        $seguimiento = $kpi->seguimientos()->create([
            'valor_actual' => $request->valor_actual,
            'comentario' => $request->comentario,
            'fecha_registro' => now(), 
        ]);
        return response()->json($seguimiento, 201);
    }
}
