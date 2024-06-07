<?php

namespace App\Services;

use App\Repositories\VehicleRepository;

class VehicleService
{
    private VehicleRepository $vehicle;

    public function __construct()
    {
        $this->vehicle = new VehicleRepository();
    }

    /**
     * Set props for index page
     *
     * @param array $request
     * @return array
     */
    public function index(array $request): array
    {
        $perPage = $request['per_page'] ?? 10;
        $search = $request['search'] ?? '';
        $vehicles = $this->vehicle->get(null, null, $search, $perPage, ['id' => 'desc']);
        return [
            'userSess' => session('userSess'),
            'uriPath' => getUriPath(),
            'vehicles' => $vehicles,
            'search' => $search,
        ];
    }

    /**
     * Set props for create page
     *
     * @return array
     */
    public function create(): array
    {
        return [
            'userSess' => session('userSess'),
            'uriPath' => getUriPath(),
        ];
    }

    /**
     * Store new vehicle
     *
     * @param array $request
     * @return \Illuminate\Database\Eloquent\Model
     */
    public function store(array $request): \Illuminate\Database\Eloquent\Model
    {
        return (new VehicleRepository)->store($request);
    }

    /**
     * Set props for edit page
     *
     * @param array $request
     * @return array
     */
    public function edit(array $request): array
    {
        $vehicle = $this->vehicle->find(['id' => $request['id']]);
        return [
            'userSess' => session('userSess'),
            'uriPath' => getUriPath(),
            'vehicle' => $vehicle,
        ];
    }

    /**
     * Update vehicle
     *
     * @param array $request
     * @param array $where
     * @return \Illuminate\Database\Eloquent\Model
     */
    public function update(array $request, array $where): \Illuminate\Database\Eloquent\Model
    {
        return (new VehicleRepository)->update($request, $where);
    }

    /**
     * Delete vehicle
     *
     * @param array $where
     * @return void
     */
    public function delete(array $where): void
    {
        (new VehicleRepository)->delete($where);
    }
}
