<?php

namespace App\Http\Controllers;

use App\Models\Lesson;
use App\Models\LessonVideo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class LessonVideoController extends Controller
{
    /**
     * Store a newly created video.
     * STUB METHOD - Replace with CDN/third-party service integration
     */
    public function store(Request $request)
    {
        $request->validate([
            'lesson_id' => 'required|exists:lessons,id',
            'title' => 'nullable|string|max:255',
            'video' => 'required|file|mimes:mp4,avi,mov,wmv,flv,webm|max:102400', // 100MB max
        ]);

        // Check if user owns the course
        $lesson = Lesson::with('module.course')->findOrFail($request->lesson_id);
        if ($lesson->module->course->user_id !== Auth::id()) {
            abort(403);
        }

        $file = $request->file('video');
        $fileName = $file->getClientOriginalName();
        $fileSize = $file->getSize();
        $mimeType = $file->getMimeType();

        // TODO: Replace this with your CDN/third-party service integration
        // For now, storing locally as a stub
        $filePath = $file->store('lesson-videos', 'public');

        $lessonVideo = LessonVideo::create([
            'lesson_id' => $request->lesson_id,
            'title' => $request->title ?: $fileName,
            'file_path' => Storage::url($filePath), // Replace with CDN URL
            'file_name' => $fileName,
            'file_size' => $fileSize,
            'mime_type' => $mimeType,
        ]);

        return redirect()->back()->with('success', 'Video uploaded successfully. (Stub method - integrate with CDN)');
    }

    /**
     * Remove the specified video.
     */
    public function destroy(LessonVideo $lessonVideo)
    {
        // Check if user owns the course
        $lesson = $lessonVideo->lesson;
        $module = $lesson->module;
        if ($module->course->user_id !== Auth::id()) {
            abort(403);
        }

        // Delete file
        $filePath = str_replace('/storage/', '', $lessonVideo->file_path);
        Storage::disk('public')->delete($filePath);

        $lessonVideo->delete();

        return redirect()->back()->with('success', 'Video deleted successfully.');
    }
}
