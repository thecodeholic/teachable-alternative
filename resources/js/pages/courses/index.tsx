import CourseController from '@/actions/App/Http/Controllers/CourseController';
import { courses } from '@/routes';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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

            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold">Courses</h1>
                        <p className="text-muted-foreground mt-2">
                            Create and manage your online courses
                        </p>
                    </div>

                    {auth.user && (
                        <Link href={CourseController.create.url()}>
                            <Button>
                                <Plus className="h-4 w-4 mr-2" />
                                Create Course
                            </Button>
                        </Link>
                    )}
                </div>

                {courses.length === 0 ? (
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center py-12">
                            <div className="text-center">
                                <h3 className="text-lg font-semibold mb-2">No courses yet</h3>
                                <p className="text-muted-foreground mb-4">
                                    Get started by creating your first course
                                </p>
                                {auth.user && (
                                    <Link href={CourseController.create.url()}>
                                        <Button>
                                            <Plus className="h-4 w-4 mr-2" />
                                            Create Your First Course
                                        </Button>
                                    </Link>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                                <CardHeader>
                                    <CardTitle className="line-clamp-1">{course.title}</CardTitle>
                                    <CardDescription className="line-clamp-2">
                                        {course.subtitle}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                                        {course.description}
                                    </p>

                                    <div className="flex justify-between items-center mb-4">
                                        <span className="font-semibold text-lg">
                                            ${Number(course.price).toFixed(2)}
                                        </span>
                                        <span className="text-sm text-muted-foreground">
                                            by {course.user.name}
                                        </span>
                                    </div>

                                    <div className="flex gap-2">
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
