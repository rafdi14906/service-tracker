<?php

namespace App\Repositories;

use App\Models\ServiceLog;

class ServiceLogRepository
{
    private ServiceLog $serviceLog;

    public function __construct()
    {
        $this->serviceLog = new ServiceLog();
    }

    /**
     * Get Service Log resources.
     *
     * @param array $request
     * @param array $withRelations
     * @param string $search
     * @param int $perPage
     * @param array $order
     * @return \Illuminate\Database\Eloquent\Collection|\Illuminate\Contracts\Pagination\LengthAwarePaginator
     */
    public function get(
        array $request = null,
        array $withRelations = null,
        string $search = null,
        int $perPage = null,
        array $order = null
    ): \Illuminate\Database\Eloquent\Collection|\Illuminate\Contracts\Pagination\LengthAwarePaginator
    {
        $fillable = $this->serviceLog->getFillable();
        $serviceLog = $this->serviceLog
            ->when($withRelations, function ($query) use ($withRelations) {
                $query->with($withRelations);
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

        return $perPage ? $serviceLog->paginate($perPage)->withQueryString() : $serviceLog->get();
    }

    /**
     * Create Service Log resource.
     *
     * @param array $data
     * @return \Illuminate\Database\Eloquent\Model
     */
    public function store(array $data): \Illuminate\Database\Eloquent\Model
    {
        return $this->serviceLog->create($data);
    }

    /**
     * Find Service Log resource.
     *
     * @param array $request
     * @param array|null $withRelations
     * @param bool $throw
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function find(array $request, array $withRelations = null, bool $throw = false): \Illuminate\Database\Eloquent\Model|null
    {
        $serviceLog = $this->serviceLog
            ->when($withRelations, function ($query) use ($withRelations) {
                $query->with($withRelations);
            })
            ->when($request, function ($query) use ($request) {
                foreach ($request as $key => $value) {
                    $query->when(is_array($value), function ($where) use ($key, $value) {
                        $where->whereIn($key, $value);
                    })->when(!is_array($value), function ($where) use ($key, $value) {
                        $where->where($key, $value);
                    });
                }
            });

        return $throw ? $serviceLog->firstOrFail() : $serviceLog->first();
    }

    /**
     * Update Service Log resource.
     *
     * @param array $data
     * @param array $where
     * @return \Illuminate\Database\Eloquent\Model
     */
    public function update(array $data, array $where): \Illuminate\Database\Eloquent\Model
    {
        $serviceLog = $this->find($where, ['details', 'parts', 'attachments']);
        $serviceLog->update($data);
        return $serviceLog;
    }

    /**
     * Delete Service Log resource.
     *
     * @param array $where
     * @return void
     */
    public function delete(array $where): void
    {
        $serviceLog = $this->find($where);
        $serviceLog->delete();
    }
}
