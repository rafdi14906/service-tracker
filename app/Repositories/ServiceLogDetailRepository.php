<?php

namespace app\Repositories;

use App\Models\ServiceLogDetail;

class ServiceLogDetailRepository
{
    private ServiceLogDetail $serviceLogDetail;

    public function __construct()
    {
        $this->serviceLogDetail = new ServiceLogDetail;
    }
}
