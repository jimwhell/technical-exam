<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreFactoryRequest;
use App\Http\Requests\UpdateFactoryRequest;
use App\Models\Factory;

class FactoryController extends Controller
{
    /**
     * Returns a list of all factories.
     */
    public function index()
    {

        $factories = Factory::paginate(10);

        return response()->json($factories, 200);

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created factory in storage.
     */
    public function store(StoreFactoryRequest $request)
    {

        $validated = $request->validated();
        $factory = Factory::create($validated);

        return response()->json([
            'message' => 'Factory created successfully.',
            'data' => $factory,
        ], 201);
    }

    /**
     * Returns a specific factory.
     */
    public function show(Factory $factory)
    {
        return response()->json([
            'data' => $factory,
        ], 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified factory in storage.
     */
    public function update(UpdateFactoryRequest $request, Factory $factory)
    {

        $validated = $request->validated();
        $factory->update($validated);

        return response()->json([
            'message' => 'Factory updated successfully.',
            'data' => $factory,
        ], 200);

    }

    /**
     * Remove the specified factory from storage.
     */
    public function destroy(Factory $factory)
    {

        $factory->delete();

        return response()->json([
            'message' => 'Factory deleted successfully.',
        ], 200);

    }

    /**
     * Returns a dropdown list consisting of factories.
     */
    public function dropdown()
    {
        $factories = Factory::select('id', 'factory_name')->orderBy('factory_name')->get();

        return response()->json(['data' => $factories], 200);
    }
}
