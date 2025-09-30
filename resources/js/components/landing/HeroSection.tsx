import { Link } from '@inertiajs/react';
import { ArrowRightIcon, PlayIcon, StarIcon } from '@heroicons/react/24/outline';
import { register } from '@/routes';

export default function HeroSection() {
    return (
        <div className="relative overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
                    <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                        <div className="sm:text-center lg:text-left">
                            <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl dark:text-white">
                                <span className="block xl:inline">Transform Your</span>{' '}
                                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 xl:inline">
                                    Knowledge into Profit
                                </span>
                            </h1>
                            <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0 dark:text-gray-300">
                                Create, launch, and monetize your online courses with the most powerful and intuitive platform built for content creators. Join thousands who are already earning from their expertise.
                            </p>
                            <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                                <div className="rounded-md shadow">
                                    <Link
                                        href={register()}
                                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 md:py-4 md:text-lg md:px-10 transition-all duration-200 shadow-lg hover:shadow-xl"
                                    >
                                        Start Creating Today
                                        <ArrowRightIcon className="ml-2 -mr-1 w-5 h-5" />
                                    </Link>
                                </div>
                                <div className="mt-3 sm:mt-0 sm:ml-3">
                                    <button className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 md:py-4 md:text-lg md:px-10 transition-colors duration-200">
                                        <PlayIcon className="w-5 h-5 mr-2" />
                                        Watch Demo
                                    </button>
                                </div>
                            </div>
                            <div className="mt-8 flex items-center space-x-6">
                                <div className="flex items-center">
                                    <div className="flex -space-x-2">
                                        <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-gray-800" src="https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                                        <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-gray-800" src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                                        <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-gray-800" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                                        <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-gray-800" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                                    </div>
                                    <span className="ml-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Join 10,000+ creators
                                    </span>
                                </div>
                                <div className="flex items-center">
                                    <div className="flex items-center">
                                        {[0, 1, 2, 3, 4].map((rating) => (
                                            <StarIcon key={rating} className="h-5 w-5 text-yellow-400" fill="currentColor" />
                                        ))}
                                    </div>
                                    <span className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">4.9/5 rating</span>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
            <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
                <div className="h-56 w-full bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 sm:h-72 md:h-96 lg:w-full lg:h-full flex items-center justify-center">
                    <div className="text-center text-white p-8">
                        <div className="text-6xl mb-4">🎓</div>
                        <h3 className="text-2xl font-bold mb-2">Your Course Creation Hub</h3>
                        <p className="text-lg opacity-90">Build amazing courses with our intuitive tools</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
