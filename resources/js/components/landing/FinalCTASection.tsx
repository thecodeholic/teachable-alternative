import { Link } from '@inertiajs/react';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { register } from '@/routes';

export default function FinalCTASection() {
    return (
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                    Ready to start your course creation journey?
                </h2>
                <p className="mt-4 text-xl text-blue-100">
                    Join thousands of creators who are already earning from their expertise.
                </p>
                <div className="mt-8">
                    <Link
                        href={register()}
                        className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 md:py-4 md:text-lg md:px-10 transition-colors duration-200 shadow-lg hover:shadow-xl"
                    >
                        Get Started Free
                        <ArrowRightIcon className="ml-2 -mr-1 w-5 h-5" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
