import HeaderContent from '@/layouts/landing/header-content';
import { SharedData } from '@/types';
import { Card, CardBody, CardHeader } from '@heroui/react';
import { usePage } from '@inertiajs/react';

export default function VisiMisi() {
    const { apps } = usePage<SharedData>().props;
    return (
        <>
            <HeaderContent title="Visi dan Misi" subtitle="Landasan arah dan komitmen PPPI dalam membangun masa depan keperawatan Indonesia." />
            <div className="container mx-auto flex flex-col gap-5 md:px-10 px-5">
                <Card className="p-3 md:p-10">
                    <CardHeader>Visi</CardHeader>
                    <CardBody>
                        <div dangerouslySetInnerHTML={{ __html: apps.visi }} />
                    </CardBody>
                </Card>
                <Card className="p-3 md:p-10">
                    <CardHeader>Visi</CardHeader>
                    <CardBody>
                        <div dangerouslySetInnerHTML={{ __html: apps.misi }} />
                    </CardBody>
                </Card>
            </div>
        </>
    );
}
