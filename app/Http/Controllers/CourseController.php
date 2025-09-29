<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class CourseController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $courses = Course::with('user')
            ->where('user_id', Auth::id())
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

        return Inertia::render('courses/index', [
            'courses' => $courses
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('courses/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'subtitle' => 'required|string|max:255',
            'description' => 'required|string',
            'thumbnail' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:10240', // 10MB max
            'thumbnail_url' => 'nullable|url',
            'price' => 'required|numeric|min:0',
            'published' => 'boolean',
        ]);

        $validated['user_id'] = Auth::id();

        // Handle thumbnail upload
        if ($request->hasFile('thumbnail')) {
            $thumbnailPath = $request->file('thumbnail')->store('course-thumbnails', 'public');
            $validated['thumbnail'] = $thumbnailPath;
        } elseif ($request->filled('thumbnail_url')) {
            $validated['thumbnail'] = $request->thumbnail_url;
        } else {
            $validated['thumbnail'] = null;
        }

        // Remove thumbnail_url from validated data as it's not a database field
        unset($validated['thumbnail_url']);

        Course::create($validated);

        return redirect()->route('courses.index')
            ->with('success', 'Course created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Course $course)
    {
        $course->load(['user', 'modules.lessons']);

        $courseData = [
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
            'modules' => $course->modules->map(function ($module) {
                return [
                    'id' => $module->id,
                    'title' => $module->title,
                    'description' => $module->description,
                    'sort_order' => $module->sort_order,
                    'lessons' => $module->lessons->map(function ($lesson) {
                        return [
                            'id' => $lesson->id,
                            'title' => $lesson->title,
                            'content' => $lesson->content,
                            'sort_order' => $lesson->sort_order,
                        ];
                    }),
                ];
            }),
        ];

        return Inertia::render('courses/show', [
            'course' => $courseData
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Course $course)
    {
        return Inertia::render('courses/edit', [
            'course' => $course
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Course $course)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'subtitle' => 'required|string|max:255',
            'description' => 'required|string',
            'thumbnail' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:10240', // 10MB max
            'thumbnail_url' => 'nullable|url',
            'price' => 'required|numeric|min:0',
            'published' => 'boolean',
        ]);

        // Handle thumbnail upload
        if ($request->hasFile('thumbnail')) {
            // Delete old thumbnail if it exists and is a stored file
            if ($course->thumbnail && !filter_var($course->thumbnail, FILTER_VALIDATE_URL)) {
                $oldThumbnailPath = storage_path('app/public/' . $course->thumbnail);
                if (file_exists($oldThumbnailPath)) {
                    unlink($oldThumbnailPath);
                }
            }

            $thumbnailPath = $request->file('thumbnail')->store('course-thumbnails', 'public');
            $validated['thumbnail'] = $thumbnailPath;
        } elseif ($request->filled('thumbnail_url')) {
            $validated['thumbnail'] = $request->thumbnail_url;
        } else {
            // Keep existing thumbnail if no new one provided
            unset($validated['thumbnail']);
        }

        // Remove thumbnail_url from validated data as it's not a database field
        unset($validated['thumbnail_url']);

        $course->update($validated);

        return redirect()->route('courses.index')
            ->with('success', 'Course updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Course $course)
    {
        $course->delete();

        return redirect()->route('courses.index')
            ->with('success', 'Course deleted successfully.');
    }
}
