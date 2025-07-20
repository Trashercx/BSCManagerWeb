<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, ...$roles): Response
    {
        $user = auth()->user();

        // Verificar si el usuario está autenticado
        if (!$user) {
            return response()->json(['error' => 'No autorizado'], 401);
        }

        // Verificar si el usuario tiene un rol asignado
        if (!$user->role) {
            return response()->json(['error' => 'Usuario sin rol asignado'], 403);
        }

        // Determinar qué campo usar para el nombre del rol
        $roleName = $user->role->nombre ?? $user->role->name ?? null;

        if (!$roleName) {
            return response()->json(['error' => 'Rol sin nombre definido'], 403);
        }

        // Verificar si el rol del usuario está en la lista de roles permitidos
        if (!in_array($roleName, $roles)) {
            return response()->json([
                'error' => 'No autorizado',
                'user_role' => $roleName,
                'required_roles' => $roles
            ], 403);
        }

        return $next($request);
    }
}