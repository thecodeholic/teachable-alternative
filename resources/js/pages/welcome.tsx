import { Head } from '@inertiajs/react';
import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import {
    Navigation,
    HeroSection,
    FeaturesSection,
    TestimonialsSection,
    PricingSection,
    FinalCTASection,
    FeaturedCoursesSection,
    Footer
} from '@/components/landing';

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
                <Navigation />
                <HeroSection />
                <FeaturesSection />
                <TestimonialsSection />
                <PricingSection />
                <FinalCTASection />
                <FeaturedCoursesSection courses={courses} />
                <Footer />
            </div>
        </>
    );
}
