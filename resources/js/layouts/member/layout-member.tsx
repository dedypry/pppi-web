import { IChild } from '@/iterfaces/IBody';
import { SharedData } from '@/types';
import { Card, CardBody, CardHeader, Divider, User } from '@heroui/react';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { BookIcon, LayoutDashboardIcon, LogOutIcon, SettingsIcon, UserIcon } from 'lucide-react';
import HeaderContent from '../landing/header-content';
import LandingLayout from '../landing/landing-layout';
import { confirmSweet } from '@/helpers/confirm';

export default function LayoutMember({ children }: IChild) {
    const { auth } = usePage<SharedData>().props;
    const active = window.location.pathname

    const navigation = [
        {
            title: 'Dashboard',
            href: '/member/dashboard',
            Icon: LayoutDashboardIcon,
        },
        {
            title: 'Profil Saya',
            href: '/member/profile',
            Icon: UserIcon,
        },
        {
            title: 'Document',
            href: '/member/document',
            Icon: BookIcon,
        },
        {
            title: 'Pengaturan',
            href: '/member/setting',
            Icon: SettingsIcon,
        },
        {
            title: 'Keluar',
            href: '',
            Icon: LogOutIcon,
        },
    ];
    return (
        <LandingLayout>
            <Head title="Member" />
            <HeaderContent title="Dashboard Anggota" />
            <div className="container mx-auto px-10">
                <div className="grid grid-cols-12 gap-5">
                    <div className="col-span-3">
                        <Card >
                            <CardHeader className='p-5'>
                                <User
                                    name={auth.user.name}
                                    description={auth.user.nia}
                                    avatarProps={{
                                        src: auth.user?.profile?.photo,
                                        isBordered: true,
                                        color:"primary"
                                    }}
                                    classNames={{
                                        description:'text-gray-500'
                                    }}
                                />
                            </CardHeader>
                            <Divider />
                            <CardBody>
                                <div className="flex flex-col">
                                    {navigation.map(({ title, Icon, href }) => {
                                        if(title === 'Keluar'){
                                            return (
                                                <Link
                                                    href="#"
                                                    onClick={() =>
                                                        confirmSweet(() => router.post(route('logout')), {
                                                            text: 'Kamu Akan keluar dari halaman ini ?',
                                                            confirmButtonText: 'Ya, Keluar',
                                                        })
                                                    }
                                                    className={`link-member ${active === href ? "bg-primary":""}`}
                                                    key={title}
                                                >
                                                    <Icon size={20} /> {title}
                                                </Link>
                                            );
                                        }else {
                                            return (
                                                <Link href={href} className={`link-member ${active === href ? 'bg-primary' : ''}`} key={title}>
                                                    <Icon size={20} /> {title}
                                                </Link>
                                            );
                                        }
                                    })}
                                </div>
                            </CardBody>
                        </Card>
                    </div>
                    <div className="col-span-9">{children}</div>
                </div>
            </div>
        </LandingLayout>
    );
}
