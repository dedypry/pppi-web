import { Card, CardBody, CardHeader } from '@heroui/react';
import { useForm } from '@inertiajs/react';
import LayoutApps from '..';
import CustomInput from '@/components/custom-input';

export default function Contact({ app }: any) {
    const { data, setData, post } = useForm({
        address: '',
        phone: '',
        email: '',
    });

    function handleSubmit() {
        post(route('apps.store'));
    }
    return (
        <LayoutApps logo={app.logo}>
            <Card>
                <CardHeader>Kontak</CardHeader>
                <CardBody>
                    <CustomInput label="No. Telp" placeholder='Masukan No. Telp'/>
                </CardBody>
            </Card>
        </LayoutApps>
    );
}
