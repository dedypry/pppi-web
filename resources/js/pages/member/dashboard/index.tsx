import { SharedData } from "@/types";
import { Card, CardBody } from "@heroui/react";
import { usePage } from "@inertiajs/react";

export default function MemberDashboard() {
    const {auth, apps} = usePage<SharedData>().props
    return (
        <Card>
            <CardBody>
                <p className="text-[25px] font-bold">
                    <span className="text-primary">Hi,</span> {auth.user.name}
                </p>
                <p className="text-lg">Selamat datang di {apps.full_name}</p>
            </CardBody>
        </Card>
    );
}
