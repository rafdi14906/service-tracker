<?php

namespace App\Transformers;

class ServiceLogTransformer
{
    /**
     * Transform the service log for index page.
     *
     * @param  array  $serviceLogs
     * @return \Illuminate\Support\Collection
     */
    public function transformForIndexPage(array $serviceLogs): \Illuminate\Support\Collection
    {
        return collect($serviceLogs)->transform(function ($item) {
            return [
                'id' => $item->id,
                'date' => $item->date,
                'plate_number' => $item->vehicle->plate_number,
                'transaction_number' => $item->vehicle->transaction_number,
                'vehicle' => "{$item->vehicle->brand} {$item->vehicle->seri}",
                'number_of_services' => $item->details->count(),
                'number_of_parts' => $item->parts->count(),
                'total_service_cost' => "Rp.".number_format($item->total_service_cost, 0, ',', '.'),
                'total_service_cost_value' => $item->total_service_cost,
                'total_parts_cost' => "Rp.".number_format($item->total_parts_cost, 0, ',', '.'),
                'total_parts_cost_value' => $item->total_parts_cost,
                'grand_total_cost' => "Rp.".number_format($item->grand_total_cost, 0, ',', '.'),
                'grand_total_cost_value' => $item->grand_total_cost,
                'workshop_name' => $item->workshop_name,
                'workshop_address' => $item->workshop_address
            ];
        });
    }
}
