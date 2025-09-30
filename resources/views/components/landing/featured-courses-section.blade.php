@props(['courses'])

@if($courses->count() > 0)
<div class="py-12 bg-gray-50 dark:bg-gray-900">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="mb-8 text-center">
            <h2 class="text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-white">Featured Courses</h2>
            <p class="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto dark:text-gray-300">Discover amazing courses created by our community</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            @foreach($courses->take(6) as $course)
                <div class="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden dark:bg-gray-800 dark:border-gray-700">
                    <div class="aspect-video bg-gray-100 dark:bg-gray-700">
                        @if($course->thumbnail_url || $course->thumbnail)
                            <img
                                src="{{ $course->thumbnail_url ?? $course->thumbnail }}"
                                alt="{{ $course->title }}"
                                class="w-full h-full object-cover"
                            >
                        @else
                            <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-700">
                                <div class="text-center p-4">
                                    <div class="text-4xl mb-2">📚</div>
                                    <p class="text-sm text-gray-500 dark:text-gray-400">Course Image</p>
                                </div>
                            </div>
                        @endif
                    </div>
                    <div class="p-6">
                        <h3 class="font-semibold text-lg mb-2 line-clamp-1 text-gray-900 dark:text-white">{{ $course->title }}</h3>
                        <p class="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">{{ $course->subtitle }}</p>
                        <p class="text-sm text-gray-500 dark:text-gray-500 mb-4 line-clamp-3">{{ $course->description }}</p>

                        <div class="flex justify-between items-center mb-4">
                            <span class="font-bold text-lg text-blue-600 dark:text-blue-400">
                                ${{ number_format($course->price, 2) }}
                            </span>
                            <span class="text-sm text-gray-500 dark:text-gray-500">
                                by {{ $course->user->name }}
                            </span>
                        </div>

                        <a href="{{ route('courses.show', $course) }}" class="inline-block w-full text-center rounded-md border border-gray-300 px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 dark:border-gray-700 dark:text-blue-400 dark:hover:bg-gray-700 transition-colors">
                            View Course
                        </a>
                    </div>
                </div>
            @endforeach
        </div>

        @if($courses->count() > 6)
            <div class="text-center mt-8">
                <a href="{{ route('courses.index') }}" class="inline-block rounded-md border border-gray-300 px-6 py-2 text-sm text-blue-600 hover:bg-blue-50 dark:border-gray-700 dark:text-blue-400 dark:hover:bg-gray-700 transition-colors">
                    View All Courses
                </a>
            </div>
        @endif
    </div>
</div>
@endif
