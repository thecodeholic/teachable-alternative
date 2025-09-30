<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>CreateStellar - Transform Your Knowledge into Profitable Courses</title>
    <meta name="description" content="The ultimate platform for content creators to build, launch, and monetize their online courses. Start earning from your expertise today.">

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700" rel="stylesheet">

    <!-- Scripts -->
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body class="font-sans antialiased">
    <div class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
        <!-- Navigation -->
        <x-landing.navigation :auth="auth()" />

        <!-- Hero Section -->
        <x-landing.hero-section />

        <!-- Features Section -->
        <x-landing.features-section />

        <!-- Testimonials Section -->
        <x-landing.testimonials-section />

        <!-- Pricing Section -->
        <x-landing.pricing-section />

        <!-- Final CTA Section -->
        <x-landing.final-cta-section />

        <!-- Featured Courses Section -->
        <x-landing.featured-courses-section :courses="$courses" />

        <!-- Footer -->
        <x-landing.footer />
    </div>
</body>
</html>
