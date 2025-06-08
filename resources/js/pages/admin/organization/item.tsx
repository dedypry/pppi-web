import OrganizationCard from '@/components/organization-card';
import { User } from '@/iterfaces/IUser';
import { TreeNode } from 'react-organizational-chart';

interface Props {
    user: User;
}
export default function Item({ user }: Props) {
    return <TreeNode label={<OrganizationCard user={user} />}>{user?.children?.map((child) => <Item key={child.id} user={child} />)}</TreeNode>;
}
