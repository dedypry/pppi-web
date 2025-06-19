import Carousel from '@/components/Carousel';
import { IAgenda } from '@/iterfaces/IAgenda';
import { Blog } from '@/iterfaces/IBlogs';
import { Banners } from '@/iterfaces/IBody';
import { IPaginationResponse } from '@/iterfaces/IPagination';
import { Button, Card, Image } from '@heroui/react';
import { Head } from '@inertiajs/react';
import ListAgenda from './list-agenda';
import ListBlogs from './list-blogs';
import { certificate } from '@/utils/constanta/global';

interface Props {
    banners: Banners[];
    blogs: IPaginationResponse<Blog>;
    agendas: IPaginationResponse<IAgenda>;
}
export default function LandingHome({ banners, blogs, agendas }: Props) {
    return (
        <div className="pb-10">
            <Head title="Beranda" />
            <Carousel
                autoPlay={true}
                className="-mt-[60px]"
                contentCenter={
                    <div className="flex h-full flex-col items-center justify-center">
                        <p className="text-[50px] font-bold text-white/70">Jadilah Bagian dari Perjalanan Kami</p>
                        <p className="text-[20px] font-semibold italic text-white/70">
                            Kami percaya, kemitraan hebat dimulai dari visi yang sama. <br /> Ayo bergabung dan capai lebih banyak bersama
                        </p>
                        <Button className="mt-10 text-white" radius="full" variant="bordered">
                            🚀 Mulai Jadi Partner
                        </Button>
                    </div>
                }
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

            <section id="content-left" className="section-home">
                <div className="md:col-span-8">
                    <section id="title" className="mx-1 mb-10">
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
            </section>

            <div className="mt-10 h-[200px] w-full bg-[url('/images/paralax/bg-1.jpg')] bg-cover bg-fixed bg-center bg-no-repeat shadow-lg">
                <div className="container mx-auto grid h-full grid-cols-1 gap-5 bg-black/50 px-5 py-5 md:grid-cols-12 md:px-10">
                    <div className="md:col-span-8">
                        <div className="text-white">
                            <p className="pb-5 text-[30px] font-bold">💼 Gabung Sebagai Partner</p>
                            <p className="border-l-2 border-white pl-5 text-[16px]">
                                Bersama, kita bisa membangun ekosistem bisnis yang saling menguntungkan, memperluas jaringan, dan menciptakan
                                pertumbuhan yang berkelanjutan dalam jangka panjang.
                            </p>
                        </div>
                    </div>
                    <div className="md:col-span-4">
                        <div className="flex h-full items-center justify-center">
                            <Button variant="bordered" className="text-white shadow-lg" radius="full">
                                Daftar Kemitraan
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <section id="compro" className="section-home">
                {/* Left: Video */}
                <div className="md:col-span-7">
                    <Card className="shadow-lg">
                        <video src="/video/compro.mov" autoPlay muted loop playsInline className="h-auto w-full rounded-xl" />
                    </Card>
                </div>

                {/* Right: Text Content */}
                <div className="flex flex-col justify-center space-y-4 md:col-span-5">
                    <h2 className="text-3xl font-bold text-gray-800">Company Profile</h2>
                    <p className="text-lg text-gray-600">Mengenal lebih dekat siapa kami dan apa yang kami lakukan.</p>
                    <p className="text-sm text-gray-500">
                        Video company profile ini memberikan gambaran menyeluruh tentang visi, misi, dan nilai-nilai yang kami pegang. Pelajari
                        bagaimana kami membangun solusi dan berkolaborasi untuk menciptakan dampak nyata di dunia bisnis.
                    </p>
                </div>
            </section>

            <section id="sertivikasi" className="section-home">
                <div className="flex flex-col justify-center space-y-4 md:col-span-5">
                    <h2 className="text-3xl font-bold text-gray-800">Sertifikat Akreditasi</h2>
                    <p className="text-lg text-gray-600">
                        Kami bangga telah terakreditasi oleh lembaga resmi yang memperkuat kepercayaan mitra dan pelanggan kami.
                    </p>
                    {/* <p className="text-sm text-gray-500">
                        Video company profile ini memberikan gambaran menyeluruh tentang visi, misi, dan nilai-nilai yang kami pegang. Pelajari
                        bagaimana kami membangun solusi dan berkolaborasi untuk menciptakan dampak nyata di dunia bisnis.
                    </p> */}
                </div>
                <div className="md:col-span-7">
                    <Carousel autoPlay={true}>
                        {certificate.map((item,i) => (
                            <Card key={i} className="flex items-center justify-center h-[450px]">
                                <Image src={item} radius="none" className="h-full w-screen object-cover object-center" />
                            </Card>
                        ))}
                        {/* <Card key="image-1">
                            <Image src="/images/sertifikasi/Sertifikat_Akreditasi_LPKPPPI.jpg" isZoomed className="w-full" />
                        </Card> */}
                    </Carousel>
                </div>
            </section>
        </div>
    );
}
