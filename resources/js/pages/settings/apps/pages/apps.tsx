import CustomDatePicker from '@/components/custom-date-picker';
import CustomInput from '@/components/custom-input';
import QuillJS from '@/components/quill-js';
import { Button, Card, CardBody, CardFooter, CardHeader, Divider } from '@heroui/react';
import { useForm } from '@inertiajs/react';
import LayoutApps from '..';
import { useEffect } from 'react';

export default function Apps({app}:any) {
    const { data, setData, post } = useForm({
        full_name: '',
        created_at: '',
        short_name: '',
        history: '',
    });
    useEffect(()=>{
        if(app){
            setData('full_name',app.full_name)
            setData('created_at',app.created_at)
            setData('short_name',app.short_name)
            setData('history',app.history)
        }
    },[app])

    function handleSubmit(){
        post(route('apps.store'));
    }
    return (
        <LayoutApps logo={app.logo}>
            <Card>
                <CardHeader>Pengaturan Organisasi</CardHeader>
                <CardHeader>
                    <Divider />
                </CardHeader>
                <CardBody className="flex flex-col gap-4">
                    <CustomInput
                        value={data?.full_name}
                        onChange={(e) => setData('full_name', e.target.value)}
                        label="Nama Organisasi"
                        placeholder="Masukan Nama Organisasi"
                    />
                    <CustomInput
                        value={data?.short_name}
                        onChange={(e) => setData('short_name', e.target.value)}
                        label="Singkatan Organisasi"
                        placeholder="Masukan Singkatan Organisasi"
                    />
                    <CustomDatePicker label="Tanggal didirikan Organisasi" time={data.created_at} setValue={(val: string) => setData('created_at', val)} />
                    <QuillJS value={data.history} onContent={(val) => setData('history', val)} label="Sejarah Organisasi" />
                </CardBody>
                <CardFooter className="flex justify-end">
                    <Button color="primary" variant="shadow" onPress={handleSubmit}>
                        Simpan Pengaturan
                    </Button>
                </CardFooter>
            </Card>
        </LayoutApps>
    );
}
