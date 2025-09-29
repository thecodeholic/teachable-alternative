import { useState, useEffect } from 'react';
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
import LessonCard from './LessonCard';

interface Lesson {
    id: number;
    title: string;
    content: string;
    sort_order: number;
}

interface SortableLessonsProps {
    lessons: Lesson[];
    onReorder: (lessonIds: number[]) => void;
}

export default function SortableLessons({ lessons, onReorder }: SortableLessonsProps) {
    const [localLessons, setLocalLessons] = useState(lessons);

    // Update local state when props change
    useEffect(() => {
        setLocalLessons(lessons);
    }, [lessons]);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (active.id !== over?.id) {
            setLocalLessons((items) => {
                const oldIndex = items.findIndex((item) => item.id === active.id);
                const newIndex = items.findIndex((item) => item.id === over?.id);

                const newItems = arrayMove(items, oldIndex, newIndex);
                const lessonIds = newItems.map((item) => item.id);

                // Call the parent's reorder function
                onReorder(lessonIds);

                return newItems;
            });
        }
    };

    return (
        <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToVerticalAxis]}
        >
            <SortableContext
                items={localLessons.map((lesson) => lesson.id)}
                strategy={verticalListSortingStrategy}
            >
                <div className="space-y-2">
                    {localLessons.map((lesson) => (
                        <LessonCard
                            key={lesson.id}
                            lesson={lesson}
                            onReorder={onReorder}
                        />
                    ))}
                </div>
            </SortableContext>
        </DndContext>
    );
}
