import {
    ClipboardPlusIcon,
    GalleryThumbnailsIcon,
    Grid2X2CheckIcon,
    LayoutDashboard,
    LayoutListIcon,
    MapPinHouse,
    OrigamiIcon,
    RssIcon,
    ShieldCheckIcon,
    ShieldEllipsis,
    User,
    UserPlus2,
    WarehouseIcon,
} from 'lucide-react';

export const navigate = [
    {
        title: 'Dashboard',
        icon: LayoutDashboard,
        href: '/dashboard',
    },
    {
        title: 'Struktur Organisasi',
        icon: OrigamiIcon,
        href: '/admin/organization',
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
                icon: LayoutListIcon,
                href: '/admin/blogs/category',
            },
        ],
    },

    {
        header: 'Settings',
        children: [
            {
                title: 'Department',
                icon: WarehouseIcon,
                href: '/settings/department',
            },
            {
                title: 'Management User',
                icon: ShieldCheckIcon,
                href: '/settings/user-management',
            },
            {
                title: 'Role',
                icon: ShieldEllipsis,
                href: '/settings/roles',
            },
            {
                title: 'Apps',
                icon: Grid2X2CheckIcon,
                href: '/settings/apps',
            },
            {
                title: 'Banner',
                icon: GalleryThumbnailsIcon,
                href: '/settings/banners',
            },
            {
                title: 'Regions',
                icon: MapPinHouse,
                href: '/settings/regions',
            },
        ],
    },
];
