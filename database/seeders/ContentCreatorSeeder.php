<?php

declare(strict_types=1);

namespace Database\Seeders;

use App\Models\Course;
use App\Models\Module;
use App\Models\User;
use Illuminate\Database\Seeder;

class ContentCreatorSeeder extends Seeder
{
    public function run(): void
    {
        // Create a content creator user
        $creator = User::firstOrCreate(
            ['username' => 'johndoe'],
            [
                'name' => 'John Doe',
                'email' => 'john.doe@example.com',
                'password' => bcrypt('password'),
                'email_verified_at' => now(),
            ]
        );

        // Create some published courses for the creator
        $course1 = Course::create([
            'user_id' => $creator->id,
            'title' => 'Complete Web Development Bootcamp',
            'slug' => 'complete-web-development-bootcamp',
            'subtitle' => 'Learn HTML, CSS, JavaScript, and more',
            'description' => 'A comprehensive course covering all aspects of modern web development. Perfect for beginners who want to become full-stack developers.',
            'price' => 99.99,
            'published' => true,
        ]);

        $course2 = Course::create([
            'user_id' => $creator->id,
            'title' => 'Advanced React Patterns',
            'slug' => 'advanced-react-patterns',
            'subtitle' => 'Master complex React concepts and patterns',
            'description' => 'Take your React skills to the next level with advanced patterns, performance optimization, and best practices.',
            'price' => 149.99,
            'published' => true,
        ]);

        $course3 = Course::create([
            'user_id' => $creator->id,
            'title' => 'Laravel Mastery Course',
            'slug' => 'laravel-mastery-course',
            'subtitle' => 'Build robust PHP applications with Laravel',
            'description' => 'Learn Laravel from basics to advanced topics including authentication, APIs, testing, and deployment.',
            'price' => 199.99,
            'published' => true,
        ]);

        // Add some modules to each course
        foreach ([$course1, $course2, $course3] as $course) {
            Module::create([
                'course_id' => $course->id,
                'title' => 'Introduction',
                'description' => 'Get started with the basics',
                'sort_order' => 1,
            ]);

            Module::create([
                'course_id' => $course->id,
                'title' => 'Core Concepts',
                'description' => 'Learn the fundamental concepts',
                'sort_order' => 2,
            ]);

            Module::create([
                'course_id' => $course->id,
                'title' => 'Advanced Topics',
                'description' => 'Dive deep into advanced topics',
                'sort_order' => 3,
            ]);
        }

        // Create another content creator
        $creator2 = User::firstOrCreate(
            ['username' => 'janesmith'],
            [
                'name' => 'Jane Smith',
                'email' => 'jane.smith@example.com',
                'password' => bcrypt('password'),
                'email_verified_at' => now(),
            ]
        );

        $course4 = Course::create([
            'user_id' => $creator2->id,
            'title' => 'UI/UX Design Fundamentals',
            'slug' => 'ui-ux-design-fundamentals',
            'subtitle' => 'Create beautiful and user-friendly interfaces',
            'description' => 'Learn the principles of good design, user experience, and how to create stunning interfaces.',
            'price' => 79.99,
            'published' => true,
        ]);

        Module::create([
            'course_id' => $course4->id,
            'title' => 'Design Principles',
            'description' => 'Understanding the fundamentals of design',
            'sort_order' => 1,
        ]);

        Module::create([
            'course_id' => $course4->id,
            'title' => 'User Research',
            'description' => 'How to conduct effective user research',
            'sort_order' => 2,
        ]);
    }
}
