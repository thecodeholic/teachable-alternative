<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Main domain routes (example.localhost)
Route::domain('example.localhost')->group(function () {
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

    // Content creator profile pages (fallback for direct URL access)
    Route::get('/creator/{username}', [\App\Http\Controllers\ContentCreatorController::class, 'show'])
        ->where('username', '[a-zA-Z0-9_-]+')
        ->name('content-creator.profile');

    Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('domains', [\App\Http\Controllers\UserDomainController::class, 'index'])->name('domains.index');
    Route::post('domains', [\App\Http\Controllers\UserDomainController::class, 'store'])->name('domains.store');
    Route::put('domains/{domain}/primary', [\App\Http\Controllers\UserDomainController::class, 'setPrimary'])->name('domains.set-primary');
    Route::delete('domains/{domain}', [\App\Http\Controllers\UserDomainController::class, 'destroy'])->name('domains.destroy');

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
});

// Subdomain routing for content creator profiles (for .example.localhost subdomains)
Route::domain('{subdomain}.example.localhost')->group(function () {
    Route::get('/', [\App\Http\Controllers\ContentCreatorController::class, 'showByDomain'])
        ->where('subdomain', '[a-zA-Z0-9_-]+')
        ->name('subdomain.creator.profile');
});

// Custom domain routing for content creator profiles
// This will handle any custom domain like zura.test
Route::domain('{customdomain}')->group(function () {
    Route::get('/', [\App\Http\Controllers\ContentCreatorController::class, 'showByDomain'])
        ->name('custom-domain.creator.profile');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
