<?php

namespace App\Exports;

use App\Models\BSC;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;

class BSCExport implements FromCollection, WithHeadings
{
   protected $bsc;

    public function __construct(BSC $bsc)
    {
        $this->bsc = $bsc;
    }

    public function collection()
    {
        $data = [];

        foreach ($this->bsc->perspectivas as $perspectiva) {
            foreach ($perspectiva->objetivos as $objetivo) {
                foreach ($objetivo->kpis as $kpi) {
                    $seguimiento = $kpi->seguimientos->sortByDesc('fecha_registro')->first();

                    $data[] = [
                        'Unidad' => $this->bsc->unidad_negocio,
                        'Perspectiva' => $perspectiva->nombre,
                        'Objetivo' => $objetivo->nombre,
                        'KPI' => $kpi->nombre,
                        'Meta' => $kpi->meta,
                        'Valor Actual' => $seguimiento->valor_actual ?? 'Sin datos',
                        'Fecha' => $seguimiento->fecha_registro ?? 'Sin registro',
                        'Cumplimiento' => $seguimiento && $kpi->meta > 0
                            ? round(($seguimiento->valor_actual / $kpi->meta) * 100, 2) . '%'
                            : 'N/A'
                    ];
                }
            }
        }

        return collect($data);
    }

    public function headings(): array
    {
        return ['Unidad', 'Perspectiva', 'Objetivo', 'KPI', 'Meta', 'Valor Actual', 'Fecha', 'Cumplimiento'];
    }
}
