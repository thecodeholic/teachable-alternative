<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    // Show all published courses on home page
    $courses = \App\Models\Course::with('user')
        ->where('published', true)
        ->latest()
        ->get()
        ->map(function ($course) {
            return [
                'id' => $course->id,
                'title' => $course->title,
                'subtitle' => $course->subtitle,
                'description' => $course->description,
                'thumbnail' => $course->thumbnail,
                'thumbnail_url' => $course->thumbnail_url,
                'price' => $course->price,
                'published' => $course->published,
                'created_at' => $course->created_at,
                'user' => $course->user,
            ];
        });

    return Inertia::render('welcome', [
        'courses' => $courses
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::resource('courses', \App\Http\Controllers\CourseController::class);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
