<?php

namespace app\Repositories;

use App\Models\ServiceLogPart;

class ServiceLogPartRepository
{
    private ServiceLogPart $serviceLogPart;

    public function __construct()
    {
        $this->serviceLogPart = new ServiceLogPart;
    }
}
