<?php

namespace App\Services;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class ModelEventService
{
    public function log(string $model, string $action, Model $modelInstance, array $old = [], array $new = [])
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
