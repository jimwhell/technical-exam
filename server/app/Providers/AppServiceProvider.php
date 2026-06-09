<?php

namespace App\Providers;

use App\Models\Employee;
use App\Models\Factory;
use App\Observers\EmployeeObserver;
use App\Observers\FactoryObserver;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Factory::observe(FactoryObserver::class);
        Employee::observe(EmployeeObserver::class);
    }
}
