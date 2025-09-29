import CourseController from '@/actions/App/Http/Controllers/CourseController';
import { courses } from '@/routes';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Plus, Edit, Trash2, Eye, Globe, Lock } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AppLayout from '@/layouts/app-layout';
import { type SharedData } from '@/types';

interface Course {
    id: number;
    title: string;
    subtitle: string;
    description: string;
    thumbnail?: string;
    thumbnail_url?: string;
    price: string | number;
    published: boolean;
    user: {
        id: number;
        name: string;
    };
    created_at: string;
}

interface Props {
    courses: Course[];
}

export default function CoursesIndex({ courses }: Props) {
    const { auth } = usePage<SharedData>().props;

    const handleDelete = (courseId: number) => {
        if (confirm('Are you sure you want to delete this course?')) {
            router.delete(CourseController.destroy.url({ course: courseId }));
        }
    };

    return (
        <AppLayout
            title="Courses"
            description="Manage your courses"
        >
            <Head title="Courses" />

            <div className="max-w-7xl mx-auto space-y-8">
                <div className="flex justify-between items-start">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tight">Courses</h1>
                        <p className="text-muted-foreground text-lg">
                            Create and manage your online courses
                        </p>
                    </div>

                    {auth.user && (
                        <Link href={CourseController.create.url()}>
                            <Button size="lg">
                                <Plus className="h-4 w-4 mr-2" />
                                Create Course
                            </Button>
                        </Link>
                    )}
                </div>

                {courses.length === 0 ? (
                    <Card className="border-dashed">
                        <CardContent className="flex flex-col items-center justify-center py-16 px-6">
                            <div className="text-center space-y-4">
                                <div className="mx-auto w-12 h-12 bg-muted rounded-full flex items-center justify-center">
                                    <Plus className="h-6 w-6 text-muted-foreground" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-xl font-semibold">No courses yet</h3>
                                    <p className="text-muted-foreground max-w-md">
                                        Get started by creating your first course and begin sharing your knowledge with the world.
                                    </p>
                                </div>
                                {auth.user && (
                                    <Link href={CourseController.create.url()}>
                                        <Button size="lg" className="mt-4">
                                            <Plus className="h-4 w-4 mr-2" />
                                            Create Your First Course
                                        </Button>
                                    </Link>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {courses.map((course) => (
                            <Card key={course.id} className="overflow-hidden">
                                <div className="aspect-video bg-muted">
                                    {(course.thumbnail_url || course.thumbnail) ? (
                                        <img
                                            src={course.thumbnail_url || course.thumbnail}
                                            alt={course.title}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-700">
                                            <div className="text-center p-4">
                                                <div className="text-4xl mb-2">📚</div>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">Course Image</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <CardHeader className="space-y-2">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1 min-w-0">
                                            <CardTitle className="line-clamp-1 text-lg">{course.title}</CardTitle>
                                            <CardDescription className="line-clamp-2">
                                                {course.subtitle}
                                            </CardDescription>
                                        </div>
                                        <Badge
                                            variant={course.published ? "default" : "secondary"}
                                            className="ml-2 flex items-center gap-1"
                                        >
                                            {course.published ? (
                                                <>
                                                    <Globe className="h-3 w-3" />
                                                    Published
                                                </>
                                            ) : (
                                                <>
                                                    <Lock className="h-3 w-3" />
                                                    Draft
                                                </>
                                            )}
                                        </Badge>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <p className="text-sm text-muted-foreground line-clamp-3">
                                        {course.description}
                                    </p>

                                    <div className="flex justify-between items-center">
                                        <span className="font-semibold text-lg">
                                            ${Number(course.price).toFixed(2)}
                                        </span>
                                        <span className="text-sm text-muted-foreground">
                                            by {course.user.name}
                                        </span>
                                    </div>

                                    <div className="flex gap-2 pt-2">
                                        <Link
                                            href={CourseController.show.url({ course: course.id })}
                                            className="flex-1"
                                        >
                                            <Button variant="outline" size="sm" className="w-full">
                                                <Eye className="h-4 w-4 mr-2" />
                                                View
                                            </Button>
                                        </Link>

                                        {auth.user && auth.user.id === course.user.id && (
                                            <>
                                                <Link href={CourseController.edit.url({ course: course.id })}>
                                                    <Button variant="outline" size="sm">
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                </Link>

                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => handleDelete(course.id)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
