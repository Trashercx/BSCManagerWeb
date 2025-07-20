<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Objetivo;
use App\Models\KPI;
use App\Models\Seguimiento;
use Carbon\Carbon;

class KPIController extends Controller
{
     public function store(Request $request, Objetivo $objetivo)
    {
        $request->validate([
            'nombre' => 'required|string',
            'meta' => 'required|numeric',
            'unidad_medida' => 'required|string',
            'frecuencia' => 'required|string'
        ]);

        $kpi = $objetivo->kpis()->create($request->all());

        return response()->json($kpi, 201);
    }
    public function indexByUser()
    {
        $user = auth()->user();

        return KPI::whereHas('objetivo.perspectiva.bsc', function ($query) use ($user) {
            $query->where('unidad_negocio', $user->unidad_negocio);
        })
        ->with(['objetivo.perspectiva.bsc', 'seguimientos' => function ($q) {
            $q->orderByDesc('fecha_registro');
        }])
        ->get();
    }

    public function update(Request $request, KPI $kpi)
    {
        $request->validate([
            'nombre' => 'required|string',
            'meta' => 'required|numeric',
            'unidad_medida' => 'required|string',
            'frecuencia' => 'required|string',
        ]);

        $kpi->update($request->all());

        return response()->json(['message' => 'KPI actualizado', 'kpi' => $kpi]);
    }
    public function historial($kpiId)
    {
        $kpi = KPI::with(['seguimientos' => function ($query) {
            $query->orderBy('fecha_registro', 'asc');
        }])->findOrFail($kpiId);

        return response()->json([
            'kpi' => [
                'id' => $kpi->id,
                'nombre' => $kpi->nombre,
                'meta' => $kpi->meta,
                'unidad_medida' => $kpi->unidad_medida,
            ],
            'historial' => $kpi->seguimientos->map(function ($s) {
                return [
                    'fecha' => Carbon::parse($s->fecha_registro)->format('Y-m-d'),
                    'valor' => $s->valor_actual,
                ];
            }),
        ]);
    }
    // KPIController.php
    public function show($id)
    {
        $kpi = KPI::with('seguimientos')->findOrFail($id);
        return response()->json($kpi);
    }


    public function listarPorBsc($bscId)
    {
        $kpis = KPI::with([
            'objetivo.perspectiva' => function ($query) use ($bscId) {
                $query->where('bsc_id', $bscId);
            },
            'seguimientos' => function ($q) {
                $q->orderByDesc('fecha_registro');
            }
        ])
        ->whereHas('objetivo.perspectiva', function ($query) use ($bscId) {
            $query->where('bsc_id', $bscId);
        })
        ->get();

        return response()->json($kpis);
    }

}
