<?php

namespace App\Http\Controllers;

use App\Http\Requests\ServiceLog\IndexRequest;
use App\Http\Requests\ServiceLog\StoreRequest;
use App\Http\Requests\ServiceLog\UpdateRequest;
use App\Services\ServiceLogService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ServiceLogController extends Controller
{
    private ServiceLogService $serviceLog;

    public function __construct()
    {
        $this->serviceLog = new ServiceLogService();
    }

    /**
     * Display a listing of the resource.
     */
    public function index(IndexRequest $request)
    {
        $props = $this->serviceLog->index($request->validated());
        return Inertia::render('ServiceLog/Index', $props);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $props = $this->serviceLog->create();
        return Inertia::render('ServiceLog/Create', $props);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        $this->serviceLog->store($request->validated());
        return redirect()->route('service-log.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $props = $this->serviceLog->edit(['id' => $id]);
        return Inertia::render('ServiceLog/Edit', $props);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request, string $id)
    {
        $this->serviceLog->update($request->validated(), ['id' => $id]);
        return redirect()->route('service-log.edit', $id);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $this->serviceLog->delete(['id' => $id]);
    }
}
