import HeaderContent from '@/layouts/landing/header-content';
import { Button, Card, CardBody, CardFooter, CardHeader } from '@heroui/react';
import { Head, usePage } from '@inertiajs/react';
import { Building2, MailCheckIcon, PhoneCall } from 'lucide-react';
import ListSidebar from './list-sidebar';
import { SharedData } from '@/types';
import CustomInput from '@/components/custom-input';
import QuillJS from '@/components/quill-js';
import CustomTextArea from '@/components/custom-textarea';

export default function Contact() {
    const { apps } = usePage<SharedData>().props;
    return (
        <>
            <Head title="kontak" />
            <HeaderContent
                title="Contact PPPI"
                subtitle="Hubungi kami untuk informasi lebih lanjut, kerja sama, atau pertanyaan seputar keanggotaan dan kegiatan PPPI."
            />
            <div className="container mx-auto">
                <div className="grid grid-cols-12 gap-5">
                    <div className="col-span-4">
                        <Card>
                            <CardBody className="p-10 flex flex-col gap-10">
                                <ListSidebar Icon={Building2} title='Alamat Kantor' subtitle={apps.full_name} />
                                <ListSidebar Icon={PhoneCall} title='Telp' subtitle={apps.full_name} />
                                <ListSidebar Icon={MailCheckIcon} title='Email' subtitle={apps.full_name} />

                            </CardBody>
                        </Card>
                    </div>
                    <div className="col-span-8">
                        <Card className='p-6'>
                            <CardHeader className='font-bold text-[30px] text-primary'>Kirim Pesan</CardHeader>
                            <CardBody className='flex flex-col gap-5'>
                                <CustomInput label="Nama" placeholder='Masukan Nama'/>
                                <CustomInput label="Email" placeholder='Masukan Email'/>
                                <CustomInput label="Subject" placeholder='Masukan Subject'/>
                                <CustomTextArea label="Pesan" placeholder='Masukan Pesan' />
                            </CardBody>
                            <CardFooter className='flex justify-end py-5'>
                                <Button color='primary'>Kirim Pesan</Button>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}
