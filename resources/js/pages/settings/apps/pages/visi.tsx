import QuillJS from '@/components/quill-js';
import { Button, Card, CardBody, CardFooter, CardHeader, Divider } from '@heroui/react';
import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import LayoutApps from '..';

export default function Misi({ app }: any) {
    const { data, setData, post } = useForm({
        visi: '',
        misi: '',
    });

    useEffect(() => {
        if (app) {
            setData('visi', app.visi);
            setData('misi', app.misi);
        }
    }, [app]);

    function handleSubmit() {
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
                    <QuillJS value={data.visi} onContent={(val) => setData('visi', val)} label="Visi" />
                    <QuillJS value={data.misi} onContent={(val) => setData('misi', val)} label="Misi" />
                </CardBody>
                <CardFooter className="flex justify-end">
                    <Button color="primary" variant="shadow" onPress={handleSubmit}>
                        Simpan Visi dan Misi
                    </Button>
                </CardFooter>
            </Card>
        </LayoutApps>
    );
}
