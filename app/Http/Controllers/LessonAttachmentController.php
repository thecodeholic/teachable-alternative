<?php

namespace App\Http\Controllers;

use App\Models\Lesson;
use App\Models\LessonAttachment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class LessonAttachmentController extends Controller
{
    /**
     * Store a newly created attachment.
     */
    public function store(Request $request)
    {
        $request->validate([
            'lesson_id' => 'required|exists:lessons,id',
            'title' => 'nullable|string|max:255',
            'attachment' => 'required|file|max:102400', // 100MB max
        ]);

        // Check if user owns the course
        $lesson = Lesson::with('module.course')->findOrFail($request->lesson_id);
        if ($lesson->module->course->user_id !== Auth::id()) {
            abort(403);
        }

        $file = $request->file('attachment');
        $fileName = $file->getClientOriginalName();
        $fileSize = $file->getSize();
        $mimeType = $file->getMimeType();

        // Store file in storage/app/public/lesson-attachments
        $filePath = $file->store('lesson-attachments', 'public');

        $lessonAttachment = LessonAttachment::create([
            'lesson_id' => $request->lesson_id,
            'title' => $request->title ?: $fileName,
            'file_path' => Storage::url($filePath),
            'file_name' => $fileName,
            'file_size' => $fileSize,
            'mime_type' => $mimeType,
        ]);

        return redirect()->back()->with('success', 'Attachment uploaded successfully.');
    }

    /**
     * Remove the specified attachment.
     */
    public function destroy(LessonAttachment $lessonAttachment)
    {
        // Check if user owns the course
        $lesson = $lessonAttachment->lesson;
        $module = $lesson->module;
        if ($module->course->user_id !== Auth::id()) {
            abort(403);
        }

        // Delete file
        $filePath = str_replace('/storage/', '', $lessonAttachment->file_path);
        Storage::disk('public')->delete($filePath);

        $lessonAttachment->delete();

        return redirect()->back()->with('success', 'Attachment deleted successfully.');
    }
}
