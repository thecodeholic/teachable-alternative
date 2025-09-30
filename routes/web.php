<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    // Show all published courses on home page
    $courses = \App\Models\Course::with('user')
        ->where('published', true)
        ->latest()
        ->get();

    return view('welcome', [
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
    Route::get('lessons/{lesson}', [\App\Http\Controllers\LessonController::class, 'show'])->name('lessons.show');
    Route::post('lessons', [\App\Http\Controllers\LessonController::class, 'store'])->name('lessons.store');
    Route::put('lessons/{lesson}', [\App\Http\Controllers\LessonController::class, 'update'])->name('lessons.update');
    Route::delete('lessons/{lesson}', [\App\Http\Controllers\LessonController::class, 'destroy'])->name('lessons.destroy');
    Route::post('lessons/reorder', [\App\Http\Controllers\LessonController::class, 'reorder'])->name('lessons.reorder');

    // Lesson video routes
    Route::post('lesson-videos', [\App\Http\Controllers\LessonVideoController::class, 'store'])->name('lesson-videos.store');
    Route::delete('lesson-videos/{lessonVideo}', [\App\Http\Controllers\LessonVideoController::class, 'destroy'])->name('lesson-videos.destroy');

    // Lesson attachment routes
    Route::post('lesson-attachments', [\App\Http\Controllers\LessonAttachmentController::class, 'store'])->name('lesson-attachments.store');
    Route::delete('lesson-attachments/{lessonAttachment}', [\App\Http\Controllers\LessonAttachmentController::class, 'destroy'])->name('lesson-attachments.destroy');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
