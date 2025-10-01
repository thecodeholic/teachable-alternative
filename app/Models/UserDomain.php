<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserDomain extends Model
{
    protected $fillable = [
        'user_id',
        'domain',
        'type',
        'is_primary',
        'is_verified',
    ];

    protected $casts = [
        'is_primary' => 'boolean',
        'is_verified' => 'boolean',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the full domain with suffix if it's a subdomain
     */
    public function getFullDomainAttribute(): string
    {
        if ($this->type === 'subdomain') {
            return $this->domain . '.example.localhost';
        }

        return $this->domain;
    }
}
