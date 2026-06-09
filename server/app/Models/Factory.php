<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Factory extends Model
{
    protected $fillable = [
        'factory_name',
        'location',
        'email',
        'website',
    ];

    public function employees(): HasMany
    {
        return $this->hasMany(Employee::class);
    }
}
