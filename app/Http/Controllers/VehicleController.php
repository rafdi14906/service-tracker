<?php

namespace App\Http\Controllers;

use App\Http\Requests\Vehicle\IndexRequest;
use App\Http\Requests\Vehicle\StoreRequest;
use App\Http\Requests\Vehicle\UpdateRequest;
use App\Models\Vehicle;
use App\Services\VehicleService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class VehicleController extends Controller
{
    private VehicleService $vehicle;

    public function __construct()
    {
        $this->vehicle = new VehicleService();
    }

    /**
     * Display a listing of the resource.
     */
    public function index(IndexRequest $request)
    {
        $props = $this->vehicle->index($request->validated());
        return Inertia::render('Vehicle/Index', $props);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $props = $this->vehicle->create();
        return Inertia::render('Vehicle/Create', $props);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        $this->vehicle->store($request->validated());
        return redirect()->back();
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
        $props = $this->vehicle->edit(['id' => $id]);
        return Inertia::render('Vehicle/Edit', $props);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRequest $request, string $id)
    {
        $this->vehicle->update($request->validated(), ['id' => $id]);
        return redirect()->route('vehicle.edit', $id);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $this->vehicle->delete(['id' => $id]);
    }
}
