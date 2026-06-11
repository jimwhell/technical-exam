<?php

namespace App\Services;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

/**
 * Service for logging employee and factory model lifecycle events (created, updated, deleted).
 */
class ModelEventService
{
    /**
     * Log a model event with contextual information.
     *
     * For update events, old and new values are included in the log context
     * to provide a diff of what changed.
     *
     * @param  string  $model  - The model class name being acted on.
     * @param  string  $action  - The event type (created, updated, deleted).
     * @param  Model  $modelInstance  - The actual model instance.
     * @param  array  $old  - The attribute values before the update.
     * @param  array  $new  - The attribute values after the update.
     */
    public function log(string $model, string $action, Model $modelInstance, array $old = [], array $new = []): void
    {
        $context = [
            'model' => $model,
            'record_id' => $modelInstance->id,
            'user_id' => Auth::id(),
        ];

        // Include old and new values only for update actions
        if ($action === 'updated') {
            $context['old_values'] = $old;
            $context['new_values'] = $new;
        }

        Log::info('NEW MODEL EVENT:', $context);
    }
}
