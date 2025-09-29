import CourseController from '@/actions/App/Http/Controllers/CourseController';
import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowLeft, Edit, Trash2 } from 'lucide-react';

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
    published: boolean;
    user: {
        id: number;
        name: string;
    };
    created_at: string;
}

interface Props {
    course: Course;
}

export default function CourseShow({ course }: Props) {
    const { auth } = usePage<SharedData>().props;

    return (
        <AppLayout
            title={course.title}
            description={course.subtitle}
        >
            <Head title={course.title} />

            <div className="max-w-4xl mx-auto">
                <div className="mb-6">
                    <Link href={CourseController.index.url()}>
                        <Button variant="outline" size="sm">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Courses
                        </Button>
                    </Link>
                </div>

                <Card>
                    {(course.thumbnail_url || course.thumbnail) && (
                        <div className="aspect-video bg-muted">
                            <img
                                src={course.thumbnail_url || course.thumbnail}
                                alt={course.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}

                    <CardHeader>
                        <div className="flex justify-between items-start">
                            <div>
                                <CardTitle className="text-3xl mb-2">{course.title}</CardTitle>
                                <CardDescription className="text-lg">{course.subtitle}</CardDescription>
                            </div>

                            <div className="text-right">
                                <div className="text-3xl font-bold text-[#f53003] dark:text-[#FF4433]">
                                    ${Number(course.price).toFixed(2)}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    by {course.user.name}
                                </div>
                            </div>
                        </div>
                    </CardHeader>

                    <CardContent>
                        <div className="prose max-w-none mb-8">
                            <p className="text-lg leading-relaxed">{course.description}</p>
                        </div>

                        {auth.user && auth.user.id === course.user.id && (
                            <div className="flex gap-4 pt-6 border-t">
                                <Link href={CourseController.edit.url({ course: course.id })}>
                                    <Button>
                                        <Edit className="h-4 w-4 mr-2" />
                                        Edit Course
                                    </Button>
                                </Link>

                                <Button
                                    variant="destructive"
                                    onClick={() => {
                                        if (confirm('Are you sure you want to delete this course?')) {
                                            // Handle delete
                                        }
                                    }}
                                >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete Course
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
