<?php

use App\Http\Controllers\API\ServiceLogController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::prefix('v1')->group(function () {
    Route::prefix('service-log')->group(function () {
        Route::post('upload-attachment', [ServiceLogController::class, 'uploadAttachment'])->name('api.v1.service-log.upload-attachment');
    });
});
