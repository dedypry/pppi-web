import { SharedData } from '@/types';
import { Avatar, Button, Divider, Drawer, DrawerBody, DrawerContent, DrawerHeader } from '@heroui/react';
import { Link, router, usePage } from '@inertiajs/react';
import { AlignStartVerticalIcon, Atom, Backpack, ContactIcon, GalleryThumbnails, History, LayoutDashboard, MenuIcon, Rss } from 'lucide-react';
import { useState } from 'react';

export default function LandingDrawer() {
    const [isOpen, setOpen] = useState(false);
    const { apps } = usePage<SharedData>().props;
    const url = window.location.pathname;

    console.log('URL', url);

    router.on('navigate', () => {
        setOpen(false);
    });

    const navigations = [
        {
            title: 'Beranda',
            href: '/',
            icon: LayoutDashboard,
        },
        {
            title: 'Tentang Kami',
            children: [
                {
                    title: 'Sejarah PPPI',
                    href: '/history',
                    icon: History,
                },
                {
                    title: 'Visi dan Misi',
                    href: '/visi-misi',
                    icon: AlignStartVerticalIcon,
                },
                {
                    title: 'Struktur Organisasi',
                    href: '/organization',
                    icon: Atom,
                },
                {
                    title: 'LPK PPPI',
                    href: '',
                    icon: Backpack,
                },
            ],
        },
        {
            title: 'Informasi',
            children: [
                {
                    title: 'Blog',
                    href: '/blogs',
                    icon: Rss,
                },
                {
                    title: 'Galeri',
                    href: '/gallery',
                    icon: GalleryThumbnails,
                },
            ],
        },
        {
            title: 'Kontak',
            href: '/contact',
            icon: ContactIcon,
        },
    ];
    return (
        <>
            <Drawer isOpen={isOpen} onOpenChange={() => setOpen(!isOpen)}>
                <DrawerContent>
                    <DrawerHeader className="flex items-center gap-5">
                        <Avatar src={apps.logo} isBordered />
                        <div>
                            <p>{apps.short_name}</p>
                            <p className="text-xs text-gray-500">{apps.full_name}</p>
                        </div>
                    </DrawerHeader>
                    <Divider />
                    <DrawerBody>
                        <div className="flex flex-col">
                            {navigations.map((item) => {
                                const ParentIcon = item.icon;
                                if (item.children) {
                                    return (
                                        <div className="mt-2">
                                            <p className="mb-1 pl-3 text-sm text-gray-400">{item.title}</p>
                                            <div className="flex flex-col pl-1">
                                                {item.children.map(({ icon: Icon, title, href }) => (
                                                    <Link
                                                        className={`link-member ${url === href ? 'bg-primary-500 text-white shadow-md' : ''}`}
                                                        href={href}
                                                    >
                                                        <Icon size={18} /> {title}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                }

                                return (
                                    <Link className={`link-member ${url === item.href ? 'bg-primary-500 text-white shadow-md':""}`} href={item.href}>
                                        {ParentIcon && <ParentIcon size={18} />} {item.title}
                                    </Link>
                                );
                            })}
                        </div>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
            <Button isIconOnly size="sm" radius="full" variant="light" onPress={() => setOpen(true)}>
                <MenuIcon className="text-white" />
            </Button>
        </>
    );
}
