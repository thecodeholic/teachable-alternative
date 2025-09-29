import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import { Edit, Trash2, GripVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface Lesson {
    id: number;
    title: string;
    content: string;
    sort_order: number;
}

interface LessonCardProps {
    lesson: Lesson;
    onReorder: (lessonIds: number[]) => void;
}

export default function LessonCard({ lesson, onReorder }: LessonCardProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(lesson.title);
    const [editContent, setEditContent] = useState(lesson.content);

    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: lesson.id,
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    const { data, setData, put, processing } = useForm({
        title: lesson.title,
        content: lesson.content,
    });

    const { delete: destroy } = useForm();

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        setData('title', editTitle);
        setData('content', editContent);
        put(`/lessons/${lesson.id}`, {
            onSuccess: () => {
                setIsEditing(false);
            },
        });
    };

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this lesson?')) {
            destroy(`/lessons/${lesson.id}`);
        }
    };

    return (
        <div ref={setNodeRef} style={style}>
            <Card className="border-l-4 border-l-blue-500">
                <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div {...attributes} {...listeners}>
                                <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                            </div>
                            {isEditing ? (
                                <form onSubmit={handleUpdate} className="flex-1">
                                    <div className="space-y-2">
                                        <Input
                                            value={editTitle}
                                            onChange={(e) => setEditTitle(e.target.value)}
                                            placeholder="Lesson title"
                                            className="font-medium"
                                        />
                                        <Textarea
                                            value={editContent}
                                            onChange={(e) => setEditContent(e.target.value)}
                                            placeholder="Lesson content"
                                            rows={3}
                                        />
                                        <div className="flex gap-2">
                                            <Button type="submit" size="sm" disabled={processing}>
                                                Save
                                            </Button>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                onClick={() => {
                                                    setIsEditing(false);
                                                    setEditTitle(lesson.title);
                                                    setEditContent(lesson.content);
                                                }}
                                            >
                                                Cancel
                                            </Button>
                                        </div>
                                    </div>
                                </form>
                            ) : (
                                <div className="flex-1">
                                    <CardTitle className="text-sm font-medium">{lesson.title}</CardTitle>
                                    {lesson.content && (
                                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                                            {lesson.content}
                                        </p>
                                    )}
                                </div>
                            )}
                        </div>

                        {!isEditing && (
                            <div className="flex gap-1">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => setIsEditing(true)}
                                >
                                    <Edit className="h-3 w-3" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={handleDelete}
                                >
                                    <Trash2 className="h-3 w-3" />
                                </Button>
                            </div>
                        )}
                    </div>
                </CardHeader>
            </Card>
        </div>
    );
}
