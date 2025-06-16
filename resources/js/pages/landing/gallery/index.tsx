import HeaderContent from '@/layouts/landing/header-content';
import { Card, CardBody, CardHeader } from '@heroui/react';

export default function Gallery() {
    return (
        <>
            <HeaderContent title="Gallery" subtitle="Landasan arah dan komitmen PPPI dalam membangun masa depan keperawatan Indonesia." />
            <div className="container mx-auto flex flex-col gap-5 md:px-10 px-5">
                <Card className="md:p-10 p-2">
                    <CardHeader>Visi</CardHeader>
                    <CardBody>blogs</CardBody>
                </Card>
            </div>
        </>
    );
}
