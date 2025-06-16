import { IChild } from '@/iterfaces/IBody';
import { SharedData } from '@/types';
import { addToast, Avatar, Divider, Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@heroui/react';
import { Link, usePage } from '@inertiajs/react';
import { LayoutDashboard, LogInIcon } from 'lucide-react';
import { useEffect } from 'react';
import AboutButton from './about-button';
import Footer from './footer';
import InformationButton from './information-button';

export default function LandingLayout({ children }: IChild) {
    const { auth, apps, flash } = usePage<SharedData>().props;

    const redirect = auth?.roles?.includes('admin') ?'/dashboard' : '/member/dashboard' ;

    useEffect(() => {
        const successMessage = (flash as any)?.success;
        const errorMessage = (flash as any)?.error;

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
    }, [flash]);
    return (
        <div>
            <div className="bg-black pt-2">
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
            <Navbar maxWidth="2xl" className="bg-transparent bg-gradient-to-b from-black to-transparent" isBlurred={false} isBordered={false}>
                <NavbarBrand>
                    <Avatar src={apps.logo || '/logo1.png'} size="md" />
                </NavbarBrand>
                <NavbarContent className="hidden sm:flex" justify="end">
                    <NavbarItem>
                        <Link className="link-anim" href="/">
                            Beranda
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <AboutButton />
                    </NavbarItem>
                    <NavbarItem>
                        <InformationButton />
                    </NavbarItem>
                    <NavbarItem>
                        <Link className="link-anim" href={route('contact')}>
                            Kontak
                        </Link>
                    </NavbarItem>
                </NavbarContent>
            </Navbar>

            <div className="z-0 pb-10">{children}</div>
            <Footer />
        </div>
    );
}
