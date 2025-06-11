import OrganizationCard from "@/components/organization-card";
import { User } from "@/iterfaces/IUser";
import HeaderContent from "@/layouts/landing/header-content";
import Item from "@/pages/admin/organization/item";
import { SharedData } from "@/types";
import { Card, CardHeader, CardBody } from "@heroui/react";
import { usePage } from "@inertiajs/react";
import { Tree } from "react-organizational-chart";
interface Props {
    users: User[];
}
export default function Organization({ users }: Props) {
    const { apps } = usePage<SharedData>().props;
    return (
        <>
            <HeaderContent
                title="Organisasi PPPI"
                subtitle="Struktur dan peran organisasi dalam mendukung profesionalisme dan solidaritas perawat Indonesia."
            />
            <div className="container mx-auto flex flex-col gap-5 px-10">
                <Card className="p-10">
                    <CardHeader>Struktur Organisasi</CardHeader>
                    <CardBody>
                        {users?.map((user) => (
                            <div className="overflow-auto p-4" key={user.id}>
                                <Tree label={<OrganizationCard user={user} />} lineWidth="1px" lineColor="#15980d" lineBorderRadius="10px">
                                    {user?.children?.map((child) => <Item key={child.id} user={child} />)}
                                </Tree>
                            </div>
                        ))}
                    </CardBody>
                </Card>
            </div>
        </>
    );
}
