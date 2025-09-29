import CourseController from '@/actions/App/Http/Controllers/CourseController';
import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowLeft, Edit, Trash2, Calendar, User, DollarSign, Eye, EyeOff, GraduationCap } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AppLayout from '@/layouts/app-layout';
import SortableModules from '@/components/SortableModules';
import { type SharedData } from '@/types';

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
    modules: Module[];
}

interface Props {
    course: Course;
}

export default function CourseShow({ course }: Props) {
    const { auth } = usePage<SharedData>().props;
    const isOwner = auth.user && auth.user.id === course.user.id;

    return (
        <AppLayout
            title={course.title}
            description={course.subtitle}
        >
            <Head title={course.title} />

            <div className="max-w-6xl mx-auto">
                {/* Header Navigation */}
                <div className="mb-8">
                    <Link href={CourseController.index.url()}>
                        <Button variant="outline" size="sm">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Back to Courses
                        </Button>
                    </Link>
                </div>

                {/* Course Overview Section */}
                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Main Course Information */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Course Header Card */}
                        <Card>
                            {(course.thumbnail_url || course.thumbnail) && (
                                <div className="aspect-video bg-muted rounded-t-lg overflow-hidden">
                                    <img
                                        src={course.thumbnail_url || course.thumbnail}
                                        alt={course.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <CardTitle className="text-2xl">{course.title}</CardTitle>
                                            <Badge variant={course.published ? "default" : "secondary"}>
                                                {course.published ? (
                                                    <>
                                                        <Eye className="h-3 w-3 mr-1" />
                                                        Published
                                                    </>
                                                ) : (
                                                    <>
                                                        <EyeOff className="h-3 w-3 mr-1" />
                                                        Draft
                                                    </>
                                                )}
                                            </Badge>
                                        </div>
                                        <CardDescription className="text-base">
                                            {course.subtitle}
                                        </CardDescription>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-3xl font-bold text-primary">
                                            ${Number(course.price).toFixed(2)}
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="prose max-w-none">
                                    <p className="text-base leading-relaxed text-muted-foreground">
                                        {course.description}
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Course Content */}
                        {isOwner && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Course Content</CardTitle>
                                    <CardDescription>
                                        Manage your course modules and lessons.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <SortableModules modules={course.modules} courseId={course.id} />
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Sidebar Information */}
                    <div className="space-y-6">
                        {/* Course Details */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Course Details</CardTitle>
                                <CardDescription>
                                    Information about this course.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <User className="h-4 w-4 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm font-medium">Instructor</p>
                                        <p className="text-sm text-muted-foreground">{course.user.name}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm font-medium">Price</p>
                                        <p className="text-sm text-muted-foreground">${Number(course.price).toFixed(2)}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Calendar className="h-4 w-4 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm font-medium">Created</p>
                                        <p className="text-sm text-muted-foreground">
                                            {new Date(course.created_at).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                                    <div>
                                        <p className="text-sm font-medium">Modules</p>
                                        <p className="text-sm text-muted-foreground">
                                            {course.modules.length} module{course.modules.length !== 1 ? 's' : ''}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Course Actions */}
                        {isOwner && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Course Actions</CardTitle>
                                    <CardDescription>
                                        Manage your course settings and content.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <Link href={CourseController.edit.url({ course: course.id })} className="block">
                                        <Button className="w-full justify-start">
                                            <Edit className="h-4 w-4 mr-2" />
                                            Edit Course
                                        </Button>
                                    </Link>
                                    <Button
                                        variant="destructive"
                                        className="w-full justify-start"
                                        onClick={() => {
                                            if (confirm('Are you sure you want to delete this course?')) {
                                                // Handle delete
                                            }
                                        }}
                                    >
                                        <Trash2 className="h-4 w-4 mr-2" />
                                        Delete Course
                                    </Button>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
