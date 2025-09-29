<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;

class Course extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'slug',
        'subtitle',
        'description',
        'thumbnail',
        'price',
        'published',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'published' => 'boolean',
    ];

    protected $appends = ['thumbnail_url'];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($course) {
            if (empty($course->slug)) {
                $course->slug = \Illuminate\Support\Str::slug($course->title);
            }
        });

        static::updating(function ($course) {
            if ($course->isDirty('title') && empty($course->slug)) {
                $course->slug = \Illuminate\Support\Str::slug($course->title);
            }
        });
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function modules(): HasMany
    {
        return $this->hasMany(Module::class)->orderBy('sort_order');
    }

    public function lessons(): HasManyThrough
    {
        return $this->hasManyThrough(Lesson::class, Module::class);
    }

    public function getThumbnailUrlAttribute(): ?string
    {
        if (!$this->thumbnail) {
            return null;
        }

        // If it's already a URL, return it
        if (filter_var($this->thumbnail, FILTER_VALIDATE_URL)) {
            return $this->thumbnail;
        }

        // Otherwise, it's a stored file path
        return asset('storage/' . $this->thumbnail);
    }
}
