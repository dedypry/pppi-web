import { IChild } from '@/iterfaces/IBody';
import { Divider, Image, Link, Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@heroui/react';
import { LogInIcon } from 'lucide-react';

export default function LandingLayout({ children }: IChild) {
    return (
        <>
            <div className="bg-black pt-2">
                <div className="container mx-auto flex justify-between px-8 text-sm text-white">
                    <p>Perkumpulan Perawat Pembaharuan Indonesia</p>
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-2 hover:cursor-pointer">
                            <LogInIcon size={14} /> <p>Register</p>
                        </div>
                        <Divider orientation="vertical" className="h-1/2 bg-white" />
                        <div className="flex items-center gap-2 hover:cursor-pointer">
                            <LogInIcon size={14} /> <p>Login</p>
                        </div>
                    </div>
                </div>
            </div>
            <Navbar maxWidth="2xl" className="bg-transparent bg-gradient-to-b from-black to-transparent" isBlurred={false} isBordered={false}>
                <NavbarBrand>
                    <Image src="/logo1.png" height={40} />
                </NavbarBrand>
                <NavbarContent className="hidden sm:flex" justify="end">
                    <NavbarItem>
                        <Link className="link-anim" href="#">
                            Beranda
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link className="link-anim" href="#">
                            Tentang Kami
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link className="link-anim" aria-current="page" href="#">
                            Informasi
                        </Link>
                    </NavbarItem>
                    <NavbarItem>
                        <Link className="link-anim" href="#">
                            Kontak
                        </Link>
                    </NavbarItem>
                </NavbarContent>
            </Navbar>

            {children}
        </>
    );
}
