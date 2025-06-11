import CustomInput from '@/components/custom-input';
import { Button, Card, CardBody, CardFooter, CardHeader } from '@heroui/react';
import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import LayoutApps from '..';

export default function Contact({ app }: any) {
    const { data, setData, errors, post } = useForm({
        address: '',
        phone: '',
        email: '',
    });

    useEffect(() => {
        if (app) {
            setData('address', app.address);
            setData('phone', app.phone);
            setData('email', app.email);
        }
    }, [app]);

    function handleSubmit() {
        post(route('apps.store'));
    }
    return (
        <LayoutApps logo={app.logo}>
            <Card>
                <CardHeader>Kontak</CardHeader>
                <CardBody className="flex flex-col gap-5">
                    <CustomInput
                        isInvalid={!!errors.address}
                        errorMessage={errors.address}
                        value={data.address}
                        onChange={(e) => setData('address', e.target.value)}
                        label="No. Telp"
                        placeholder="Masukan No. Telp"
                    />
                    <CustomInput
                        isInvalid={!!errors.phone}
                        errorMessage={errors.phone}
                        value={data.phone}
                        onChange={(e) => setData('phone', e.target.value)}
                        label="Email"
                        placeholder="Masukan Email"
                    />
                    <CustomInput
                        isInvalid={!!errors.email}
                        errorMessage={errors.email}
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        label="Alamat"
                        placeholder="Masukan Alamat"
                    />
                </CardBody>
                <CardFooter className="flex justify-end">
                    <Button onPress={handleSubmit} color="primary">
                        Simpan
                    </Button>
                </CardFooter>
            </Card>
        </LayoutApps>
    );
}
