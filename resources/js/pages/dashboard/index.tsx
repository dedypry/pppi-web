import { SharedData } from '@/types';
import { Card, CardBody } from '@heroui/react';
import { usePage } from '@inertiajs/react';

export default function Dashboard() {
     const { auth, apps } = usePage<SharedData>().props;
    return (
        <Card>
            <CardBody className="text-center">
                <h1 className="text-[40px] font-bold">
                    Hi, <span className="text-primary">{auth.user.name}</span>
                </h1>
                <p className="text-[30px]">
                    Selamat Datang di <span className="font-semibold">{apps.full_name}</span>
                </p>
            </CardBody>
        </Card>
    );
}
