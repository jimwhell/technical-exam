<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreEmployeeRequest;
use App\Http\Requests\UpdateEmployeeRequest;
use App\Models\Employee;

class EmployeeController extends Controller
{
    /**
     * Returns a list of all employees.
     */
    public function index()
    {

        $employees = Employee::paginate(10);

        return response()->json($employees, 200);

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create() {}

    /**
     * Store a newly created employee in storage.
     */
    public function store(StoreEmployeeRequest $request)
    {

        $validated = $request->validated();
        $employee = Employee::create($validated);

        return response()->json([
            'message' => 'Employee created successfully.',
            'data' => $employee,
        ], 201);

    }

    /**
     * Returns a specific employee.
     */
    public function show(Employee $employee)
    {

        return response()->json([
            'data' => $employee,
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
     * Update the specified employee in storage.
     */
    public function update(UpdateEmployeeRequest $request, Employee $employee)
    {

        $validated = $request->validated();
        $employee->update($validated);

        return response()->json([
            'message' => 'Employee updated successfully.',
            'data' => $employee,
        ], 200);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
