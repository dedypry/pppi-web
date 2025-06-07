import { CassetteTape, ClipboardPlusIcon, Grid2X2CheckIcon, LayoutDashboard, ListChecks, RssIcon, Shield, User, UserPlus2 } from 'lucide-react';

export const navigate = [
    {
        title: 'Dashboard',
        icon: LayoutDashboard,
        href: '/dashboard',
    },
    {
        header: 'Anggota',
        children: [
            {
                title: 'List Anggota',
                icon: User,
                href: '/admin/member',
            },
            {
                title: 'Tambah Anggota',
                icon: UserPlus2,
                href: '/admin/member/create',
            },
        ],
    },
    {
        header: 'Blogs',
        children: [
            {
                title: 'Blog',
                icon: RssIcon,
                href: '/admin/blogs',
            },
            {
                title: 'Buat Blog',
                icon: ClipboardPlusIcon,
                href: '/admin/blogs/create',
            },
            {
                title: 'Kategori',
                icon: ClipboardPlusIcon,
                href: '/admin/blogs/category',
            },
        ],
    },
    {
        header: 'Settings',
        children: [
            {
                title: 'Role',
                icon: Shield,
                href: '/settings/roles',
            },
            {
                title: 'Apps',
                icon: Grid2X2CheckIcon,
                href: '',
            },
            {
                title: 'Logo',
                icon: ListChecks,
                href: '',
            },
            {
                title: 'Banner',
                icon: CassetteTape,
                href: '/settings/banners',
            },
        ],
    },
];
