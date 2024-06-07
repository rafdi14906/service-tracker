<?php

namespace App\Services;

use App\Repositories\ServiceLogRepository;
use App\Repositories\VehicleRepository;
use App\Transformers\ServiceLogTransformer;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use League\Fractal\Pagination\IlluminatePaginatorAdapter;

class ServiceLogService
{
    private ServiceLogRepository $serviceLog;

    public function __construct()
    {
        $this->serviceLog = new ServiceLogRepository();
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
        $serviceLogs = $this->serviceLog->get(null, ['vehicle', 'details', 'parts'], $search, $perPage, ['id' => 'desc']);
        $data = (new ServiceLogTransformer)->transformForIndexPage($serviceLogs->items());
        $serviceLogs = $serviceLogs->toArray();
        $serviceLogs['data'] = $data;
        return [
            'userSess' => session('userSess'),
            'uriPath' => getUriPath(),
            'serviceLogs' => $serviceLogs,
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
        $vehicles = (new VehicleRepository)->get([
            'id AS value',
            DB::raw("CONCAT(brand, ' ', seri, ' [ ', plate_number, ' ]') AS label")
        ]);
        return [
            'userSess' => session('userSess'),
            'uriPath' => getUriPath(),
            'vehicles' => $vehicles,
        ];
    }

    /**
     * Store new serviceLog
     *
     * @param array $request
     * @return \Illuminate\Database\Eloquent\Model
     */
    public function store(array $request): \Illuminate\Database\Eloquent\Model
    {
        $serviceLog = (new ServiceLogRepository)->store(Arr::except($request, ['details', 'parts']));
        $serviceLog->details()->createMany($request['details']);
        $serviceLog->parts()->createMany($request['parts']);
        $serviceLog->attachments()->createMany($request['attachments']);

        return $serviceLog;
    }

    /**
     * Set props for edit page
     *
     * @param array $request
     * @return array
     */
    public function edit(array $request): array
    {
        $serviceLog = $this->serviceLog->find(['id' => $request['id']], ['details', 'parts', 'attachments']);
        $vehicles = (new VehicleRepository)->get([
            'id AS value',
            DB::raw("CONCAT(brand, ' ', seri, ' [ ', plate_number, ' ]') AS label")
        ]);
        return [
            'userSess' => session('userSess'),
            'uriPath' => getUriPath(),
            'serviceLog' => $serviceLog,
            'vehicles' => $vehicles,
        ];
    }

    /**
     * Update serviceLog
     *
     * @param array $request
     * @param array $where
     * @return \Illuminate\Database\Eloquent\Model
     */
    public function update(array $request, array $where): \Illuminate\Database\Eloquent\Model
    {
        $serviceLog = (new ServiceLogRepository)->update($request, $where);
        $serviceLog->details()->delete();
        $serviceLog->parts()->delete();
        $serviceLog->attachments()->delete();
        $serviceLog->details()->createMany($request['details']);
        $serviceLog->parts()->createMany($request['parts']);
        $serviceLog->attachments()->createMany($request['attachments']);

        return $serviceLog;
    }

    /**
     * Delete serviceLog
     *
     * @param array $where
     * @return void
     */
    public function delete(array $where): void
    {
        $serviceLog = (new ServiceLogRepository)->find($where, ['details', 'parts', 'attachments']);
        $serviceLog->details()->delete();
        $serviceLog->parts()->delete();
        $serviceLog->attachments()->delete();
        $serviceLog->delete();
    }

    /**
     * Upload service log receipt and attachment
     *
     * @param array $request
     * @return string|array
     */
    public function upload(array $request): string|array
    {
        if (isset($request['files'])) {
            foreach ($request['files'] as $file) {
                $path[]['path'] = "/storage/".Storage::disk('public')->putFile("service-logs/{$request['type']}", $file);
            }

            return $path;
        } elseif (isset($request['file'])) {
            return "/storage/".Storage::disk('public')->putFile("service-logs/{$request['type']}", $request['file']);
        }
    }
}
