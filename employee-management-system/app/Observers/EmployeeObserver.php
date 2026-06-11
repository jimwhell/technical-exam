<?php

namespace App\Observers;

use App\Models\Employee;
use App\Services\ModelEventService;

class EmployeeObserver
{
    /**
     * Create a new employee observer instance and injects the ModelEventService.
     */
    public function __construct(
        protected ModelEventService $logger
    ) {}

    /**
     * Handle the Employee "created" event.
     */
    public function created(Employee $employee): void
    {
        $this->logger->log(
            'Employee',
            'created',
            $employee,
            [],
            $employee->toArray()
        );
    }

    /**
     * Handle the Employee "updated" event.
     */
    public function updated(Employee $employee): void
    {
        $this->logger->log(
            'Employee',
            'updated',
            $employee,
            $employee->getOriginal(),
            $employee->getChanges()
        );
    }

    /**
     * Handle the Employee "deleted" event.
     */
    public function deleted(Employee $employee): void
    {
        $this->logger->log(
            'Employee',
            'deleted',
            $employee,
            $employee->getOriginal(),
            []
        );
    }
}
