import { useState, useEffect } from 'react';
import { useForm, router } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import ModuleCard from './ModuleCard';

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

interface SortableModulesProps {
    modules: Module[];
    courseId: number;
}

export default function SortableModules({ modules, courseId }: SortableModulesProps) {
    const [isAddingModule, setIsAddingModule] = useState(false);
    const [localModules, setLocalModules] = useState(modules);

    // Update local state when props change
    useEffect(() => {
        setLocalModules(modules);
    }, [modules]);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const { data: moduleData, setData: setModuleData, post, processing } = useForm({
        course_id: courseId,
        title: '',
        description: '',
    });

    // Remove the reorderModules from useForm since we'll use router.post directly

    const handleModuleCreate = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Creating module with data:', moduleData);

        // Use router.post instead of the post method from useForm
        router.post('/modules', moduleData, {
            onSuccess: () => {
                console.log('Module created successfully');
                setModuleData('title', '');
                setModuleData('description', '');
                setIsAddingModule(false);
                // Refresh only the course data without full page reload
                router.reload({ only: ['course'], preserveScroll: true });
            },
            onError: (errors) => {
                console.error('Module creation failed:', errors);
            },
        });
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (active.id !== over?.id) {
            const oldIndex = localModules.findIndex((item) => item.id === active.id);
            const newIndex = localModules.findIndex((item) => item.id === over?.id);

            const newItems = arrayMove(localModules, oldIndex, newIndex);
            setLocalModules(newItems);

            // Update sort orders and send to server
            const moduleIds = newItems.map((item) => item.id);
            console.log('Reordering modules:', { course_id: courseId, module_ids: moduleIds });
            router.post('/modules/reorder', {
                course_id: courseId,
                module_ids: moduleIds,
            }, {
                preserveScroll: true,
                onSuccess: () => {
                    console.log('Modules reordered successfully');
                    // No need to refresh since we already updated local state
                },
                onError: (errors) => {
                    console.error('Module reordering failed:', errors);
                },
            });
        }
    };

    const handleReorderLessons = (moduleId: number, lessonIds: number[]) => {
        // Update local state
        setLocalModules((modules) =>
            modules.map((module) => {
                if (module.id === moduleId) {
                    const reorderedLessons = lessonIds.map((lessonId, index) => {
                        const lesson = module.lessons.find((l) => l.id === lessonId);
                        return lesson ? { ...lesson, sort_order: index + 1 } : null;
                    }).filter(Boolean) as Lesson[];

                    return {
                        ...module,
                        lessons: reorderedLessons,
                    };
                }
                return module;
            })
        );

        // Send to server
        console.log('Reordering lessons:', { module_id: moduleId, lesson_ids: lessonIds });
        router.post('/lessons/reorder', {
            module_id: moduleId,
            lesson_ids: lessonIds,
        }, {
            preserveScroll: true,
            onSuccess: () => {
                console.log('Lessons reordered successfully');
                // No need to refresh since we already updated local state
            },
            onError: (errors) => {
                console.error('Lesson reordering failed:', errors);
            },
        });
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Course Modules</h3>
                <Dialog open={isAddingModule} onOpenChange={setIsAddingModule}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="h-4 w-4 mr-2" />
                            Add Module
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add New Module</DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleModuleCreate} className="space-y-4">
                            <div>
                                <Label htmlFor="module-title">Title</Label>
                                <Input
                                    id="module-title"
                                    value={moduleData.title}
                                    onChange={(e) => setModuleData('title', e.target.value)}
                                    placeholder="Module title"
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="module-description">Description</Label>
                                <Textarea
                                    id="module-description"
                                    value={moduleData.description}
                                    onChange={(e) => setModuleData('description', e.target.value)}
                                    placeholder="Module description"
                                    rows={3}
                                />
                            </div>
                            <div className="flex gap-2">
                                <Button type="submit" disabled={processing}>
                                    Create Module
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setIsAddingModule(false)}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
                modifiers={[restrictToVerticalAxis]}
            >
                <SortableContext
                    items={localModules.map((module) => module.id)}
                    strategy={verticalListSortingStrategy}
                >
                    <div className="space-y-4">
                        {localModules.map((module) => (
                            <ModuleCard
                                key={module.id}
                                module={module}
                                courseId={courseId}
                                onReorderLessons={handleReorderLessons}
                            />
                        ))}
                    </div>
                </SortableContext>
            </DndContext>

            {localModules.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                    <p>No modules yet. Create your first module to get started.</p>
                </div>
            )}
        </div>
    );
}
