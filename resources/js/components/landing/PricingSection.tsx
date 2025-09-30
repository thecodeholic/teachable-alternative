import { CheckIcon } from '@heroicons/react/24/outline';

interface PricingPlan {
    name: string;
    price: string;
    period: string;
    description: string;
    features: string[];
    cta: string;
    popular: boolean;
}

const plans: PricingPlan[] = [
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
];

interface PricingCardProps {
    plan: PricingPlan;
}

function PricingCard({ plan }: PricingCardProps) {
    return (
        <div className={`relative rounded-lg shadow-lg p-6 ${
            plan.popular
                ? 'ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'bg-white dark:bg-gray-800'
        }`}>
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
    );
}

export default function PricingSection() {
    return (
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
                    {plans.map((plan, index) => (
                        <PricingCard key={index} plan={plan} />
                    ))}
                </div>
            </div>
        </div>
    );
}
