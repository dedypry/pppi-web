import { IApp } from '@/iterfaces/IApps';
import { User } from '@/iterfaces/IUser';
import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
    roles: string[];
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
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    apps:IApp;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    sidebarOpen: boolean;
    [key: string]: unknown;
}
