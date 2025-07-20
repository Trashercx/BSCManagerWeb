<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\BSC;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function resumen($bsc_id)
    {
        $bsc = BSC::with('perspectivas.objetivos.kpis.seguimientos')->findOrFail($bsc_id);
        
        $resultados = [];

        foreach ($bsc->perspectivas as $perspectiva) {
            $totalCumplimiento = 0;
            $totalKpis = 0;

            foreach ($perspectiva->objetivos as $objetivo) {
                foreach ($objetivo->kpis as $kpi) {

                    // OPCIÓN 1: Tomar el seguimiento más reciente (sin filtro de fecha)
                    $seguimiento = $kpi->seguimientos
                        ->sortByDesc('created_at') // Ordenar por fecha de creación
                        ->first(); // Tomar el más reciente

                    // OPCIÓN 2: Si prefieres por fecha_registro
                    // $seguimiento = $kpi->seguimientos
                    //     ->sortByDesc('fecha_registro')
                    //     ->first();

                    if ($seguimiento) {
                        $meta = floatval($kpi->meta);
                        $valor = floatval($seguimiento->valor_actual);

                        if ($meta > 0) {
                            $cumplimiento = ($valor / $meta) * 100;

                            \Log::info("KPI: {$kpi->nombre}, META: {$meta}, VALOR: {$valor}, %: {$cumplimiento}");

                            $totalCumplimiento += $cumplimiento;
                            $totalKpis++;
                        }
                    }
                }
            }

            $promedio = $totalKpis > 0 ? round($totalCumplimiento / $totalKpis, 2) : null;

            $resultados[] = [
                'perspectiva' => $perspectiva->nombre,
                'cumplimiento_promedio' => $promedio,
                'total_kpis' => $totalKpis,
                'estado' => $this->getEstadoSemaforo($promedio)
            ];
        }

        return response()->json($resultados);
    }

    // OPCIÓN 3: Método alternativo con diferentes estrategias
    public function resumenConOpciones($bsc_id, Request $request)
    {
        $bsc = BSC::with('perspectivas.objetivos.kpis.seguimientos')->findOrFail($bsc_id);
        
        // Permitir diferentes filtros via query params
        $filtro = $request->query('filtro', 'reciente'); // 'hoy', 'reciente', 'mes'
        
        $resultados = [];

        foreach ($bsc->perspectivas as $perspectiva) {
            $totalCumplimiento = 0;
            $totalKpis = 0;

            foreach ($perspectiva->objetivos as $objetivo) {
                foreach ($objetivo->kpis as $kpi) {

                    $seguimiento = null;

                    switch ($filtro) {
                        case 'hoy':
                            $seguimiento = $kpi->seguimientos
                                ->filter(function ($s) {
                                    return Carbon::parse($s->fecha_registro)->isSameDay(Carbon::now('America/Lima'));
                                })
                                ->sortByDesc('fecha_registro')
                                ->first();
                            break;
                            
                        case 'mes':
                            $seguimiento = $kpi->seguimientos
                                ->filter(function ($s) {
                                    return Carbon::parse($s->fecha_registro)->isSameMonth(Carbon::now('America/Lima'));
                                })
                                ->sortByDesc('fecha_registro')
                                ->first();
                            break;
                            
                        case 'reciente':
                        default:
                            $seguimiento = $kpi->seguimientos
                                ->sortByDesc('created_at')
                                ->first();
                            break;
                    }

                    if ($seguimiento) {
                        $meta = floatval($kpi->meta);
                        $valor = floatval($seguimiento->valor_actual);

                        if ($meta > 0) {
                            $cumplimiento = ($valor / $meta) * 100;
                            $totalCumplimiento += $cumplimiento;
                            $totalKpis++;
                        }
                    }
                }
            }

            $promedio = $totalKpis > 0 ? round($totalCumplimiento / $totalKpis, 2) : null;

            $resultados[] = [
                'perspectiva' => $perspectiva->nombre,
                'cumplimiento_promedio' => $promedio,
                'total_kpis' => $totalKpis,
                'estado' => $this->getEstadoSemaforo($promedio),
                'filtro_aplicado' => $filtro
            ];
        }

        return response()->json($resultados);
    }

    private function getEstadoSemaforo($cumplimiento)
    {
        if ($cumplimiento === null) return 'Sin datos';
        if ($cumplimiento >= 90) return 'verde';
        if ($cumplimiento >= 70) return 'amarillo';
        return 'rojo';
    }
}