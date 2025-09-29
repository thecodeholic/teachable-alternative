import { useState, useEffect } from 'react';
import { useForm, router } from '@inertiajs/react';
import { Plus, Edit, Trash2, GripVertical } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import SortableLessons from './SortableLessons';

interface Lesson {
    id: number;
    title: string;
    content: string;
    sort_order: number;
}

interface Module {
    id: number;
    title: string;
    description: string;
    sort_order: number;
    lessons: Lesson[];
}

interface ModuleCardProps {
    module: Module;
    courseId: number;
    onReorderLessons: (moduleId: number, lessonIds: number[]) => void;
}

export default function ModuleCard({ module, courseId, onReorderLessons }: ModuleCardProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [isAddingLesson, setIsAddingLesson] = useState(false);
    const [editTitle, setEditTitle] = useState(module.title);
    const [editDescription, setEditDescription] = useState(module.description);

    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
        id: module.id,
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
    };

    const { data: moduleData, setData: setModuleData, put, processing: moduleProcessing } = useForm({
        title: module.title,
        description: module.description,
    });

    const { data: lessonData, setData: setLessonData, post, processing: lessonProcessing } = useForm({
        module_id: module.id,
        title: '',
        content: '',
    });

    const { delete: destroy } = useForm();

    const handleModuleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        setModuleData('title', editTitle);
        setModuleData('description', editDescription);
        put(`/modules/${module.id}`, {
            onSuccess: () => {
                setIsEditing(false);
            },
        });
    };

    const handleLessonCreate = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Creating lesson with data:', lessonData);

        // Use router.post instead of the post method from useForm
        router.post('/lessons', lessonData, {
            onSuccess: () => {
                console.log('Lesson created successfully');
                setLessonData('title', '');
                setLessonData('content', '');
                setIsAddingLesson(false);
                // Refresh only the course data without full page reload
                router.reload({ only: ['course'], preserveScroll: true });
            },
            onError: (errors) => {
                console.error('Lesson creation failed:', errors);
            },
        });
    };

    const handleModuleDelete = () => {
        if (confirm('Are you sure you want to delete this module? All lessons will be deleted.')) {
            destroy(`/modules/${module.id}`);
        }
    };

    const handleReorderLessons = (lessonIds: number[]) => {
        onReorderLessons(module.id, lessonIds);
    };

    return (
        <div ref={setNodeRef} style={style}>
            <Card className="mb-4">
                <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div {...attributes} {...listeners}>
                                <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                            </div>
                            {isEditing ? (
                                <form onSubmit={handleModuleUpdate} className="flex-1">
                                    <div className="space-y-2">
                                        <Input
                                            value={editTitle}
                                            onChange={(e) => setEditTitle(e.target.value)}
                                            placeholder="Module title"
                                            className="text-lg font-semibold"
                                        />
                                        <Textarea
                                            value={editDescription}
                                            onChange={(e) => setEditDescription(e.target.value)}
                                            placeholder="Module description"
                                            rows={2}
                                        />
                                        <div className="flex gap-2">
                                            <Button type="submit" size="sm" disabled={moduleProcessing}>
                                                Save
                                            </Button>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                onClick={() => {
                                                    setIsEditing(false);
                                                    setEditTitle(module.title);
                                                    setEditDescription(module.description);
                                                }}
                                            >
                                                Cancel
                                            </Button>
                                        </div>
                                    </div>
                                </form>
                            ) : (
                                <div className="flex-1">
                                    <CardTitle className="text-lg">{module.title}</CardTitle>
                                    {module.description && (
                                        <CardDescription className="mt-1">
                                            {module.description}
                                        </CardDescription>
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
                                    <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={handleModuleDelete}
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        )}
                    </div>
                </CardHeader>

                <CardContent>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <h4 className="text-sm font-medium text-muted-foreground">
                                Lessons ({module.lessons.length})
                            </h4>
                            <Dialog open={isAddingLesson} onOpenChange={setIsAddingLesson}>
                                <DialogTrigger asChild>
                                    <Button size="sm" variant="outline">
                                        <Plus className="h-4 w-4 mr-1" />
                                        Add Lesson
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Add New Lesson</DialogTitle>
                                    </DialogHeader>
                                    <form onSubmit={handleLessonCreate} className="space-y-4">
                                        <div>
                                            <Label htmlFor="lesson-title">Title</Label>
                                            <Input
                                                id="lesson-title"
                                                name="title"
                                                value={lessonData.title}
                                                onChange={(e) => setLessonData('title', e.target.value)}
                                                placeholder="Lesson title"
                                                required
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="lesson-content">Content</Label>
                                            <Textarea
                                                id="lesson-content"
                                                name="content"
                                                value={lessonData.content}
                                                onChange={(e) => setLessonData('content', e.target.value)}
                                                placeholder="Lesson content"
                                                rows={4}
                                            />
                                        </div>
                                        <div className="flex gap-2">
                                            <Button
                                                type="submit"
                                                disabled={lessonProcessing}
                                            >
                                                Create Lesson
                                            </Button>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() => setIsAddingLesson(false)}
                                            >
                                                Cancel
                                            </Button>
                                        </div>
                                    </form>
                                </DialogContent>
                            </Dialog>
                        </div>

                        <SortableLessons
                            lessons={module.lessons}
                            onReorder={handleReorderLessons}
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
