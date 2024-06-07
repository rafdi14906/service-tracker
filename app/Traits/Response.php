<?php

namespace App\Traits;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response as HttpResponse;

trait Response
{
    /**
     * @param mixed $data
     * @param int $code
     * @return JsonResponse
     */
    public function successResponse(
        mixed $data = null,
        int $code = HttpResponse::HTTP_OK
    ): JsonResponse
    {
        return response()->json([
            'data' => $data,
        ], $code);
    }

    /**
     * @param array $errors
     * @param array $data
     * @param int $code
     * @return JsonResponse
     */
    public function errorResponse(
        array $errors = null,
        array $data = null,
        int $code = HttpResponse::HTTP_INTERNAL_SERVER_ERROR
    ): JsonResponse
    {
        return response()->json([
            'errors' => $errors,
            'data' => $data,
        ], $code);
    }
}
