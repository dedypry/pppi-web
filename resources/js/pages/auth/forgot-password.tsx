// Components
import CustomInput from '@/components/custom-input';
import { Button, Card, CardBody, CardFooter, CardHeader } from '@heroui/react';
import { useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm<Required<{ email: string }>>({
        email: '',
    });

    const submit = () => {
        post(route('password.email'));
    };

    return (
        <div className="flex h-screen flex-1 items-center justify-center bg-primary-100">
            <Card className="w-[400px]">
                <CardHeader>Lupa Password</CardHeader>
                <CardBody>
                    <CustomInput value={data.email} onChange={(e) => setData('email', e.target.value)} label="Email" placeholder="Masukan Email" />
                </CardBody>
                <CardFooter className="flex justify-end">
                    <Button color="primary" onPress={submit}>
                        Submit
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
