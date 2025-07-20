<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\Api\BSCController;
use App\Http\Controllers\Api\PerspectivaController;
use App\Http\Controllers\Api\ObjetivoController;
use App\Http\Controllers\Api\KPIController;
use App\Http\Controllers\Api\SeguimientoController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\ExportController; 

// 🔐 Autenticación
Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/perspectivas/{perspectiva}/objetivos', [ObjetivoController::class, 'store']);

Route::middleware('auth:api')->get('/auth/me', [AuthController::class, 'me']);

// 🔒 Rutas protegidas por autenticación JWT
Route::middleware(['auth:api'])->group(function () {

    Route::put('/objetivos/{objetivo}', [ObjetivoController::class, 'update']);
    Route::put('/kpis/{kpi}', [KPIController::class, 'update']);
    Route::get('/kpi/{id}/historial', [KPIController::class, 'historial']);
    Route::get('/bsc/{bsc}/kpis', [KPIController::class, 'listarPorBsc']);
    Route::get('/kpis/{kpi}', [KPIController::class, 'show']);

    // Admin y estratégicos pueden crear BSC, perspectivas, etc.
    Route::middleware('role:admin,estrategico')->group(function () {
        Route::post('/bsc', [BSCController::class, 'store']);
        Route::post('/bsc/{bsc}/perspectivas', [PerspectivaController::class, 'store']);
        Route::post('/perspectivas/{perspectiva}/objetivos', [ObjetivoController::class, 'store']);
        Route::post('/objetivos/{objetivo}/kpis', [KPIController::class, 'store']);
    });
    Route::middleware('role:admin')->group(function () {
    Route::get('/users', [AuthController::class, 'listUsers']);
    Route::put('/users/{user}', [AuthController::class, 'update']);
    Route::delete('/users/{user}', [AuthController::class, 'destroy']);    
    });
    // Operativos registran seguimientos
    Route::middleware('role:operativo,admin')->post('/kpis/{kpi}/seguimientos', [SeguimientoController::class, 'store']);
    Route::middleware('role:operativo,admin')->get('/mis-kpis', [KPIController::class, 'indexByUser']);

    // Todos los roles autenticados pueden consultar
    Route::get('/bsc', [BSCController::class, 'index']);
    Route::get('/bsc/{bsc}', [BSCController::class, 'show']);
    Route::get('/dashboard/{bsc}', [DashboardController::class, 'resumen']);

    // Solo administradores pueden eliminar y actualizar
    Route::middleware('role:admin')->group(function () {
        Route::delete('/bsc/{bsc}', [BSCController::class, 'destroy']);
        Route::put('/bsc/{bsc}', [BSCController::class, 'update']);
    });
    
    Route::prefix('export')->group(function () {
    Route::get('/bsc/{bsc}/excel', [ExportController::class, 'exportExcel']);
    Route::get('/bsc/{bsc}/pdf', [ExportController::class, 'exportPDF']);
    });
});