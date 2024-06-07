<?php

namespace Database\Seeders;

use App\Models\Vehicle;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class VehicleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [];
        for ($i=1; $i <= 200; $i++) {
            $data[$i] = [
                'category' => "Car",
                'plate_number' => "B{$i}TES",
                'brand' => "HONDA",
                'seri' => "ACCORD",
                'type' => "EX",
                'cylinder_capacity' => "2000",
                'year' => "1989",
                'fuel_type' => "PETROL",
                'color' => "WHITE",
                'model' => "SEDAN",
                'chassis_number' => rand(1000000000000, 9999999999999),
                'engine_number' => rand(1000000000000, 9999999999999),
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        Vehicle::insert($data);
    }
}
