<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\User;
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
}
