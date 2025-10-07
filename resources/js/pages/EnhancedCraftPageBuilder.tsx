import React, { useState } from 'react';
import { Editor, Frame, Element } from '@craftjs/core';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

// Enhanced components for the page builder
import { Text } from '@/components/page-builder/Text';
import { Container } from '@/components/page-builder/Container';
import { Button } from '@/components/page-builder/Button';
import { Image } from '@/components/page-builder/Image';
import { Heading } from '@/components/page-builder/Heading';
import { Card } from '@/components/page-builder/Card';
import { Spacer } from '@/components/page-builder/Spacer';
import { Video } from '@/components/page-builder/Video';
import { CourseCard } from '@/components/page-builder/CourseCard';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Enhanced Page Builder',
        href: '/enhanced-page-builder',
    },
];

export default function EnhancedCraftPageBuilder() {
    const [isPreviewMode, setIsPreviewMode] = useState(false);
    const [selectedElement, setSelectedElement] = useState(null);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Enhanced Page Builder" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Enhanced Page Builder</h1>
                        <p className="text-muted-foreground">
                            Professional drag & drop page builder with rich components
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setIsPreviewMode(!isPreviewMode)}
                            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                        >
                            {isPreviewMode ? 'Edit Mode' : 'Preview Mode'}
                        </button>
                        <button
                            onClick={() => {
                                const data = Editor.getData();
                                console.log('Page Data:', data);
                                alert('Page data logged to console!');
                            }}
                            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                        >
                            Export Data
                        </button>
                    </div>
                </div>

                <div className="flex gap-4 h-full">
                    {/* Component Palette */}
                    {!isPreviewMode && (
                        <div className="w-64 bg-white dark:bg-gray-800 border border-sidebar-border/70 rounded-lg p-4">
                            <h3 className="font-semibold mb-4">Components</h3>
                            <div className="space-y-2">
                                <div className="p-2 border border-gray-200 dark:border-gray-600 rounded cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
                                    <div className="text-sm font-medium">Text</div>
                                    <div className="text-xs text-gray-500">Add text content</div>
                                </div>
                                <div className="p-2 border border-gray-200 dark:border-gray-600 rounded cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
                                    <div className="text-sm font-medium">Heading</div>
                                    <div className="text-xs text-gray-500">Add headings (H1-H6)</div>
                                </div>
                                <div className="p-2 border border-gray-200 dark:border-gray-600 rounded cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
                                    <div className="text-sm font-medium">Button</div>
                                    <div className="text-xs text-gray-500">Add call-to-action buttons</div>
                                </div>
                                <div className="p-2 border border-gray-200 dark:border-gray-600 rounded cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
                                    <div className="text-sm font-medium">Image</div>
                                    <div className="text-xs text-gray-500">Add images and media</div>
                                </div>
                                <div className="p-2 border border-gray-200 dark:border-gray-600 rounded cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
                                    <div className="text-sm font-medium">Card</div>
                                    <div className="text-xs text-gray-500">Add content cards</div>
                                </div>
                                <div className="p-2 border border-gray-200 dark:border-gray-600 rounded cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
                                    <div className="text-sm font-medium">Video</div>
                                    <div className="text-xs text-gray-500">Embed videos</div>
                                </div>
                                <div className="p-2 border border-gray-200 dark:border-gray-600 rounded cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
                                    <div className="text-sm font-medium">Course Card</div>
                                    <div className="text-xs text-gray-500">Display course information</div>
                                </div>
                                <div className="p-2 border border-gray-200 dark:border-gray-600 rounded cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
                                    <div className="text-sm font-medium">Spacer</div>
                                    <div className="text-xs text-gray-500">Add white space</div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Main Canvas */}
                    <div className="flex-1 border border-sidebar-border/70 rounded-xl overflow-hidden">
                        <Editor
                            resolver={{
                                Text,
                                Container,
                                Button,
                                Image,
                                Heading,
                                Card,
                                Spacer,
                                Video,
                                CourseCard,
                            }}
                            enabled={!isPreviewMode}
                        >
                            <div className="h-full bg-white dark:bg-gray-900">
                                <Frame>
                                    <Element is={Container} padding={40} canvas>
                                        <Heading
                                            text="Welcome to Your Course Platform"
                                            level={1}
                                            textAlign="center"
                                            color="#1f2937"
                                            margin="0 0 20px 0"
                                        />
                                        <Text
                                            text="Build amazing course pages with our drag & drop page builder. Create engaging content that converts visitors into students."
                                            fontSize={18}
                                            color="#6b7280"
                                            textAlign="center"
                                            margin="0 0 30px 0"
                                        />

                                        <Element is={Container} padding={20} backgroundColor="#f8fafc" borderRadius={8} margin="0 0 30px 0">
                                            <Heading text="Featured Courses" level={2} margin="0 0 15px 0" />
                                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                                                <CourseCard
                                                    title="React Masterclass"
                                                    description="Learn React from scratch to advanced concepts"
                                                    price="$99"
                                                    image="https://via.placeholder.com/300x200/3b82f6/ffffff?text=React+Course"
                                                />
                                                <CourseCard
                                                    title="Laravel Backend"
                                                    description="Build robust backend applications with Laravel"
                                                    price="$149"
                                                    image="https://via.placeholder.com/300x200/10b981/ffffff?text=Laravel+Course"
                                                />
                                            </div>
                                        </Element>

                                        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', marginTop: '20px' }}>
                                            <Button
                                                text="Start Learning"
                                                backgroundColor="#3b82f6"
                                                color="#ffffff"
                                                padding="12px 24px"
                                                fontSize={16}
                                            />
                                            <Button
                                                text="View All Courses"
                                                backgroundColor="transparent"
                                                color="#3b82f6"
                                                padding="12px 24px"
                                                fontSize={16}
                                            />
                                        </div>

                                        <Spacer height={40} />

                                        <Element is={Container} padding={30} backgroundColor="#1f2937" borderRadius={12}>
                                            <Heading
                                                text="Why Choose Our Platform?"
                                                level={2}
                                                color="#ffffff"
                                                textAlign="center"
                                                margin="0 0 20px 0"
                                            />
                                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                                                <Card
                                                    title="Expert Instructors"
                                                    content="Learn from industry professionals with years of experience"
                                                    icon="👨‍🏫"
                                                />
                                                <Card
                                                    title="Lifetime Access"
                                                    content="Get lifetime access to all course materials and updates"
                                                    icon="♾️"
                                                />
                                                <Card
                                                    title="Community Support"
                                                    content="Join our vibrant community of learners and get help when you need it"
                                                    icon="👥"
                                                />
                                            </div>
                                        </Element>
                                    </Element>
                                </Frame>
                            </div>
                        </Editor>
                    </div>
                </div>

                {/* Instructions */}
                <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                        Enhanced Page Builder Features
                    </h3>
                    <div className="text-sm text-blue-800 dark:text-blue-200 space-y-2">
                        <p>
                            <strong>Rich Components:</strong> Text, Headings, Buttons, Images, Cards, Videos, Course Cards, and more
                        </p>
                        <p>
                            <strong>Visual Editing:</strong> Click on any element to select and edit its properties
                        </p>
                        <p>
                            <strong>Drag & Drop:</strong> Drag components from the left panel to build your page
                        </p>
                        <p>
                            <strong>Export Data:</strong> Click "Export Data" to see the JSON structure of your page
                        </p>
                        <p>
                            <strong>Responsive:</strong> All components automatically adapt to different screen sizes
                        </p>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}



