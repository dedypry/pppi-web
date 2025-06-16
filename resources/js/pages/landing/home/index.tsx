import Carousel from '@/components/Carousel';
import { IAgenda } from '@/iterfaces/IAgenda';
import { Blog } from '@/iterfaces/IBlogs';
import { Banners } from '@/iterfaces/IBody';
import { IPaginationResponse } from '@/iterfaces/IPagination';
import { Card, CardBody, Image } from '@heroui/react';
import { Head, router } from '@inertiajs/react';
import { BookUserIcon, SquarePenIcon } from 'lucide-react';
import ListAgenda from './list-agenda';
import ListBlogs from './list-blogs';

interface Props {
    banners: Banners[];
    blogs: IPaginationResponse<Blog>;
    agendas: IPaginationResponse<IAgenda>;
}
export default function LandingHome({ banners, blogs, agendas }: Props) {
    const categories = [
        // {
        //     title: 'E-konsultasi',
        //     icon: HandshakeIcon,
        //     href: '',
        // },
        // {
        //     title: 'E-Jurnal',
        //     icon: NewspaperIcon,
        //     href: '',
        // },
        {
            title: 'Registrasi',
            icon: SquarePenIcon,
            href: 'register',
        },
        {
            title: 'Member',
            icon: BookUserIcon,
            href: 'login',
        },
    ];
    return (
        <div className="pb-10">
            <Head title="Beranda" />
            <Carousel
                autoPlay={true}
                className="-mt-[60px]"
                contentRight={categories.map(({ title, icon: Icon, href }) => (
                    <div onClick={() => router.visit(route(href))}>
                        <Card className="max-w-md border border-white/50 bg-black/20 px-10 text-white hover:cursor-pointer hover:bg-black/50 hover:text-white hover:shadow-lg hover:shadow-white">
                            <CardBody className="flex flex-row items-center gap-5">
                                <Icon size={25} />
                                <h1 className="text-[20px] font-semibold">{title}</h1>
                            </CardBody>
                        </Card>
                    </div>
                ))}
            >
                {banners.map((item) => (
                    <Card key={item.id} className="flex h-[500px] items-center justify-center rounded-none bg-slate-800">
                        <Image src={item.url} radius="none" className="h-full w-screen object-cover" />
                        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/70 to-black/30" />
                        {/* <div className="absolute inset-0 z-20 flex items-center justify-center">
                            <h2 className="text-center text-2xl font-bold text-white">Perawat Kepala Desa</h2>
                        </div> */}
                    </Card>
                ))}
            </Carousel>

            <div className="container mx-auto mt-5 grid grid-cols-1 md:grid-cols-12 gap-10 md:px-10 px-5">
                <div className="md:col-span-8">
                    <section id="title" className="mb-10 mx-1">
                        <p className="text-[25px] font-semibold">Berita Terbaru</p>
                        <p className="text-sm italic text-gray-500">Berita Terbaru Perkumpulan Perawat Pembaharuan Indonesia asdfasdf</p>
                    </section>
                    <ListBlogs blogs={blogs} />
                </div>
                <div className="md:col-span-4">
                    <section id="agenda" className="mb-10">
                        <p className="text-[25px] font-semibold">Agenda</p>
                        <p className="text-sm italic text-gray-500">Agenda PPPI</p>
                    </section>
                    <ListAgenda agendas={agendas} />
                </div>
            </div>
        </div>
    );
}
