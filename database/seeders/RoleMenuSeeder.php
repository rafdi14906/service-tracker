<?php

namespace Database\Seeders;

use App\Models\RoleMenu;
use Illuminate\Database\Seeder;

class RoleMenuSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        RoleMenu::create([
            'role_id' => 1,
            'menu_id' => 1,
        ]);
        RoleMenu::create([
            'role_id' => 1,
            'menu_id' => 2,
        ]);
        RoleMenu::create([
            'role_id' => 1,
            'menu_id' => 3,
        ]);
        RoleMenu::create([
            'role_id' => 1,
            'menu_id' => 4,
        ]);
    }
}
