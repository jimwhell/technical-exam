<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Employee extends Model
{
    use HasFactory;

    protected $table = 'employees';

    protected $fillable = [
        'firstname',
        'lastname',
        'factory_id',
        'email',
        'phone',
    ];

    /**
     * Orders all employee queries alphabetically by last name, then first name.
     */
    protected static function booted(): void
    {
        static::addGlobalScope('alphabetical', function (Builder $query) {
            $query->orderBy('lastname')->orderBy('firstname');
        });
    }

    public function assignedFactory(): BelongsTo
    {
        return $this->belongsTo(Factory::class, 'factory_id', 'id');
    }

    /**
     * Scope a query to search employees by first name or last name.
     */
    public function scopeSearch(Builder $query, string $search): void
    {
        if (! $search) {
            return;
        }

        $query->where(function (Builder $query) use ($search) {
            $query->whereRaw('CONCAT(firstname, " ", lastname) LIKE ?', ["%{$search}%"])
                ->orWhereRaw('CONCAT(lastname, " ", firstname) LIKE ?', ["%{$search}%"]);
        });
    }
}
