import { useState, useRef, useCallback } from 'react';
import { Head, Link, useForm, router, usePage } from '@inertiajs/react';
import { ArrowLeft, Save, Upload, Video, Paperclip, Trash2, Play, X, ChevronDown, ChevronRight, File } from 'lucide-react';
import { marked } from 'marked';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import MarkdownEditor from '@/components/MarkdownEditor';
import AppLayout from '@/layouts/app-layout';
import { type SharedData } from '@/types';

interface LessonVideo {
    id: number;
    title: string;
    file_path: string;
    file_name: string;
    file_size: number;
    mime_type: string;
    duration?: number;
}

interface LessonAttachment {
    id: number;
    title: string;
    file_path: string;
    file_name: string;
    file_size: number;
    mime_type: string;
}

interface Lesson {
    id: number;
    title: string;
    content: string;
    sort_order: number;
    module: {
        id: number;
        title: string;
        course: {
            id: number;
            title: string;
        };
    };
    videos: LessonVideo[];
    attachments: LessonAttachment[];
}

interface Props {
    lesson: Lesson;
}

export default function LessonShow({ lesson }: Props) {
    const { auth } = usePage<SharedData>().props;
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(lesson.title);
    const [editContent, setEditContent] = useState(lesson.content);
    const [isNotesCollapsed, setIsNotesCollapsed] = useState(false);
    const [isAttachmentsCollapsed, setIsAttachmentsCollapsed] = useState(false);
    const [isDragOver, setIsDragOver] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState<File | null>(null);
    const [selectedAttachments, setSelectedAttachments] = useState<File[]>([]);
    const [isSaving, setIsSaving] = useState(false);
    const videoInputRef = useRef<HTMLInputElement>(null);
    const attachmentInputRef = useRef<HTMLInputElement>(null);

    const { data: lessonData, setData: setLessonData, put, processing } = useForm({
        title: lesson.title,
        content: lesson.content,
    });

    const { data: videoData, setData: setVideoData, post: postVideo, processing: videoProcessing } = useForm({
        lesson_id: lesson.id,
        title: '',
        video: null as File | null,
    });

    const { data: attachmentData, setData: setAttachmentData, post: postAttachment, processing: attachmentProcessing } = useForm({
        lesson_id: lesson.id,
        title: '',
        attachment: null as File | null,
    });

    // Simple save function for lesson content
    const saveLessonContent = useCallback((content: string) => {
        setIsSaving(true);
        setLessonData('content', content);
        put(`/lessons/${lesson.id}`, {
            preserveScroll: true,
            onSuccess: () => {
                setIsSaving(false);
            },
            onError: () => {
                setIsSaving(false);
            },
        });
    }, [lesson.id, setLessonData, put]);

    const handleLessonUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        setLessonData('title', editTitle);
        setLessonData('content', editContent);
        put(`/lessons/${lesson.id}`, {
            onSuccess: () => {
                setIsEditing(false);
            },
        });
    };

    const handleVideoUpload = () => {
        if (!selectedVideo) return;

        setVideoData('title', selectedVideo.name);
        setVideoData('video', selectedVideo);

        postVideo('/lesson-videos', {
            onSuccess: () => {
                setSelectedVideo(null);
                router.reload({ only: ['lesson'] });
            },
        });
    };

    const handleAttachmentUpload = () => {
        if (selectedAttachments.length === 0) return;

        // For now, upload one at a time (can be improved for batch upload)
        const file = selectedAttachments[0];
        setAttachmentData('title', file.name);
        setAttachmentData('attachment', file);

        postAttachment('/lesson-attachments', {
            onSuccess: () => {
                setSelectedAttachments(prev => prev.slice(1));
                router.reload({ only: ['lesson'] });
            },
        });
    };

    const handleVideoFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && file.type.startsWith('video/')) {
            setSelectedVideo(file);
        }
    };

    const handleAttachmentFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        setSelectedAttachments(prev => [...prev, ...files]);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);

        const files = Array.from(e.dataTransfer.files);
        const videoFile = files.find(file => file.type.startsWith('video/'));

        if (videoFile) {
            setSelectedVideo(videoFile);
        }
    };

    const removeVideo = () => {
        setSelectedVideo(null);
        if (videoInputRef.current) {
            videoInputRef.current.value = '';
        }
    };

    const changeVideo = () => {
        videoInputRef.current?.click();
    };

    const removeAttachment = (index: number) => {
        setSelectedAttachments(prev => prev.filter((_, i) => i !== index));
    };

    const clearAllAttachments = () => {
        setSelectedAttachments([]);
        if (attachmentInputRef.current) {
            attachmentInputRef.current.value = '';
        }
    };

    const handleDeleteVideo = (videoId: number) => {
        if (confirm('Are you sure you want to delete this video?')) {
            router.delete(`/lesson-videos/${videoId}`, {
                onSuccess: () => {
                    router.reload({ only: ['lesson'] });
                },
            });
        }
    };

    const handleDeleteAttachment = (attachmentId: number) => {
        if (confirm('Are you sure you want to delete this attachment?')) {
            router.delete(`/lesson-attachments/${attachmentId}`, {
                onSuccess: () => {
                    router.reload({ only: ['lesson'] });
                },
            });
        }
    };

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    return (
        <AppLayout
            title={lesson.title}
            description={`Lesson in ${lesson.module.course.title}`}
        >
            <Head title={lesson.title} />

            <div className="max-w-6xl mx-auto">
                <div className="mb-6">
                    <Link href={`/courses/${lesson.module.course.id}`}>
                        <Button variant="outline" size="sm">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Course
                        </Button>
                    </Link>
                </div>

                <Card>
                    <CardHeader>
                        <div className="flex justify-between items-start">
                            <div>
                                <CardTitle className="text-2xl mb-2">
                                    {isEditing ? (
                                        <Input
                                            value={editTitle}
                                            onChange={(e) => setEditTitle(e.target.value)}
                                            className="text-2xl font-bold"
                                        />
                                    ) : (
                                        lesson.title
                                    )}
                                </CardTitle>
                                <CardDescription>
                                    {lesson.module.course.title} • {lesson.module.title}
                                </CardDescription>
                            </div>

                            {auth.user && (
                                <div className="flex gap-2">
                                    {isEditing ? (
                                        <>
                                            <Button
                                                onClick={handleLessonUpdate}
                                                disabled={processing}
                                            >
                                                <Save className="h-4 w-4 mr-2" />
                                                Save
                                            </Button>
                                            <Button
                                                variant="outline"
                                                onClick={() => {
                                                    setIsEditing(false);
                                                    setEditTitle(lesson.title);
                                                    setEditContent(lesson.content);
                                                }}
                                            >
                                                Cancel
                                            </Button>
                                        </>
                                    ) : (
                                        <Button
                                            variant="outline"
                                            onClick={() => setIsEditing(true)}
                                        >
                                            Edit Lesson
                                        </Button>
                                    )}
                                </div>
                            )}
                        </div>
                    </CardHeader>

                    <CardContent>
                        {isEditing ? (
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="lesson-content">Content</Label>
                                    <MarkdownEditor
                                        value={editContent}
                                        onChange={setEditContent}
                                        placeholder="Enter your lesson content here..."
                                        height={300}
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-8">
                                {/* Video Upload Section */}
                                <div className="space-y-4">
                                    <h3 className="text-lg font-semibold flex items-center gap-2">
                                        <Video className="h-5 w-5" />
                                        Lesson Video
                                    </h3>

                                    {/* Existing Videos */}
                                    {lesson.videos.length > 0 && (
                                        <div className="grid gap-4">
                                            {lesson.videos.map((video) => (
                                                <div key={video.id} className="relative group">
                                                    <Card>
                                                        <CardContent className="p-4">
                                                            <div className="flex items-center gap-4">
                                                                <div className="aspect-video bg-muted rounded-lg overflow-hidden flex-shrink-0 w-48">
                                                                    <video
                                                                        src={video.file_path}
                                                                        controls
                                                                        className="w-full h-full object-cover"
                                                                    >
                                                                        Your browser does not support the video tag.
                                                                    </video>
                                                                </div>
                                                                <div className="flex-1">
                                                                    <h4 className="font-medium">{video.title}</h4>
                                                                    <p className="text-sm text-muted-foreground">
                                                                        {video.file_name} • {formatFileSize(video.file_size)}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                    {auth.user && (
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                                            onClick={() => handleDeleteVideo(video.id)}
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Video Upload Area */}
                                    {auth.user && !selectedVideo && lesson.videos.length === 0 && (
                                        <div
                                            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                                                isDragOver
                                                    ? 'border-primary bg-primary/5'
                                                    : 'border-muted-foreground/25 hover:border-muted-foreground/50'
                                            }`}
                                            onDragOver={handleDragOver}
                                            onDragLeave={handleDragLeave}
                                            onDrop={handleDrop}
                                        >
                                            <Video className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                                            <h4 className="text-lg font-medium mb-2">Upload Video</h4>
                                            <p className="text-muted-foreground mb-4">
                                                Drag and drop a video file here, or click to browse
                                            </p>
                                            <Button
                                                onClick={() => videoInputRef.current?.click()}
                                                variant="outline"
                                            >
                                                <Upload className="h-4 w-4 mr-2" />
                                                Choose Video File
                                            </Button>
                                            <input
                                                ref={videoInputRef}
                                                type="file"
                                                accept="video/*"
                                                onChange={handleVideoFileChange}
                                                className="hidden"
                                            />
                                        </div>
                                    )}

                                    {/* Selected Video Preview */}
                                    {selectedVideo && (
                                        <Card>
                                            <CardContent className="p-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="aspect-video bg-muted rounded-lg overflow-hidden flex-shrink-0 w-48">
                                                        <video
                                                            src={URL.createObjectURL(selectedVideo)}
                                                            controls
                                                            className="w-full h-full object-cover"
                                                        >
                                                            Your browser does not support the video tag.
                                                        </video>
                                                    </div>
                                                    <div className="flex-1">
                                                        <h4 className="font-medium">{selectedVideo.name}</h4>
                                                        <p className="text-sm text-muted-foreground">
                                                            {formatFileSize(selectedVideo.size)}
                                                        </p>
                                                    </div>
                                                    <div className="flex gap-2">
                                                        <Button
                                                            onClick={changeVideo}
                                                            variant="outline"
                                                            size="sm"
                                                        >
                                                            Change Video
                                                        </Button>
                                                        <Button
                                                            onClick={removeVideo}
                                                            variant="outline"
                                                            size="sm"
                                                        >
                                                            <X className="h-4 w-4 mr-1" />
                                                            Remove
                                                        </Button>
                                                        <Button
                                                            onClick={handleVideoUpload}
                                                            disabled={videoProcessing}
                                                        >
                                                            <Upload className="h-4 w-4 mr-2" />
                                                            Upload
                                                        </Button>
                                                    </div>
                                                </div>
                                                <input
                                                    ref={videoInputRef}
                                                    type="file"
                                                    accept="video/*"
                                                    onChange={handleVideoFileChange}
                                                    className="hidden"
                                                />
                                            </CardContent>
                                        </Card>
                                    )}
                                </div>

                                {/* Lesson Notes Section - Collapsible */}
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => setIsNotesCollapsed(!isNotesCollapsed)}
                                            className="p-0 h-auto"
                                        >
                                            {isNotesCollapsed ? (
                                                <ChevronRight className="h-4 w-4" />
                                            ) : (
                                                <ChevronDown className="h-4 w-4" />
                                            )}
                                        </Button>
                                        <h3 className="text-lg font-semibold">Lesson Notes</h3>
                                    </div>

                                    {!isNotesCollapsed && (
                                        <div className="ml-6">
                                            {auth.user ? (
                                                <div className="space-y-4">
                                                    <MarkdownEditor
                                                        value={editContent}
                                                        onChange={setEditContent}
                                                        placeholder="Enter your lesson notes here..."
                                                        height={300}
                                                    />
                                                    <div className="flex justify-between items-center">
                                                        <div>
                                                            {isSaving && (
                                                                <p className="text-sm text-muted-foreground">
                                                                    Saving...
                                                                </p>
                                                            )}
                                                        </div>
                                                        <Button
                                                            onClick={() => saveLessonContent(editContent)}
                                                            disabled={isSaving || processing}
                                                            size="sm"
                                                        >
                                                            <Save className="h-4 w-4 mr-2" />
                                                            Save Notes
                                                        </Button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="prose max-w-none">
                                                    <div dangerouslySetInnerHTML={{ __html: marked(lesson.content) }} />
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>

                                {/* Lesson Attachments Section - Collapsible */}
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => setIsAttachmentsCollapsed(!isAttachmentsCollapsed)}
                                            className="p-0 h-auto"
                                        >
                                            {isAttachmentsCollapsed ? (
                                                <ChevronRight className="h-4 w-4" />
                                            ) : (
                                                <ChevronDown className="h-4 w-4" />
                                            )}
                                        </Button>
                                        <h3 className="text-lg font-semibold">Lesson Attachments</h3>
                                    </div>

                                    {!isAttachmentsCollapsed && (
                                        <div className="ml-6 space-y-4">
                                            {/* Existing Attachments */}
                                            {lesson.attachments.length > 0 && (
                                                <div className="grid gap-2">
                                                    {lesson.attachments.map((attachment) => (
                                                        <div key={attachment.id} className="relative group">
                                                            <Card>
                                                                <CardContent className="p-3">
                                                                    <div className="flex items-center gap-3">
                                                                        <File className="h-4 w-4 text-muted-foreground" />
                                                                        <div className="flex-1">
                                                                            <h4 className="font-medium">{attachment.title}</h4>
                                                                            <p className="text-sm text-muted-foreground">
                                                                                {attachment.file_name} • {formatFileSize(attachment.file_size)}
                                                                            </p>
                                                                        </div>
                                                                        <Button
                                                                            variant="outline"
                                                                            size="sm"
                                                                            onClick={() => window.open(attachment.file_path, '_blank')}
                                                                        >
                                                                            Download
                                                                        </Button>
                                                                    </div>
                                                                </CardContent>
                                                            </Card>
                                                            {auth.user && (
                                                                <Button
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                                                                    onClick={() => handleDeleteAttachment(attachment.id)}
                                                                >
                                                                    <Trash2 className="h-4 w-4" />
                                                                </Button>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}

                                            {/* Attachment Upload */}
                                            {auth.user && (
                                                <Card>
                                                    <CardContent className="p-4">
                                                        <div className="space-y-4">
                                                            <div>
                                                                <Label htmlFor="attachment-upload">Choose Files</Label>
                                                                <Input
                                                                    id="attachment-upload"
                                                                    type="file"
                                                                    multiple
                                                                    onChange={handleAttachmentFileChange}
                                                                    ref={attachmentInputRef}
                                                                />
                                                            </div>

                                                            {/* Selected Attachments Preview */}
                                                            {selectedAttachments.length > 0 && (
                                                                <div className="space-y-2">
                                                                    <div className="flex items-center justify-between">
                                                                        <p className="text-sm font-medium">
                                                                            Selected Files ({selectedAttachments.length})
                                                                        </p>
                                                                        <Button
                                                                            variant="outline"
                                                                            size="sm"
                                                                            onClick={clearAllAttachments}
                                                                        >
                                                                            <X className="h-4 w-4 mr-1" />
                                                                            Clear All
                                                                        </Button>
                                                                    </div>
                                                                    <div className="space-y-1">
                                                                        {selectedAttachments.map((file, index) => (
                                                                            <div key={index} className="flex items-center justify-between p-2 border rounded">
                                                                                <div className="flex items-center gap-2">
                                                                                    <File className="h-4 w-4 text-muted-foreground" />
                                                                                    <span className="text-sm">{file.name}</span>
                                                                                    <span className="text-xs text-muted-foreground">
                                                                                        ({formatFileSize(file.size)})
                                                                                    </span>
                                                                                </div>
                                                                                <Button
                                                                                    variant="ghost"
                                                                                    size="sm"
                                                                                    onClick={() => removeAttachment(index)}
                                                                                >
                                                                                    <X className="h-4 w-4" />
                                                                                </Button>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                    <Button
                                                                        onClick={handleAttachmentUpload}
                                                                        disabled={attachmentProcessing}
                                                                    >
                                                                        <Upload className="h-4 w-4 mr-2" />
                                                                        Upload {selectedAttachments.length} File{selectedAttachments.length > 1 ? 's' : ''}
                                                                    </Button>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
