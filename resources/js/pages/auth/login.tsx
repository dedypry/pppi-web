import { IApp } from '@/iterfaces/IApps';
import { Button, Card, CardBody, CardFooter, CardHeader, Checkbox, Divider, Form, Image, Input, Link } from '@heroui/react';
import { Head, useForm, usePage } from '@inertiajs/react';
import { Eye, EyeClosed, LockKeyhole, Mail } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

// interface LoginProps {
//     status?: string;
//     canResetPassword: boolean;
// }

export default function Login() {
    const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
        email: '',
        password: '',
        remember: false,
    });
    const {props} = usePage()
    const apps:IApp = props.apps as any;

    const [isPassword, setIsPassword] = useState(false);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="flex h-screen w-full items-center justify-center bg-primary-100">
            <Head title="Login" />
            <Form onSubmit={submit} className="w-full max-w-md">
                <Card className="w-full p-5">
                    <CardHeader className="flex justify-center gap-3">
                        <Image src={apps.logo || '/logo1.png'} height={50} width={50} />
                        <h1 className="text-[30px] font-bold">{apps?.short_name}</h1>
                    </CardHeader>
                    <CardHeader className="flex justify-center">
                        <h1>{apps.full_name} 🇮🇩</h1>
                    </CardHeader>
                    <CardBody className="flex flex-col gap-5">
                        <Input
                            value={data.email}
                            startContent={<Mail size={20} className={errors.email ? 'text-danger' : 'text-secondary-600'} />}
                            onChange={(e) => setData('email', e.target.value)}
                            label="Email"
                            labelPlacement="outside"
                            placeholder="you@example.com"
                            errorMessage={errors.email}
                            isInvalid={!!errors.email}
                            variant="bordered"
                        />
                        <Input
                            value={data.password}
                            startContent={<LockKeyhole size={20} className={errors.password ? 'text-danger' : 'text-secondary-600'} />}
                            onChange={(e) => setData('password', e.target.value)}
                            label="Password"
                            labelPlacement="outside"
                            placeholder="input password"
                            type={!isPassword ? 'password' : 'text'}
                            endContent={
                                <Button isIconOnly radius="full" size="sm" variant="light" onPress={() => setIsPassword(!isPassword)}>
                                    {isPassword ? (
                                        <Eye className={errors.password ? 'text-danger' : ''} />
                                    ) : (
                                        <EyeClosed className={errors.password ? 'text-danger' : ''} />
                                    )}
                                </Button>
                            }
                            errorMessage={errors.password}
                            isInvalid={!!errors.password}
                            variant="bordered"
                        />
                        <div className="flex justify-between">
                            <Checkbox checked={data.remember} onChange={(e) => setData('remember', e.target.checked)}>
                                Ingat Saya
                            </Checkbox>
                            <Link href="/forgot-password" className="text-sm">
                                Lupa Password
                            </Link>
                        </div>
                    </CardBody>
                    <CardFooter className="flex flex-col gap-3">
                        <Button type="submit" fullWidth color="primary" isLoading={processing} disabled={processing}>
                            Masuk
                        </Button>

                        <div className="flex w-full items-center gap-2 text-sm text-gray-500">
                            <Divider className="flex-1" />
                            <span className="whitespace-nowrap">OR</span>
                            <Divider className="flex-1" />
                        </div>

                        <Button fullWidth color="primary" variant="bordered">
                            Daftar
                        </Button>
                    </CardFooter>
                </Card>
            </Form>
        </div>
    );
}
