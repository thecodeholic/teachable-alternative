<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\UserDomain;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class UserDomainController extends Controller
{
    public function index(): Response
    {
        $domains = Auth::user()->domains()
            ->latest()
            ->get()
            ->map(function ($domain) {
                return [
                    'id' => $domain->id,
                    'domain' => $domain->domain,
                    'full_domain' => $domain->full_domain,
                    'type' => $domain->type,
                    'is_primary' => $domain->is_primary,
                    'is_verified' => $domain->is_verified,
                    'created_at' => $domain->created_at,
                ];
            });

        return Inertia::render('Domains/Index', [
            'domains' => $domains,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'domain' => [
                'required',
                'string',
                'max:255',
                'regex:/^[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]$/',
                Rule::unique('user_domains', 'domain'),
            ],
            'type' => ['required', Rule::in(['subdomain', 'custom'])],
        ]);

        // If it's a subdomain, ensure it's lowercase and alphanumeric with hyphens
        if ($validated['type'] === 'subdomain') {
            $validated['domain'] = strtolower($validated['domain']);
        }

        // If this is the first domain, make it primary
        $isFirstDomain = Auth::user()->domains()->count() === 0;

        $domain = Auth::user()->domains()->create([
            'domain' => $validated['domain'],
            'type' => $validated['type'],
            'is_primary' => $isFirstDomain,
            'is_verified' => $validated['type'] === 'subdomain', // Subdomains are auto-verified
        ]);

        return redirect()->route('domains.index')
            ->with('success', 'Domain added successfully.');
    }

    public function setPrimary(UserDomain $domain)
    {
        // Ensure the domain belongs to the authenticated user
        if ($domain->user_id !== Auth::id()) {
            abort(403);
        }

        // Remove primary flag from all user's domains
        Auth::user()->domains()->update(['is_primary' => false]);

        // Set this domain as primary
        $domain->update(['is_primary' => true]);

        return redirect()->route('domains.index')
            ->with('success', 'Primary domain updated successfully.');
    }

    public function destroy(UserDomain $domain)
    {
        // Ensure the domain belongs to the authenticated user
        if ($domain->user_id !== Auth::id()) {
            abort(403);
        }

        // Prevent deletion if it's the only domain
        if (Auth::user()->domains()->count() === 1) {
            return redirect()->route('domains.index')
                ->with('error', 'You must have at least one domain.');
        }

        // If deleting primary domain, set another as primary
        if ($domain->is_primary) {
            $newPrimary = Auth::user()->domains()
                ->where('id', '!=', $domain->id)
                ->first();

            if ($newPrimary) {
                $newPrimary->update(['is_primary' => true]);
            }
        }

        $domain->delete();

        return redirect()->route('domains.index')
            ->with('success', 'Domain deleted successfully.');
    }
}
