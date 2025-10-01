<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\UserDomain;
use Inertia\Inertia;
use Inertia\Response;

class ContentCreatorController extends Controller
{
    public function show(string $username): Response
    {
        $user = User::where('username', $username)->firstOrFail();

        $courses = $user->courses()
            ->where('published', true)
            ->with(['modules' => function ($query) {
                $query->orderBy('sort_order');
            }])
            ->latest()
            ->get();

        return Inertia::render('ContentCreator/Profile', [
            'user' => $user,
            'courses' => $courses,
        ]);
    }

    public function showByDomain(): Response
    {
        $domain = request()->getHost();

        // Try to find user by domain
        $userDomain = UserDomain::where('domain', $domain)
            ->orWhere(function ($query) use ($domain) {
                // Check if it's a subdomain format (remove .example.localhost)
                $subdomain = str_replace('.example.localhost', '', $domain);
                $query->where('domain', $subdomain)
                      ->where('type', 'subdomain');
            })
            ->firstOrFail();

        $user = $userDomain->user;

        $courses = $user->courses()
            ->where('published', true)
            ->with(['modules' => function ($query) {
                $query->orderBy('sort_order');
            }])
            ->latest()
            ->get();

        return Inertia::render('ContentCreator/Profile', [
            'user' => $user,
            'courses' => $courses,
        ]);
    }
}
