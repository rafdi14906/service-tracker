<?php

namespace App\Http\Controllers\API;

use App\Http\Requests\API\ServiceLog\UploadRequest;
use App\Services\ServiceLogService;
use Illuminate\Http\Request;

class ServiceLogController extends Controller
{
    private ServiceLogService $serviceLog;

    public function __construct(ServiceLogService $serviceLog)
    {
        $this->serviceLog = $serviceLog;
    }

    public function uploadAttachment(UploadRequest $request)
    {
        $data = $this->serviceLog->upload($request->validated());
        return $this->successResponse($data);
    }
}
