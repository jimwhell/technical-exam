<?php

use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\FactoryController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () {
    Route::get('factories/dropdown', [FactoryController::class, 'dropdown']);
    Route::resource('factories', FactoryController::class);
    Route::resource('employees', EmployeeController::class);
});
