<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;
use App\Exports\BSCExport;
use App\Models\BSC;
use Barryvdh\DomPDF\Facade\Pdf;

class ExportController extends Controller
{
    public function exportExcel($bsc_id)
    {
        $bsc = BSC::with('perspectivas.objetivos.kpis.seguimientos')->findOrFail($bsc_id);

        return Excel::download(new BSCExport($bsc), 'bsc_' . $bsc_id . '.xlsx');
    }
    
    public function exportPDF($bsc_id)
    {
        $bsc = BSC::with('perspectivas.objetivos.kpis.seguimientos')->findOrFail($bsc_id);

        $pdf = Pdf::loadView('pdf.bsc', ['bsc' => $bsc]);

        return $pdf->download('bsc_' . $bsc_id . '.pdf');
    }
}
