import { IChild } from '@/iterfaces/IBody';
import { SharedData } from '@/types';
import { Avatar, Divider, Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@heroui/react';
import { Link, router, usePage } from '@inertiajs/react';
import { LayoutDashboard, LogInIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import AboutButton from './about-button';
import LandingDrawer from './drawer';
import Footer from './footer';
import InformationButton from './information-button';
import { notify } from '@/utils/helpers/notify';

export default function LandingLayout({ children }: IChild) {
    const { auth, apps, flash } = usePage<SharedData>().props;
    const [scrolled, setScrolled] = useState(false);
    const scrollVal = window.location.pathname === '/' ? 500 : 215;
    const displayed = useRef({ success: false, error: false });

    useEffect(() => {
        const onScroll = () => {

            if (window.scrollY > scrollVal) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const redirect = ['admin', 'super_admin'].some((role) => auth?.roles?.includes(role)) ? '/dashboard' : '/member/dashboard';

    useEffect(() => {
        const successMessage = (flash as any)?.success;
        const errorMessage = (flash as any)?.error;

        if (successMessage && !displayed.current.success) {
            notify(successMessage)
            router.get(window.location.pathname, {}, {
                preserveScroll: true,
                preserveState: true,
            });
        }

        if (errorMessage && !displayed.current.error) {
            notify(errorMessage, 'error')
            router.get(window.location.pathname, {}, {
                preserveScroll: true,
                preserveState: true,
            });
        }
    }, [flash]);
    return (
        <div className="w-screen">
            <div className="hidden w-full bg-black pt-2 md:block">
                <div className="container mx-auto flex justify-between px-8 text-sm text-white">
                    <p>{apps.full_name}</p>

                    {auth.user ? (
                        <div>
                            <Link href={redirect} className="flex items-center gap-2 text-white">
                                <LayoutDashboard size={14} /> <p>Dashboard</p>
                            </Link>
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Link href="/register" className="flex items-center gap-2 hover:cursor-pointer">
                                <LogInIcon size={14} /> <p>Register</p>
                            </Link>
                            <Divider orientation="vertical" className="h-1/2 bg-white" />
                            <Link href="/login" className="flex items-center gap-2 text-white">
                                <LogInIcon size={14} /> <p>Login</p>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
            {/* <Navbar maxWidth="2xl" className="bg-transparent bg-gradient-to-b from-black to-primary-600" isBlurred={false} isBordered={false}> */}
            <Navbar
                maxWidth="2xl"
                className={`transition-all duration-300 ${scrolled ? 'bg-white shadow-md' : 'bg-primary-600 bg-transparent bg-gradient-to-b from-black to-transparent'}`}
                isBlurred={false}
                isBordered={false}
            >

                <NavbarBrand>
                    <Link href="/" className="flex items-center gap-2">
                        <Avatar src={apps.logo || '/logo1.png'} size="md" />
                        <p className={`m-0 hidden p-0 text-[30px] font-bold ${scrolled ? 'text-gray-800' : 'text-white'} md:flex`}>
                            {apps.short_name}
                        </p>
                        <div className={`flex flex-col ${scrolled ? 'text-gray-800' : 'text-white'} md:hidden`}>
                            <p className="m-0 p-0 font-bold">{apps.short_name}</p>
                            <p className="m-0 p-0 text-[10px]">{apps.full_name}</p>
                        </div>
                    </Link>
                </NavbarBrand>
                <NavbarContent className="hidden md:flex" justify="end">
                    <NavbarItem>
                        <Link className={`link-anim ${scrolled ? 'text-gray-800' : 'text-white'}`} href="/">
                            Beranda
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <AboutButton scrolled={scrolled} />
                    </NavbarItem>
                    <NavbarItem>
                        <InformationButton scrolled={scrolled} />
                    </NavbarItem>
                    <NavbarItem>
                        <Link className={`link-anim ${scrolled ? 'text-gray-800' : 'text-white'}`} href={route('contact')}>
                            Kontak
                        </Link>
                    </NavbarItem>
                </NavbarContent>
                <NavbarContent justify="end" className="md:hidden">
                    <LandingDrawer />
                </NavbarContent>
            </Navbar>

            <div className="z-0 pb-10">{children}</div>
            <Footer />
        </div>
    );
}
