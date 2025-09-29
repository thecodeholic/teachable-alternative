<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Module;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class ModuleController extends Controller
{
    /**
     * Store a newly created module.
     */
    public function store(Request $request)
    {
        $request->validate([
            'course_id' => 'required|exists:courses,id',
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        // Check if user owns the course
        $course = Course::where('id', $request->course_id)
            ->where('user_id', Auth::id())
            ->firstOrFail();

        $module = Module::create([
            'course_id' => $request->course_id,
            'title' => $request->title,
            'description' => $request->description,
            'sort_order' => Module::where('course_id', $request->course_id)->max('sort_order') + 1,
        ]);

        return redirect()->back()->with('success', 'Module created successfully.');
    }

    /**
     * Update the specified module.
     */
    public function update(Request $request, Module $module)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        // Check if user owns the course
        $course = $module->course;
        if ($course->user_id !== Auth::id()) {
            abort(403);
        }

        $module->update($request->only(['title', 'description']));

        return redirect()->back()->with('success', 'Module updated successfully.');
    }

    /**
     * Remove the specified module.
     */
    public function destroy(Module $module)
    {
        // Check if user owns the course
        $course = $module->course;
        if ($course->user_id !== Auth::id()) {
            abort(403);
        }

        $module->delete();

        return redirect()->back()->with('success', 'Module deleted successfully.');
    }

    /**
     * Reorder modules within a course.
     */
    public function reorder(Request $request)
    {
        $request->validate([
            'course_id' => 'required|exists:courses,id',
            'module_ids' => 'required|array',
            'module_ids.*' => 'exists:modules,id',
        ]);

        // Check if user owns the course
        $course = Course::where('id', $request->course_id)
            ->where('user_id', Auth::id())
            ->firstOrFail();

        DB::transaction(function () use ($request) {
            foreach ($request->module_ids as $index => $moduleId) {
                Module::where('id', $moduleId)
                    ->where('course_id', $request->course_id)
                    ->update(['sort_order' => $index + 1]);
            }
        });

        return redirect()->back()->with('success', 'Modules reordered successfully.');
    }
}
