interface Testimonial {
    name: string;
    role: string;
    content: string;
    avatar: string;
}

const testimonials: Testimonial[] = [
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
];

interface TestimonialCardProps {
    testimonial: Testimonial;
}

function TestimonialCard({ testimonial }: TestimonialCardProps) {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
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
    );
}

export default function TestimonialsSection() {
    return (
        <div id="testimonials" className="bg-gray-50 dark:bg-gray-900 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="lg:text-center">
                    <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Testimonials</h2>
                    <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                        Success Stories
                    </p>
                </div>

                <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {testimonials.map((testimonial, index) => (
                        <TestimonialCard key={index} testimonial={testimonial} />
                    ))}
                </div>
            </div>
        </div>
    );
}
