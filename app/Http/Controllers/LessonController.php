<?php

namespace App\Http\Controllers;

use App\Models\Lesson;
use App\Models\Module;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class LessonController extends Controller
{
    /**
     * Store a newly created lesson.
     */
    public function store(Request $request)
    {
        $request->validate([
            'module_id' => 'required|exists:modules,id',
            'title' => 'required|string|max:255',
            'content' => 'nullable|string',
        ]);

        // Check if user owns the course
        $module = Module::with('course')->findOrFail($request->module_id);
        if ($module->course->user_id !== Auth::id()) {
            abort(403);
        }

        $lesson = Lesson::create([
            'module_id' => $request->module_id,
            'title' => $request->title,
            'content' => $request->content,
            'sort_order' => Lesson::where('module_id', $request->module_id)->max('sort_order') + 1,
        ]);

        return redirect()->back()->with('success', 'Lesson created successfully.');
    }

    /**
     * Update the specified lesson.
     */
    public function update(Request $request, Lesson $lesson)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'nullable|string',
        ]);

        // Check if user owns the course
        $module = $lesson->module;
        if ($module->course->user_id !== Auth::id()) {
            abort(403);
        }

        $lesson->update($request->only(['title', 'content']));

        return redirect()->back()->with('success', 'Lesson updated successfully.');
    }

    /**
     * Remove the specified lesson.
     */
    public function destroy(Lesson $lesson)
    {
        // Check if user owns the course
        $module = $lesson->module;
        if ($module->course->user_id !== Auth::id()) {
            abort(403);
        }

        $lesson->delete();

        return redirect()->back()->with('success', 'Lesson deleted successfully.');
    }

    /**
     * Reorder lessons within a module.
     */
    public function reorder(Request $request)
    {
        $request->validate([
            'module_id' => 'required|exists:modules,id',
            'lesson_ids' => 'required|array',
            'lesson_ids.*' => 'exists:lessons,id',
        ]);

        // Check if user owns the course
        $module = Module::with('course')->findOrFail($request->module_id);
        if ($module->course->user_id !== Auth::id()) {
            abort(403);
        }

        DB::transaction(function () use ($request) {
            foreach ($request->lesson_ids as $index => $lessonId) {
                Lesson::where('id', $lessonId)
                    ->where('module_id', $request->module_id)
                    ->update(['sort_order' => $index + 1]);
            }
        });

        return redirect()->back()->with('success', 'Lessons reordered successfully.');
    }
}
