import { dateFormat } from '@/helpers/formater';
import { PaginatedRoles } from '@/iterfaces/IRoles';
import { Button, Card, CardBody, CardHeader, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@heroui/react';
import { Trash2Icon } from 'lucide-react';
import CreateRole from './create';
import EditRole from './edit';
interface Props {
    roles: PaginatedRoles;
    users: any;
}
export default function List({ roles, users }: Props) {
    return (
        <>
            <Card>
                <CardHeader className="flex justify-between">
                    <p>List Role</p>
                    <CreateRole users={users}/>
                </CardHeader>
                <CardBody>
                    <Table>
                        <TableHeader>
                            <TableColumn>Nama Role</TableColumn>
                            <TableColumn>Proteksi</TableColumn>
                            <TableColumn>dibuat tanggal</TableColumn>
                            <TableColumn> </TableColumn>
                        </TableHeader>
                        <TableBody>
                            {roles.data.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.guard_name}</TableCell>
                                    <TableCell>{dateFormat(item.created_at)}</TableCell>
                                    <TableCell>
                                        <Button isIconOnly radius="full" variant="light" size="sm">
                                            <Trash2Icon className="text-danger" />
                                        </Button>
                                        <EditRole role={item} users={users} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardBody>
            </Card>
        </>
    );
}
