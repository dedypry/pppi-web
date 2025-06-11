import HeaderContent from '@/layouts/landing/header-content';
import { Card, CardBody, CardHeader } from '@heroui/react';

export default function Blogs() {
    return (
        <>
            <HeaderContent title="Blogs PPPI" subtitle="Landasan arah dan komitmen PPPI dalam membangun masa depan keperawatan Indonesia." />
            <div className="container mx-auto flex flex-col gap-5 px-10">
                <Card className="p-10">
                    <CardHeader>Visi</CardHeader>
                    <CardBody>blogs</CardBody>
                </Card>
            </div>
        </>
    );
}
