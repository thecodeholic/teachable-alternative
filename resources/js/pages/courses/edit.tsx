import CourseController from '@/actions/App/Http/Controllers/CourseController';
import { courses } from '@/routes';
import { Form, Head, Link } from '@inertiajs/react';
import { LoaderCircle, Upload, Image as ImageIcon, X } from 'lucide-react';
import { useState } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';

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
    course: Course;
}

export default function EditCourse({ course }: Props) {
    const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
    const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
    const [thumbnailUrl, setThumbnailUrl] = useState<string>(course.thumbnail_url || '');

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setThumbnailFile(file);
            setThumbnailUrl(''); // Clear URL when file is selected
            const reader = new FileReader();
            reader.onload = (e) => {
                setThumbnailPreview(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeThumbnail = () => {
        setThumbnailFile(null);
        setThumbnailPreview(null);
    };

    const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setThumbnailUrl(event.target.value);
        if (event.target.value) {
            setThumbnailFile(null);
            setThumbnailPreview(null);
        }
    };

    return (
        <AppLayout
            title="Edit Course"
            description="Update your course information"
        >
            <Head title="Edit Course" />
            <Form
                {...CourseController.update.form({ course: course.id })}
                resetOnSuccess
                disableWhileProcessing
                encType="multipart/form-data"
                className="max-w-4xl mx-auto"
                defaultValues={{
                    title: course.title,
                    subtitle: course.subtitle,
                    description: course.description,
                    price: course.price.toString(),
                }}
            >
                {({ processing, errors }) => (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Main Form */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="grid gap-2">
                                <Label htmlFor="title">Course Title</Label>
                                <Input
                                    id="title"
                                    type="text"
                                    required
                                    autoFocus
                                    tabIndex={1}
                                    name="title"
                                    placeholder="Enter course title"
                                />
                                <InputError
                                    message={errors.title}
                                    className="mt-2"
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="subtitle">Course Subtitle</Label>
                                <Input
                                    id="subtitle"
                                    type="text"
                                    required
                                    tabIndex={2}
                                    name="subtitle"
                                    placeholder="Enter course subtitle"
                                />
                                <InputError message={errors.subtitle} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="description">Description</Label>
                                <textarea
                                    id="description"
                                    required
                                    tabIndex={3}
                                    name="description"
                                    placeholder="Describe your course content and what students will learn"
                                    rows={6}
                                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                />
                                <InputError message={errors.description} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="price">Price ($)</Label>
                                <Input
                                    id="price"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    required
                                    tabIndex={4}
                                    name="price"
                                    placeholder="0.00"
                                />
                                <InputError message={errors.price} />
                            </div>

                            <div className="flex gap-4">
                                <Button
                                    type="submit"
                                    className="flex-1"
                                    tabIndex={5}
                                    disabled={processing}
                                >
                                    {processing && (
                                        <LoaderCircle className="h-4 w-4 animate-spin mr-2" />
                                    )}
                                    Update Course
                                </Button>

                                <Link href={CourseController.show.url({ course: course.id })}>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        tabIndex={6}
                                    >
                                        Cancel
                                    </Button>
                                </Link>
                            </div>
                        </div>

                        {/* Thumbnail Upload */}
                        <div className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Course Thumbnail</CardTitle>
                                    <CardDescription>
                                        Upload an image that represents your course
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {!thumbnailPreview && !thumbnailUrl ? (
                                            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-muted-foreground/50 transition-colors">
                                                <input
                                                    type="file"
                                                    id="thumbnail"
                                                    name="thumbnail"
                                                    accept="image/*"
                                                    onChange={handleFileUpload}
                                                    className="hidden"
                                                />

                                                <label
                                                    htmlFor="thumbnail"
                                                    className="cursor-pointer flex flex-col items-center space-y-2"
                                                >
                                                    <Upload className="h-8 w-8 text-muted-foreground" />
                                                    <div className="text-sm text-muted-foreground">
                                                        <span className="font-medium">Click to upload</span> or drag and drop
                                                    </div>
                                                    <div className="text-xs text-muted-foreground">
                                                        PNG, JPG, GIF up to 10MB
                                                    </div>
                                                </label>
                                            </div>
                                        ) : (
                                            <div className="relative">
                                                <div className="aspect-video rounded-lg overflow-hidden bg-muted">
                                                    <img
                                                        src={thumbnailPreview || thumbnailUrl}
                                                        alt="Course thumbnail preview"
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <Button
                                                    type="button"
                                                    variant="destructive"
                                                    size="sm"
                                                    className="absolute top-2 right-2"
                                                    onClick={removeThumbnail}
                                                >
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        )}

                                        <div className="text-center text-sm text-muted-foreground">
                                            or
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="thumbnail_url">Or enter image URL</Label>
                                            <Input
                                                id="thumbnail_url"
                                                type="url"
                                                name="thumbnail_url"
                                                placeholder="https://example.com/image.jpg"
                                                value={thumbnailUrl}
                                                onChange={handleUrlChange}
                                            />
                                        </div>

                                        <InputError message={errors.thumbnail} />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                )}
            </Form>
        </AppLayout>
    );
}
