<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;


class Employee extends Model
{
    protected $fillable = [
        'firstname',
        'lastname',
        'factory_id',
        'email',
        'phone',
    ];

    public function factory(): BelongsTo
    {
        return $this->belongsTo(Factory::class);
    }
}
