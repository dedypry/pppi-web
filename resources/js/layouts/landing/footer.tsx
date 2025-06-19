import { SharedData } from '@/types';
import { Avatar, Divider } from '@heroui/react';
import { Link, usePage } from '@inertiajs/react';
import dayjs from 'dayjs';

export default function Footer() {
    const { apps } = usePage<SharedData>().props;
    return (
        <footer className="z-50 min-h-[300px] w-full bg-primary">
            <div className="container mx-auto px-10 py-10">
                <div className="grid grid-cols-12 gap-5">
                    <div className="col-span-12 md:col-span-4">
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                                <Avatar src={apps.logo} size="lg" />
                                <p className="text-[30px] font-semibold text-white">{apps.short_name}</p>
                            </div>
                            <p className="text-md text-white">{apps.full_name}</p>
                        </div>
                    </div>
                    <div className="col-span-12 text-white md:col-span-8">
                        <div className="grid md:grid-cols-3 grid-cols-1 gap-5">
                            <div>
                                <p className="text-lg font-semibold">Profil</p>
                                <Divider className="mb-3 max-w-[200px] bg-white/60" />
                                <div className="flex flex-col gap-2">
                                    <Link href="#">Sejarah PPPI</Link>
                                    <Link href="#">Visi dan Misi</Link>
                                    <Link href="#">Struktur Organisasi</Link>
                                </div>
                            </div>
                            <div>
                                <p className="text-lg font-semibold">Hubungi Kami</p>
                                <Divider className="mb-3 max-w-[200px] bg-white/60" />
                                <div className="flex flex-col gap-2">
                                    <Link href="#">Sejarah PPPI</Link>
                                    <Link href="#">Visi dan Misi</Link>
                                    <Link href="#">Struktur Organisasi</Link>
                                </div>
                            </div>
                            <div>
                                <p className="text-lg font-semibold">Kunjungi Sosial Media Kami</p>
                                <Divider className="mb-3 bg-white/60" />
                                <div className="flex flex-col gap-2">
                                    <Link href="#">Sejarah PPPI</Link>
                                    <Link href="#">Visi dan Misi</Link>
                                    <Link href="#">Struktur Organisasi</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Divider className="my-5 bg-white/60" />
                <div className="text-white">
                    <p>
                        &copy; Copyright by{' '}
                        <a href="https://dedypry.id/" target="__blank" className="hover:font-bold">
                            dedypry.id
                        </a>{' '}
                        - {dayjs().format('YYYY')} All Right Reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
