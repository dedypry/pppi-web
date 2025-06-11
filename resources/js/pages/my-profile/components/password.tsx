import InputPassword from '@/components/input-password';
import { Button, Card, CardBody, CardFooter, CardHeader } from '@heroui/react';
import { useForm } from '@inertiajs/react';
import { useRef } from 'react';
import DeleteAccount from './delete-accournt';

// const breadcrumbs: BreadcrumbItem[] = [
//     {
//         title: 'Password settings',
//         href: '/settings/password',
//     },
// ];

export default function Password() {
    const passwordInput = useRef<HTMLInputElement>(null);
    const currentPasswordInput = useRef<HTMLInputElement>(null);

    const { data, setData, errors, put, reset, processing } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword = () => {
        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    passwordInput.current?.focus();
                }

                if (errors.current_password) {
                    currentPasswordInput.current?.focus();
                }
            },
        });
    };

    return (
        <div className="flex flex-col gap-5">
            <Card>
                <CardHeader>Keamanan</CardHeader>
                <CardBody className="flex flex-col gap-4">
                    <InputPassword
                        isInvalid={!!errors.current_password}
                        errorMessage={errors.current_password}
                        value={data.current_password}
                        onChange={(e) => setData('current_password', e.target.value)}
                    />
                    <InputPassword
                        isInvalid={!!errors.password}
                        errorMessage={errors.password}
                        label="Password Baru"
                        placeholder="Password Baru"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                    />
                    <InputPassword
                        value={data.password_confirmation}
                        isInvalid={!!errors.password_confirmation}
                        errorMessage={errors.password_confirmation}
                        label="Konfirmasi Password"
                        placeholder="Masukan Konfirmasi Password"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                    />
                </CardBody>
                <CardBody className="text-xs text-gray-500">
                    <p className="font-bold">Persyaratan Kata Sandi:</p>
                    <ul className="pl-2">
                        <li>Minimal 8 karakter - semakin panjang, semakin baik</li>
                        <li>Setidaknya satu huruf kecil</li>
                        <li>Setidaknya satu angka, simbol, atau spasi</li>
                    </ul>
                </CardBody>
                <CardFooter className="flex justify-end">
                    <Button isLoading={processing} color="primary" variant="shadow" onPress={updatePassword}>
                        Simpan Perubahan
                    </Button>
                </CardFooter>
            </Card>
            <DeleteAccount />
        </div>
    );
}
