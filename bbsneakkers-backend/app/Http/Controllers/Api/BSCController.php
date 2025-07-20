<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\BSC;

class BSCController extends Controller
{
    public function index()
    {
        // Si no hay relaciones aún, esto evitará errores
        return response()->json(BSC::with('perspectivas.objetivos.kpis')->get());
    }

   public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string',
            'unidad_negocio' => 'nullable|string',
            'mision' => 'nullable|string',
            'vision' => 'nullable|string',
        ]);

        $bsc = BSC::create($request->all());

        // Crear automáticamente las 4 perspectivas clásicas
        $perspectivasBase = [
            'Financiera',
            'Clientes',
            'Procesos Internos',
            'Aprendizaje y Crecimiento'
        ];

        foreach ($perspectivasBase as $nombre) {
            $bsc->perspectivas()->create(['nombre' => $nombre]);
        }

        return response()->json($bsc->load('perspectivas'), 201);
    }


    public function show(string $id)
    {
        $bsc = BSC::with('perspectivas.objetivos.kpis.seguimientos')->findOrFail($id);
        return response()->json($bsc);
    }

    public function update(Request $request, string $id)
    {
        $bsc = BSC::findOrFail($id);
        $bsc->update($request->all());
        return response()->json($bsc);    
    }

    public function destroy(string $id)
    {
        $bsc = BSC::findOrFail($id);
        $bsc->delete();
        return response()->json(['message' => 'BSC eliminado']);
    }
}
