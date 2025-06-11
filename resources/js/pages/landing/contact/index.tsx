import CustomInput from '@/components/custom-input';
import CustomTextArea from '@/components/custom-textarea';
import HeaderContent from '@/layouts/landing/header-content';
import { SharedData } from '@/types';
import { Button, Card, CardBody, CardFooter, CardHeader } from '@heroui/react';
import { Head, usePage } from '@inertiajs/react';
import { Building2, MailCheckIcon, PhoneCall } from 'lucide-react';
import ListSidebar from './list-sidebar';

export default function Contact() {
    const { apps } = usePage<SharedData>().props;
    return (
        <>
            <Head title="kontak" />
            <HeaderContent
                title="Kontak PPPI"
                subtitle="Hubungi kami untuk informasi lebih lanjut, kerja sama, atau pertanyaan seputar keanggotaan dan kegiatan PPPI."
            />
            <div className="container mx-auto px-10">
                <div className="grid grid-cols-12 gap-5">
                    <div className="col-span-4">
                        <Card>
                            <CardBody className="flex flex-col gap-10 p-10">
                                <ListSidebar Icon={Building2} title="Alamat Kantor" subtitle={apps?.address} />
                                <ListSidebar Icon={PhoneCall} title="Telp" subtitle={apps?.phone} />
                                <ListSidebar Icon={MailCheckIcon} title="Email" subtitle={apps?.email} />
                            </CardBody>
                        </Card>
                    </div>
                    <div className="col-span-8">
                        <Card className="p-3">
                            <CardHeader className="text-[20px] font-bold text-primary">Kirim Pesan</CardHeader>
                            <CardBody className="flex flex-col gap-5">
                                <CustomInput label="Nama" placeholder="Masukan Nama" />
                                <CustomInput label="Email" placeholder="Masukan Email" />
                                <CustomInput label="Subject" placeholder="Masukan Subject" />
                                <CustomTextArea label="Pesan" placeholder="Masukan Pesan" />
                            </CardBody>
                            <CardFooter className="flex justify-end">
                                <Button color="primary">Kirim Pesan</Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}
