<?php

namespace Database\Seeders;

use App\Models\ServiceLog;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ServiceLogSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $details = collect([
            [
                'service_name' => 'Service Ringan',
                'service_cost' => 300000,
            ],
            [
                'service_name' => 'Service AC',
                'service_cost' => 150000,
            ],
        ]);

        $parts = collect([
            [
                'part_name' => 'Oli Mesran 20W-50 4L',
                'part_quantity' => 1,
                'part_cost' => 200000,
                'subtotal_part_cost' => 200000,
            ],
            [
                'part_name' => 'Filter Oli',
                'part_quantity' => 1,
                'part_cost' => 25000,
                'subtotal_part_cost' => 25000,
            ],
            [
                'part_name' => 'Sakura Filter Udara',
                'part_quantity' => 1,
                'part_cost' => 150000,
                'subtotal_part_cost' => 150000,
            ],
            [
                'part_name' => 'Honda Genuine Evaporator',
                'part_quantity' => 1,
                'part_cost' => 1000000,
                'subtotal_part_cost' => 1000000,
            ],
            [
                'part_name' => 'Freon R124',
                'part_quantity' => 2,
                'part_cost' => 100000,
                'subtotal_part_cost' => 200000,
            ],
        ]);

        $serviceCost = $details->sum('service_cost');
        $partsCost = $parts->sum('subtotal_part_cost');
        $totalCost = $serviceCost + $partsCost;

        $serviceLog = ServiceLog::create([
            'vehicle_id' => 1,
            'date' => now(),
            'workshop_name' => 'Garden Speed',
            'workshop_address' => 'Jakarta Barat',
            'grand_total_cost' => $totalCost,
            'total_service_cost' => $serviceCost,
            'total_parts_cost' => $partsCost,
        ]);

        $serviceLog->details()->createMany($details);
        $serviceLog->parts()->createMany($parts);
    }
}
