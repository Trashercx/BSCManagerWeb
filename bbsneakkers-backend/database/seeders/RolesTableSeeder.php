<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Role;
class RolesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
         Role::insert([
            ['name' => 'admin', 'description' => 'Administrador'],
            ['name' => 'estrategico', 'description' => 'Usuario estratégico'],
            ['name' => 'operativo', 'description' => 'Usuario operativo'],
        ]);
    }
}
