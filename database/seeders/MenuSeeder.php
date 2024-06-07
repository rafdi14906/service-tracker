<?php

namespace Database\Seeders;

use App\Models\Menu;
use Illuminate\Database\Seeder;

class MenuSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        #1
        Menu::create([
            'name' => 'Dashboard',
            'slug' => 'dashboard',
            'icon' => 'fa-solid fa-chart-line',
            'url' => '/dashboard',
            'route' => 'dashboard',
            'order' => 1,
            'is_active' => 1,
            'parent_id' => null
        ]);

        #2
        Menu::create([
            'name' => 'Service Log',
            'slug' => 'service-log',
            'icon' => 'fa-solid fa-file-lines',
            'url' => '/service-log',
            'route' => 'service-log.index',
            'order' => 1,
            'is_active' => 1,
            'parent_id' => null
        ]);

        #3
        Menu::create([
            'name' => 'Vehicle',
            'slug' => 'vehicle',
            'icon' => 'fa-solid fa-car-side',
            'url' => '/vehicle',
            'route' => 'vehicle.index',
            'order' => 2,
            'is_active' => 1,
            'parent_id' => null
        ]);

        #4
        Menu::create([
            'name' => 'Setting',
            'slug' => 'setting',
            'icon' => 'fa-solid fa-gear',
            'url' => '/setting',
            'route' => 'setting.index',
            'order' => 3,
            'is_active' => 1,
            'parent_id' => null
        ]);
    }
}
