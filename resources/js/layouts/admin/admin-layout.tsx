/* eslint-disable @typescript-eslint/no-explicit-any */
import { responsive } from '@/utils/helpers/responsive';
import {
    addToast,
    Avatar,
    Button,
    Drawer,
    DrawerContent,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Navbar,
    NavbarContent,
} from '@heroui/react';
import { Head, router, usePage } from '@inertiajs/react';
import { Bell, LogOut, Menu, Settings, User } from 'lucide-react';
import { ReactNode, useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import SidebarMenu from './partials/sidebar-menu';

export default function AdminLayout({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(true);
    const isMobile = useMediaQuery(responsive.mobile);
    const { props } = usePage();

    useEffect(() => {
        const successMessage = (props.flash as any)?.success;
        const errorMessage = (props.flash as any)?.error;

        if (successMessage) {
            addToast({
                title: 'Success',
                description: successMessage,
                color: 'success',
            });
        }

        if (errorMessage) {
            addToast({
                title: 'Error',
                description: errorMessage,
                color: 'danger',
            });
        }
    }, [props]);

    useEffect(() => {
        setIsOpen(!isMobile);
    }, [isMobile]);

    return (
        <main>
            <Head title="Admin" />
            {isMobile ? (
                <Drawer isOpen={isOpen} onClose={() => setIsOpen(false)} size="xs" className="bg-primary pl-4" placement="left">
                    <DrawerContent>{() => <SidebarMenu />}</DrawerContent>
                </Drawer>
            ) : (
                <aside
                    className={`translation-all fixed h-screen w-[266px] transform bg-gradient-to-tr from-primary-900 to-primary-600 pl-3 shadow-lg shadow-primary-200 duration-300 ease-in-out ${
                        !isOpen ? '-translate-x-full' : 'translate-x-0'
                    } ${isMobile && '-translate-x-full'} `}
                >
                    <SidebarMenu />
                </aside>
            )}

            <div className={`${!isOpen ? 'pl-0' : 'lg:pl-[266px]'} translation-all duration-300 ease-in-out`}>
                <main className="px-5 pt-1">
                    <Navbar isBordered isBlurred={false} maxWidth="full" className="sticky top-1 h-[50px] rounded-md border shadow-md">
                        <NavbarContent>
                            <Button size="sm" isIconOnly radius="full" variant="light" className="text-primary" onPress={() => setIsOpen(!isOpen)}>
                                <Menu />
                            </Button>
                            <p className="font-bold text-primary">PPPI</p>
                        </NavbarContent>
                        <NavbarContent justify="end">
                            <Button isIconOnly radius="full" className="text-sm font-bold text-black" variant="light" size="sm">
                                <Bell />
                            </Button>
                            <Dropdown placement="bottom-end" showArrow offset={15}>
                                <DropdownTrigger>
                                    <Avatar size="sm" src="https://i.pravatar.cc/150?u=a04258114e29026702d" />
                                </DropdownTrigger>
                                <DropdownMenu>
                                    <DropdownItem key={1} startContent={<User />} onClick={() => router.visit(route('profile.edit'))}>
                                        My Profile
                                    </DropdownItem>
                                    <DropdownItem key={2} startContent={<Settings />} onClick={() => router.visit(route('profile.edit'))}>
                                        Settings
                                    </DropdownItem>
                                    <DropdownItem onClick={() => router.post(route('logout'))} key={3} startContent={<LogOut />}>
                                        Logout
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </NavbarContent>
                    </Navbar>
                    <div className="py-5">{children}</div>
                </main>
            </div>
        </main>
    );
}
