<?php

use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\FactoryController;
use Illuminate\Support\Facades\Route;

Route::resource('factories', FactoryController::class);
Route::resource('employees', EmployeeController::class);
