<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: sans-serif; font-size: 12px; }
        table { width: 100%; border-collapse: collapse; }
        th, td { border: 1px solid #aaa; padding: 4px; text-align: left; }
    </style>
</head>
<body>
    <h2>{{ $bsc->nombre }} — {{ $bsc->unidad_negocio }}</h2>
    <p><strong>Misión:</strong> {{ $bsc->mision }}</p>
    <p><strong>Visión:</strong> {{ $bsc->vision }}</p>

    <table>
        <thead>
            <tr>
                <th>Perspectiva</th>
                <th>Objetivo</th>
                <th>KPI</th>
                <th>Meta</th>
                <th>Valor Actual</th>
                <th>Fecha</th>
                <th>Cumplimiento</th>
            </tr>
        </thead>
        <tbody>
            @foreach($bsc->perspectivas as $perspectiva)
                @foreach($perspectiva->objetivos as $objetivo)
                    @foreach($objetivo->kpis as $kpi)
                        @php
                            $seguimiento = $kpi->seguimientos->sortByDesc('fecha_registro')->first();
                            $cumplimiento = $seguimiento && $kpi->meta > 0 ? round(($seguimiento->valor_actual / $kpi->meta) * 100, 2) . '%' : 'N/A';
                        @endphp
                        <tr>
                            <td>{{ $perspectiva->nombre }}</td>
                            <td>{{ $objetivo->nombre }}</td>
                            <td>{{ $kpi->nombre }}</td>
                            <td>{{ $kpi->meta }}</td>
                            <td>{{ $seguimiento->valor_actual ?? 'Sin datos' }}</td>
                            <td>{{ $seguimiento->fecha_registro ?? 'Sin registro' }}</td>
                            <td>{{ $cumplimiento }}</td>
                        </tr>
                    @endforeach
                @endforeach
            @endforeach
        </tbody>
    </table>
</body>
</html>
