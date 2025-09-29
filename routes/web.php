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

    // Module routes
    Route::post('modules', [\App\Http\Controllers\ModuleController::class, 'store'])->name('modules.store');
    Route::put('modules/{module}', [\App\Http\Controllers\ModuleController::class, 'update'])->name('modules.update');
    Route::delete('modules/{module}', [\App\Http\Controllers\ModuleController::class, 'destroy'])->name('modules.destroy');
    Route::post('modules/reorder', [\App\Http\Controllers\ModuleController::class, 'reorder'])->name('modules.reorder');

    // Lesson routes
    Route::post('lessons', [\App\Http\Controllers\LessonController::class, 'store'])->name('lessons.store');
    Route::put('lessons/{lesson}', [\App\Http\Controllers\LessonController::class, 'update'])->name('lessons.update');
    Route::delete('lessons/{lesson}', [\App\Http\Controllers\LessonController::class, 'destroy'])->name('lessons.destroy');
    Route::post('lessons/reorder', [\App\Http\Controllers\LessonController::class, 'reorder'])->name('lessons.reorder');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
