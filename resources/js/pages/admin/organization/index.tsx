// OrgChart.tsx
import OrganizationCard from '@/components/organization-card';
import { User } from '@/iterfaces/IUser';
import { Card, CardHeader } from '@heroui/react';
import { Tree } from 'react-organizational-chart';
import Item from './item';

interface Props {
    users: User[];
}
export default function Organization({ users }: Props) {
    // console.log('USER', users);
    return (
        <Card>
            <CardHeader>Struktur Organisasi</CardHeader>
            {users?.map((user) => (
                <div className="overflow-auto p-4" key={user.id}>
                    <Tree label={<OrganizationCard user={user} />} lineWidth="1px" lineColor="#15980d" lineBorderRadius="10px">
                        {user?.children?.map((child) => <Item key={child.id} user={child} />)}
                    </Tree>
                </div>
            ))}
        </Card>
    );
}
