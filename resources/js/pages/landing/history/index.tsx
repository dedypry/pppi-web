import HeaderContent from '@/layouts/landing/header-content';
import { SharedData } from '@/types';
import { Card, CardBody } from '@heroui/react';
import { Head, usePage } from '@inertiajs/react';

export default function History() {
    const { apps } = usePage<SharedData>().props;
    return (
        <>
            <Head title="Sejarah pppi" />
            <HeaderContent
                title="Sejarah PPPI"
                subtitle="Menelusuri perjalanan dan dedikasi PPPI dalam memajukan profesi keperawatan di Indonesia."
            />

            <div className="container mx-auto md:px-10 px-5">
                <Card className="md:px-10 p-2">
                    <CardBody>
                        <div dangerouslySetInnerHTML={{ __html: apps.history }} />
                    </CardBody>
                </Card>
            </div>
        </>
    );
}
