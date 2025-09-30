import { Link } from '@inertiajs/react';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import CourseController from '@/actions/App/Http/Controllers/CourseController';

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

interface FeaturedCoursesSectionProps {
    courses: Course[];
}

interface CourseCardProps {
    course: Course;
}

function CourseCard({ course }: CourseCardProps) {
    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden dark:bg-gray-800">
            <div className="aspect-video bg-gray-100 dark:bg-gray-700">
                {(course.thumbnail_url || course.thumbnail) ? (
                    <img
                        src={course.thumbnail_url || course.thumbnail}
                        alt={course.title}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-700 dark:to-gray-600">
                        <div className="text-center p-4">
                            <div className="text-4xl mb-2">📚</div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Course Image</p>
                        </div>
                    </div>
                )}
            </div>
            <div className="p-6">
                <h3 className="font-semibold text-lg mb-2 line-clamp-1 text-gray-900 dark:text-white">{course.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">{course.subtitle}</p>
                <p className="text-sm text-gray-500 dark:text-gray-500 mb-4 line-clamp-3">{course.description}</p>

                <div className="flex justify-between items-center mb-4">
                    <span className="font-bold text-lg text-blue-600 dark:text-blue-400">
                        ${Number(course.price).toFixed(2)}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-500">
                        by {course.user.name}
                    </span>
                </div>

                <Link
                    href={CourseController.show.url({ course: course.id })}
                    className="inline-block w-full text-center rounded-md bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 text-sm text-white hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                >
                    View Course
                </Link>
            </div>
        </div>
    );
}

export default function FeaturedCoursesSection({ courses }: FeaturedCoursesSectionProps) {
    if (courses.length === 0) {
        return null;
    }

    return (
        <div className="py-12 bg-gray-50 dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl dark:text-white">
                        Featured Courses
                    </h2>
                    <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
                        Discover amazing courses created by our community
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {courses.slice(0, 6).map((course) => (
                        <CourseCard key={course.id} course={course} />
                    ))}
                </div>

                {courses.length > 6 && (
                    <div className="text-center mt-8">
                        <Link
                            href={CourseController.index.url()}
                            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-blue-100 hover:bg-blue-200 dark:text-blue-400 dark:bg-blue-900/20 dark:hover:bg-blue-900/30 transition-colors duration-200"
                        >
                            View All Courses
                            <ArrowRightIcon className="ml-2 -mr-1 w-5 h-5" />
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
