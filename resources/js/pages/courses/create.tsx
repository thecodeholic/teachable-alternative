import CourseController from '@/actions/App/Http/Controllers/CourseController';
import { Form, Head, useForm } from '@inertiajs/react';
import { LoaderCircle, Upload, Image as ImageIcon, X } from 'lucide-react';
import { useState } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';

export default function CreateCourse() {
    const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
    const [thumbnailUrl, setThumbnailUrl] = useState<string>('');

    const { data, setData, post, processing, errors, reset } = useForm({
        title: '',
        subtitle: '',
        description: '',
        price: '',
        thumbnail: null as File | null,
        thumbnail_url: '',
    });

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setData('thumbnail', file);
            setData('thumbnail_url', ''); // Clear URL when file is selected
            setThumbnailUrl(''); // Clear local state
            const reader = new FileReader();
            reader.onload = (e) => {
                setThumbnailPreview(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeThumbnail = () => {
        setData('thumbnail', null);
        setData('thumbnail_url', '');
        setThumbnailUrl('');
        setThumbnailPreview(null);
    };

    const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const url = event.target.value;
        setThumbnailUrl(url);
        setData('thumbnail_url', url);
        if (url) {
            setData('thumbnail', null);
            setThumbnailPreview(null);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(CourseController.store.url());
    };

    return (
        <AppLayout>
            <Head title="Create Course" />
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Create New Course</h1>
                    <p className="text-muted-foreground">
                        Share your knowledge with the world by creating an engaging course
                    </p>
                </div>

                <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-8">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Main Form */}
                            <div className="lg:col-span-2 space-y-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Course Information</CardTitle>
                                        <CardDescription>
                                            Basic details about your course
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="grid gap-2">
                                            <Label htmlFor="title">Course Title *</Label>
                                            <Input
                                                id="title"
                                                type="text"
                                                required
                                                autoFocus
                                                name="title"
                                                value={data.title}
                                                onChange={(e) => setData('title', e.target.value)}
                                                placeholder="e.g., Complete Web Development Bootcamp"
                                                className="text-lg"
                                            />
                                            <InputError message={errors.title} />
                                        </div>

                                        <div className="grid gap-2">
                                            <Label htmlFor="subtitle">Course Subtitle *</Label>
                                            <Input
                                                id="subtitle"
                                                type="text"
                                                required
                                                name="subtitle"
                                                value={data.subtitle}
                                                onChange={(e) => setData('subtitle', e.target.value)}
                                                placeholder="A brief description of what students will learn"
                                            />
                                            <InputError message={errors.subtitle} />
                                        </div>

                                        <div className="grid gap-2">
                                            <Label htmlFor="description">Course Description *</Label>
                                            <textarea
                                                id="description"
                                                required
                                                name="description"
                                                value={data.description}
                                                onChange={(e) => setData('description', e.target.value)}
                                                placeholder="Provide a detailed description of your course content, what students will learn, and who this course is for..."
                                                rows={8}
                                                className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                                            />
                                            <InputError message={errors.description} />
                                        </div>

                                        <div className="grid gap-2">
                                            <Label htmlFor="price">Course Price ($) *</Label>
                                            <Input
                                                id="price"
                                                type="number"
                                                step="0.01"
                                                min="0"
                                                required
                                                name="price"
                                                value={data.price}
                                                onChange={(e) => setData('price', e.target.value)}
                                                placeholder="99.99"
                                                className="text-lg font-semibold"
                                            />
                                            <p className="text-sm text-muted-foreground">
                                                Set to $0.00 for a free course
                                            </p>
                                            <InputError message={errors.price} />
                                        </div>
                                    </CardContent>
                                </Card>
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
                                                        accept="image/*"
                                                        onChange={handleFileUpload}
                                                        className="hidden"
                                                    />
                                                    <label
                                                        htmlFor="thumbnail"
                                                        className="cursor-pointer flex flex-col items-center space-y-4"
                                                    >
                                                        <div className="p-4 rounded-full bg-muted">
                                                            <Upload className="h-8 w-8 text-muted-foreground" />
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-medium">
                                                                Click to upload thumbnail
                                                            </p>
                                                            <p className="text-xs text-muted-foreground">
                                                                PNG, JPG up to 10MB
                                                            </p>
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
                                                    placeholder="https://example.com/image.jpg"
                                                    value={data.thumbnail_url}
                                                    onChange={handleUrlChange}
                                                    className="text-sm"
                                                />
                                            </div>

                                            <InputError message={errors.thumbnail} />
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Action Buttons */}
                                <Card>
                                    <CardContent className="pt-6">
                                        <div className="space-y-4">
                                            <Button
                                                type="submit"
                                                className="w-full"
                                                size="lg"
                                                disabled={processing}
                                            >
                                                {processing && (
                                                    <LoaderCircle className="h-4 w-4 animate-spin mr-2" />
                                                )}
                                                <ImageIcon className="h-4 w-4 mr-2" />
                                                Create Course
                                            </Button>

                                            <Button
                                                type="button"
                                                variant="outline"
                                                className="w-full"
                                                onClick={() => window.history.back()}
                                            >
                                                Cancel
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                </form>
            </div>
        </AppLayout>
    );
}
