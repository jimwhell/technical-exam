<?php

namespace App\Observers;

use App\Models\Factory;
use App\Services\ModelEventService;

class FactoryObserver
{

    /**
     * Create a new factory observer instance and injects the ModelEventService.
     */
    public function __construct(
        protected ModelEventService $logger
    ) {}

    /**
     * Handle the Factory "created" event.
     */
    public function created(Factory $factory): void
    {
        $this->logger->log(
            'Factory',
            'created',
            $factory,
            [],
            $factory->toArray()
        );

    }

    /**
     * Handle the Factory "updated" event.
     */
    public function updated(Factory $factory): void
    {
        $this->logger->log(
            'Factory',
            'updated',
            $factory,
            $factory->getOriginal(),
            $factory->getChanges()
        );
    }

    /**
     * Handle the Factory "deleted" event.
     */
    public function deleted(Factory $factory): void
    {
        $this->logger->log(
            'Factory',
            'deleted',
            $factory,
            $factory->toArray(),
            []
        );
    }
}
