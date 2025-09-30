import { InertiaLinkProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: NonNullable<InertiaLinkProps['href']>;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    two_factor_enabled?: boolean;
    created_at: string;
    updated_at: string;
    [key: string]: unknown; // This allows for additional properties...
}

export interface Module {
    id: number;
    course_id: number;
    title: string;
    description?: string;
    sort_order: number;
    created_at: string;
    updated_at: string;
}

export interface Course {
    id: number;
    user_id: number;
    title: string;
    subtitle?: string;
    description?: string;
    thumbnail?: string;
    thumbnail_url?: string;
    price: number;
    published: boolean;
    user?: User;
    modules?: Module[];
    created_at: string;
    updated_at: string;
}
