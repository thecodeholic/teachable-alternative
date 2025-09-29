import CourseController from '@/actions/App/Http/Controllers/CourseController';
import { courses } from '@/routes';
import { Form, Head, Link, useForm, router } from '@inertiajs/react';
import { LoaderCircle, Upload, Image as ImageIcon, X } from 'lucide-react';
import { useState, useEffect } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import AppLayout from '@/layouts/app-layout';

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

export default function EditCourse({ course }: Props) {
    const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);

    const { data, setData, patch, processing, errors, reset } = useForm({
        title: course.title,
        subtitle: course.subtitle,
        description: course.description,
        price: course.price.toString(),
        thumbnail: null as File | null,
        thumbnail_url: course.thumbnail_url || '',
        published: course.published,
    });

    // Set initial thumbnail preview if course has a thumbnail
    useEffect(() => {
        if (course.thumbnail_url) {
            setThumbnailPreview(course.thumbnail_url);
        }
    }, [course.thumbnail_url]);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setData('thumbnail', file);
            setData('thumbnail_url', ''); // Clear URL when file is selected
            const reader = new FileReader();
            reader.onload = (e) => {
                setThumbnailPreview(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
        // Reset the file input to allow selecting the same file again
        event.target.value = '';
    };

    const removeThumbnail = () => {
        setData('thumbnail', null);
        setData('thumbnail_url', '');
        setThumbnailPreview(null);
    };

    const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const url = event.target.value;
        setData('thumbnail_url', url);
        if (url) {
            setData('thumbnail', null);
            setThumbnailPreview(null);
        }
        // Update preview if it's a valid URL
        if (url) {
            setThumbnailPreview(url);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form data being submitted:', data);
        console.log('Thumbnail file:', data.thumbnail);
        console.log('Thumbnail URL:', data.thumbnail_url);

        // Create FormData for proper file upload handling
        const formData = new FormData();
        formData.append('_method', 'PATCH');
        formData.append('title', data.title);
        formData.append('subtitle', data.subtitle);
        formData.append('description', data.description);
        formData.append('price', data.price);
        formData.append('published', data.published ? '1' : '0');

        if (data.thumbnail) {
            formData.append('thumbnail', data.thumbnail);
        }
        if (data.thumbnail_url) {
            formData.append('thumbnail_url', data.thumbnail_url);
        }

        console.log('FormData contents:');
        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }

        // Use router.post with FormData for proper file upload handling
        router.post(CourseController.update.url({ course: course.id }), formData, {
            onSuccess: () => {
                console.log('Form submitted successfully');
            },
            onError: (errors) => {
                console.log('Form validation errors:', errors);
            }
        });
    };

    return (
        <AppLayout
            title="Edit Course"
            description="Update your course information"
        >
            <Head title="Edit Course" />
            <form onSubmit={handleSubmit} encType="multipart/form-data" className="max-w-4xl mx-auto">
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
                                    value={data.title}
                                    onChange={(e) => setData('title', e.target.value)}
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
                                    value={data.subtitle}
                                    onChange={(e) => setData('subtitle', e.target.value)}
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
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
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
                                    value={data.price}
                                    onChange={(e) => setData('price', e.target.value)}
                                    placeholder="0.00"
                                />
                                <InputError message={errors.price} />
                            </div>

                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="published"
                                    checked={data.published}
                                    onCheckedChange={(checked) => setData('published', !!checked)}
                                />
                                <Label htmlFor="published" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                    Publish this course
                                </Label>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Published courses will be visible to all users on the home page.
                            </p>

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
                                        {!thumbnailPreview && !data.thumbnail_url ? (
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
                                                            src={thumbnailPreview || data.thumbnail_url}
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
                                                value={data.thumbnail_url}
                                                onChange={handleUrlChange}
                                            />
                                        </div>

                                        <InputError message={errors.thumbnail} />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
            </form>
        </AppLayout>
    );
}
