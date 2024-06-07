<?php

namespace App\Repositories;

use App\Models\Vehicle;

class VehicleRepository
{
    private Vehicle $vehicle;

    public function __construct()
    {
        $this->vehicle = new Vehicle();
    }

    /**
     * Get vehicle resources.
     *
     * @param array select
     * @param array $request
     * @param string $search
     * @param int $perPage
     * @param array $order
     * @return \Illuminate\Database\Eloquent\Collection|\Illuminate\Contracts\Pagination\LengthAwarePaginator
     */
    public function get(
        array $select = null,
        array $request = null,
        string $search = null,
        int $perPage = null,
        array $order = null
    ): \Illuminate\Database\Eloquent\Collection|\Illuminate\Contracts\Pagination\LengthAwarePaginator
    {
        $fillable = $this->vehicle->getFillable();
        $vehicle = $this->vehicle
            ->when($select, function ($query) use ($select) {
                $query->select($select);
            })
            ->when($request, function ($query) use ($request) {
                foreach ($request as $key => $value) {
                    $query->when(is_array($value), function ($where) use ($key, $value) {
                        $where->whereIn($key, $value);
                    })->when(!is_array($value), function ($where) use ($key, $value) {
                        $where->where($key, $value);
                    });
                }
            })
            ->when($search, function ($query) use ($search, $fillable) {
                $query->whereAny($fillable, "like", "%{$search}%");
            })
            ->when($order, function ($query) use ($order) {
                foreach ($order as $key => $value) {
                    $query->orderBy($key, $value);
                }
            });

        return $perPage ? $vehicle->paginate($perPage)->withQueryString() : $vehicle->get();
    }

    /**
     * Create vehicle resource.
     *
     * @param array $data
     * @return \Illuminate\Database\Eloquent\Model
     */
    public function store(array $data): \Illuminate\Database\Eloquent\Model
    {
        return $this->vehicle->create($data);
    }

    /**
     * Find vehicle resource.
     *
     * @param array $request
     * @param bool $throw
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function find(array $request, bool $throw = false): \Illuminate\Database\Eloquent\Model|null
    {
        $vehicle = $this->vehicle
            ->when($request, function ($query) use ($request) {
                foreach ($request as $key => $value) {
                    $query->when(is_array($value), function ($where) use ($key, $value) {
                        $where->whereIn($key, $value);
                    })->when(!is_array($value), function ($where) use ($key, $value) {
                        $where->where($key, $value);
                    });
                }
            });

        return $throw ? $vehicle->firstOrFail() : $vehicle->first();
    }

    /**
     * Update vehicle resource.
     *
     * @param array $data
     * @param array $where
     * @return \Illuminate\Database\Eloquent\Model
     */
    public function update(array $data, array $where): \Illuminate\Database\Eloquent\Model
    {
        $vehicle = $this->find($where);
        $vehicle->update($data);
        return $vehicle;
    }

    /**
     * Delete vehicle resource.
     *
     * @param array $where
     * @return void
     */
    public function delete(array $where): void
    {
        $vehicle = $this->find($where);
        $vehicle->delete();
    }
}
