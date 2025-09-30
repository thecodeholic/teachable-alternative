import CourseController from '@/actions/App/Http/Controllers/CourseController';
import { dashboard, login, register } from '@/routes';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { ArrowRightIcon, PlayIcon, CheckIcon, StarIcon, UsersIcon, ClockIcon, ChartBarIcon, GlobeAltIcon } from '@heroicons/react/24/outline';

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
    courses: Course[];
}

export default function Welcome({ courses }: Props) {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="CreateStellar - Transform Your Knowledge into Profitable Courses">
                <meta name="description" content="The ultimate platform for content creators to build, launch, and monetize their online courses. Start earning from your expertise today." />
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700"
                    rel="stylesheet"
                />
            </Head>
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
                {/* Navigation */}
                <nav className="relative z-50 border-b border-gray-200/50 dark:border-gray-700/50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                            <span className="text-white font-bold text-lg">CS</span>
                                        </div>
                                        <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                            CreateStellar
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="hidden md:block">
                                <div className="ml-10 flex items-baseline space-x-4">
                                    <a href="#features" className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                        Features
                                    </a>
                                    <a href="#pricing" className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                        Pricing
                                    </a>
                                    <a href="#testimonials" className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                        Success Stories
                                    </a>
                                </div>
                            </div>
                            <div className="flex items-center space-x-4">
                        {auth.user ? (
                            <Link
                                href={dashboard()}
                                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={login()}
                                            className="text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                                >
                                            Sign In
                                </Link>
                                <Link
                                    href={register()}
                                            className="inline-flex items-center px-6 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
                                >
                                            Start Creating
                                </Link>
                            </>
                        )}
                            </div>
                        </div>
                    </div>
                    </nav>

                {/* Hero Section */}
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

                {/* Features Section */}
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
                                <div className="relative">
                                    <dt>
                                        <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                                            <PlayIcon className="h-6 w-6" />
                                        </div>
                                        <p className="ml-16 text-lg leading-6 font-medium text-gray-900 dark:text-white">Video Creation Tools</p>
                                    </dt>
                                    <dd className="mt-2 ml-16 text-base text-gray-500 dark:text-gray-300">
                                        Record, edit, and upload videos directly in your browser. No external software required.
                                    </dd>
                                </div>

                                <div className="relative">
                                    <dt>
                                        <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                                            <UsersIcon className="h-6 w-6" />
                                        </div>
                                        <p className="ml-16 text-lg leading-6 font-medium text-gray-900 dark:text-white">Student Management</p>
                                    </dt>
                                    <dd className="mt-2 ml-16 text-base text-gray-500 dark:text-gray-300">
                                        Track student progress, manage enrollments, and engage with your community effortlessly.
                                    </dd>
                                </div>

                                <div className="relative">
                                    <dt>
                                        <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                                            <ChartBarIcon className="h-6 w-6" />
                                        </div>
                                        <p className="ml-16 text-lg leading-6 font-medium text-gray-900 dark:text-white">Analytics & Insights</p>
                                    </dt>
                                    <dd className="mt-2 ml-16 text-base text-gray-500 dark:text-gray-300">
                                        Get detailed insights into your course performance and student engagement.
                                    </dd>
                                </div>

                                <div className="relative">
                                    <dt>
                                        <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                                            <GlobeAltIcon className="h-6 w-6" />
                                        </div>
                                        <p className="ml-16 text-lg leading-6 font-medium text-gray-900 dark:text-white">Custom Domain</p>
                                    </dt>
                                    <dd className="mt-2 ml-16 text-base text-gray-500 dark:text-gray-300">
                                        Use your own domain to build your brand and create a professional presence.
                                    </dd>
                                </div>

                                <div className="relative">
                                    <dt>
                                        <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                                            <CheckIcon className="h-6 w-6" />
                                        </div>
                                        <p className="ml-16 text-lg leading-6 font-medium text-gray-900 dark:text-white">Easy Publishing</p>
                                    </dt>
                                    <dd className="mt-2 ml-16 text-base text-gray-500 dark:text-gray-300">
                                        Publish your courses instantly and start earning from day one.
                                    </dd>
                                </div>

                                <div className="relative">
                                    <dt>
                                        <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                                            <ClockIcon className="h-6 w-6" />
                                        </div>
                                        <p className="ml-16 text-lg leading-6 font-medium text-gray-900 dark:text-white">24/7 Support</p>
                                    </dt>
                                    <dd className="mt-2 ml-16 text-base text-gray-500 dark:text-gray-300">
                                        Get help whenever you need it with our dedicated support team.
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>
                </div>

                {/* Testimonials Section */}
                <div id="testimonials" className="bg-gray-50 dark:bg-gray-900 py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="lg:text-center">
                            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Testimonials</h2>
                            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                                Success Stories
                            </p>
                        </div>

                        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {[
                                {
                                    name: "Sarah Johnson",
                                    role: "Digital Marketing Expert",
                                    content: "CreateStellar transformed my business. I've made over $50k in my first 6 months!",
                                    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                },
                                {
                                    name: "Mike Chen",
                                    role: "Programming Instructor",
                                    content: "The platform is incredibly intuitive. My students love the learning experience.",
                                    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                },
                                {
                                    name: "Emily Rodriguez",
                                    role: "Design Coach",
                                    content: "Best investment I've made for my online business. The features are amazing!",
                                    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                }
                            ].map((testimonial, index) => (
                                <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                                    <div className="flex items-center mb-4">
                                        <img className="h-12 w-12 rounded-full" src={testimonial.avatar} alt={testimonial.name} />
                                        <div className="ml-4">
                                            <div className="text-base font-medium text-gray-900 dark:text-white">{testimonial.name}</div>
                                            <div className="text-base text-gray-500 dark:text-gray-300">{testimonial.role}</div>
                                        </div>
                                    </div>
                                    <blockquote className="text-gray-600 dark:text-gray-300">
                                        "{testimonial.content}"
                                    </blockquote>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Pricing Section */}
                <div id="pricing" className="py-12 bg-white dark:bg-gray-800">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="lg:text-center">
                            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Pricing</h2>
                            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                                Simple, transparent pricing
                            </p>
                            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto dark:text-gray-300">
                                Choose the plan that works best for you. No hidden fees, no surprises.
                            </p>
                        </div>

                        <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                            {[
                                {
                                    name: "Starter",
                                    price: "$29",
                                    period: "/month",
                                    description: "Perfect for beginners",
                                    features: [
                                        "Up to 5 courses",
                                        "Basic analytics",
                                        "Email support",
                                        "Custom domain",
                                        "Payment processing"
                                    ],
                                    cta: "Start Free Trial",
                                    popular: false
                                },
                                {
                                    name: "Professional",
                                    price: "$79",
                                    period: "/month",
                                    description: "Most popular choice",
                                    features: [
                                        "Unlimited courses",
                                        "Advanced analytics",
                                        "Priority support",
                                        "Custom branding",
                                        "Advanced marketing tools",
                                        "Affiliate program"
                                    ],
                                    cta: "Start Free Trial",
                                    popular: true
                                },
                                {
                                    name: "Enterprise",
                                    price: "$199",
                                    period: "/month",
                                    description: "For established creators",
                                    features: [
                                        "Everything in Professional",
                                        "White-label solution",
                                        "Dedicated support",
                                        "Custom integrations",
                                        "Advanced reporting",
                                        "Team collaboration"
                                    ],
                                    cta: "Contact Sales",
                                    popular: false
                                }
                            ].map((plan, index) => (
                                <div key={index} className={`relative rounded-lg shadow-lg p-6 ${plan.popular ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'bg-white dark:bg-gray-800'}`}>
                                    {plan.popular && (
                                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                            <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                                                Most Popular
                                        </span>
                                        </div>
                                    )}
                                    <div className="text-center">
                                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">{plan.name}</h3>
                                        <div className="mt-4 flex items-baseline justify-center">
                                            <span className="text-4xl font-bold text-gray-900 dark:text-white">{plan.price}</span>
                                            <span className="text-gray-500 dark:text-gray-300">{plan.period}</span>
                                        </div>
                                        <p className="mt-2 text-gray-500 dark:text-gray-300">{plan.description}</p>
                                    </div>
                                    <ul className="mt-6 space-y-3">
                                        {plan.features.map((feature, featureIndex) => (
                                            <li key={featureIndex} className="flex items-start">
                                                <CheckIcon className="h-5 w-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                                                <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                                </li>
                                        ))}
                            </ul>
                                    <div className="mt-8">
                                        <button className={`w-full px-4 py-2 border border-transparent rounded-md font-medium ${
                                            plan.popular
                                                ? 'text-white bg-blue-600 hover:bg-blue-700'
                                                : 'text-blue-600 bg-blue-100 hover:bg-blue-200 dark:text-blue-400 dark:bg-blue-900/20 dark:hover:bg-blue-900/30'
                                        } transition-colors duration-200`}>
                                            {plan.cta}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Final CTA Section */}
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

                {/* Featured Courses Section */}
                {courses.length > 0 && (
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
                                    <div key={course.id} className="bg-white rounded-lg shadow-lg overflow-hidden dark:bg-gray-800">
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
                )}

                {/* Footer */}
                <footer className="bg-gray-900 dark:bg-black">
                    <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            <div className="col-span-1 md:col-span-2">
                                <div className="flex items-center space-x-2 mb-4">
                                    <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                                        <span className="text-white font-bold text-lg">CS</span>
                                    </div>
                                    <span className="text-xl font-bold text-white">
                                        CreateStellar
                                    </span>
                                </div>
                                <p className="text-gray-400 mb-4">
                                    The ultimate platform for content creators to build, launch, and monetize their online courses.
                                </p>
                                <div className="flex space-x-4">
                                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                        <span className="sr-only">Twitter</span>
                                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                        </svg>
                                    </a>
                                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                                        <span className="sr-only">LinkedIn</span>
                                        <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-white font-semibold mb-4">Product</h3>
                                <ul className="space-y-2">
                                    <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
                                    <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Pricing</a></li>
                                    <li><a href="#" className="text-gray-400 hover:text-white transition-colors">API</a></li>
                                    <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Integrations</a></li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="text-white font-semibold mb-4">Support</h3>
                                <ul className="space-y-2">
                                    <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
                                    <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
                                    <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Status</a></li>
                                    <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Community</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="mt-8 pt-8 border-t border-gray-800">
                            <p className="text-gray-400 text-center">
                                © 2024 CreateStellar. All rights reserved.
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
