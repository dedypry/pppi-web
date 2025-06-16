import { IChild } from '@/iterfaces/IBody';
import { SharedData } from '@/types';
import { Card, CardBody, CardHeader, Divider, User } from '@heroui/react';
import { Head, Link, usePage } from '@inertiajs/react';
import { BookIcon, LayoutDashboardIcon, LogOutIcon, SettingsIcon, UserIcon } from 'lucide-react';
import HeaderContent from '../landing/header-content';
import LandingLayout from '../landing/landing-layout';

export default function LayoutMember({ children }: IChild) {
    const { auth } = usePage<SharedData>().props;

    const navigation = [
        {
            title: 'Dashboard',
            href: '',
            Icon: LayoutDashboardIcon,
        },
        {
            title: 'Profil Saya',
            href: '',
            Icon: UserIcon,
        },
        {
            title: 'Document',
            href: '',
            Icon: BookIcon,
        },
        {
            title: 'Pengaturan',
            href: '',
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
                        <Card className="p-5">
                            <CardHeader>
                                <User
                                    name={auth.user.name}
                                    description={auth.user.nia}
                                    avatarProps={{
                                        src: auth.user?.profile?.photo,
                                    }}
                                />
                            </CardHeader>
                            <Divider />
                            <CardBody>
                                <div className="flex flex-col">
                                    {navigation.map(({ title, Icon, href }) => (
                                        <Link href={href} className="link-member" key={title}>
                                            <Icon size={20} /> {title}
                                        </Link>
                                    ))}
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
