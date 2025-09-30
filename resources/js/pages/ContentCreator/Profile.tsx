import React from 'react';
import { Head } from '@inertiajs/react';
import GuestLayout from '@/layouts/guest-layout';
import { Course, User } from '@/types';

interface ContentCreatorProfileProps {
    user: User;
    courses: Course[];
}

export default function ContentCreatorProfile({ user, courses }: ContentCreatorProfileProps) {
    return (
        <GuestLayout>
            <Head title={`${user.name} - Content Creator`} />

            <div>
                {/* Hero Section */}
                <div className="bg-white shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                        <div className="text-center">
                            <div className="mx-auto h-24 w-24 rounded-full bg-gray-300 flex items-center justify-center mb-6">
                                <span className="text-2xl font-bold text-gray-600">
                                    {user.name.charAt(0).toUpperCase()}
                                </span>
                            </div>
                            <h1 className="text-4xl font-bold text-gray-900 mb-2">{user.name}</h1>
                            <p className="text-lg text-gray-600 mb-4">@{user.username}</p>
                            <p className="text-gray-500 max-w-2xl mx-auto">
                                Welcome to my course collection! Explore my published courses below.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Courses Section */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">My Courses</h2>
                        <p className="text-gray-600">
                            {courses.length} {courses.length === 1 ? 'course' : 'courses'} available
                        </p>
                    </div>

                    {courses.length === 0 ? (
                        <div className="text-center py-12">
                            <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No courses yet</h3>
                            <p className="text-gray-500">This creator hasn't published any courses yet.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {courses.map((course) => (
                                <div key={course.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200">
                                    {course.thumbnail_url && (
                                        <div className="aspect-w-16 aspect-h-9">
                                            <img
                                                src={course.thumbnail_url}
                                                alt={course.title}
                                                className="w-full h-48 object-cover"
                                            />
                                        </div>
                                    )}
                                    <div className="p-6">
                                        <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                                            {course.title}
                                        </h3>
                                        {course.subtitle && (
                                            <p className="text-gray-600 mb-3 line-clamp-2">
                                                {course.subtitle}
                                            </p>
                                        )}
                                        <div className="flex items-center justify-between">
                                            <span className="text-2xl font-bold text-blue-600">
                                                ${course.price}
                                            </span>
                                            <div className="text-sm text-gray-500">
                                                {course.modules?.length || 0} modules
                                            </div>
                                        </div>
                                        {course.description && (
                                            <p className="text-gray-500 text-sm mt-3 line-clamp-3">
                                                {course.description}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </GuestLayout>
    );
}
