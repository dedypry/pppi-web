import Carousel from '@/components/Carousel';
import { Banners } from '@/iterfaces/IBody';
import { Card, CardBody, CardHeader, Image } from '@heroui/react';
import { BookUserIcon, Edit, Handshake, HandshakeIcon, NewspaperIcon, SquarePenIcon } from 'lucide-react';

interface Props {
    banners: Banners[];
}
export default function LandingHome({ banners }: Props) {
    const categories = [
        {
            title: 'E-konsultasi',
            icon: HandshakeIcon,
            href:""
        },
        {
            title: 'E-Jurnal',
            icon: NewspaperIcon,
            href:""
        },
        {
            title: 'Registrasi',
            icon: SquarePenIcon,
            href:""
        },
        {
            title: 'Member',
            icon: BookUserIcon,
            href:""
        },
    ];
    return (
        <>
            <Carousel
                autoPlay={true}
                className="-mt-[60px]"
                contentRight={categories.map(({ title, icon: Icon, href }) => (
                    <Card className="max-w-md border border-white/50 bg-black/20 px-10 text-white hover:cursor-pointer hover:bg-black/50 hover:text-white hover:shadow-lg hover:shadow-white">
                        <CardBody className="flex flex-row items-center gap-5">
                            <Icon size={25} />
                            <h1 className="text-[20px] font-semibold">{title}</h1>
                        </CardBody>
                    </Card>
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

            <div className="container mx-auto mt-5 grid grid-cols-12 px-10">
                <div className="col-span-8">
                    <p className="text-[25px] font-semibold">Berita Terbaru</p>
                    <p>Berita Terbaru Perkumpulan Perawat Pembaharuan Indonesia</p>
                </div>
                <div className="col-span-4">
                    <p className="text-[25px] font-semibold">Agenda</p>
                </div>
            </div>
        </>
    );
}
