import { PlayIcon, UsersIcon, ChartBarIcon, GlobeAltIcon, CheckIcon, ClockIcon } from '@heroicons/react/24/outline';

interface Feature {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    description: string;
}

const features: Feature[] = [
    {
        icon: PlayIcon,
        title: "Video Creation Tools",
        description: "Record, edit, and upload videos directly in your browser. No external software required."
    },
    {
        icon: UsersIcon,
        title: "Student Management",
        description: "Track student progress, manage enrollments, and engage with your community effortlessly."
    },
    {
        icon: ChartBarIcon,
        title: "Analytics & Insights",
        description: "Get detailed insights into your course performance and student engagement."
    },
    {
        icon: GlobeAltIcon,
        title: "Custom Domain",
        description: "Use your own domain to build your brand and create a professional presence."
    },
    {
        icon: CheckIcon,
        title: "Easy Publishing",
        description: "Publish your courses instantly and start earning from day one."
    },
    {
        icon: ClockIcon,
        title: "24/7 Support",
        description: "Get help whenever you need it with our dedicated support team."
    }
];

export default function FeaturesSection() {
    return (
        <div id="features" className="py-12 bg-white dark:bg-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="lg:text-center">
                    <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Features</h2>
                    <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                        Everything you need to succeed
                    </p>
                    <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto dark:text-gray-300">
                        Powerful tools and features designed to help you create, launch, and scale your online course business.
                    </p>
                </div>

                <div className="mt-10">
                    <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10 lg:grid-cols-3">
                        {features.map((feature, index) => (
                            <div key={index} className="relative">
                                <dt>
                                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                                        <feature.icon className="h-6 w-6" />
                                    </div>
                                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900 dark:text-white">
                                        {feature.title}
                                    </p>
                                </dt>
                                <dd className="mt-2 ml-16 text-base text-gray-500 dark:text-gray-300">
                                    {feature.description}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    );
}
