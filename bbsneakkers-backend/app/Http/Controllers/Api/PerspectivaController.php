<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\BSC;

class PerspectivaController extends Controller
{
    public function store(Request $request, BSC $bsc)
    {
        $request->validate([
            'nombre' => 'required|string'
        ]);

        $perspectiva = $bsc->perspectivas()->create([
            'nombre' => $request->nombre
        ]);

        return response()->json($perspectiva, 201);
    }
}
