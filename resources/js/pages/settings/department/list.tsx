import { Department } from '@/iterfaces/IDepartment';
import { IPaginationResponse } from '@/iterfaces/IPagination';
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Pagination,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from '@heroui/react';
import { router } from '@inertiajs/react';
import { Trash2Icon } from 'lucide-react';
import { useState } from 'react';
import Create from './create';

interface Props {
    department: IPaginationResponse<Department>;
}
export default function List({ department }: Props) {
    const [open, setOpen] = useState(false);

    return (
        <>
            <Create open={open} setOpen={setOpen} />
            <Card>
                <CardHeader className="flex justify-between">
                    <p>List Department</p>
                    <Button variant="shadow" color="primary" onPress={() => setOpen(true)}>
                        Tambah Department
                    </Button>
                </CardHeader>
                <CardBody>
                    <Table removeWrapper>
                        <TableHeader>
                            <TableColumn>Icon</TableColumn>
                            <TableColumn>Nama</TableColumn>
                            <TableColumn>Deskripsi</TableColumn>
                            <TableColumn> </TableColumn>
                        </TableHeader>
                        <TableBody emptyContent="Tidak Ada Data">
                            {department?.data.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>{item.icon}</TableCell>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.description}</TableCell>
                                    <TableCell>
                                        <Button isIconOnly variant="light">
                                            <Trash2Icon size={20} />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardBody>
                <CardFooter>
                    {department?.data.length > 0 && (
                        <CardFooter className="flex justify-center">
                            <Pagination
                                radius="full"
                                initialPage={department?.from}
                                total={department?.last_page}
                                isCompact
                                showControls
                                onChange={(page) =>
                                    router.get(
                                        route('member.index'),
                                        {
                                            page,
                                        },
                                        {
                                            preserveState: true,
                                            preserveScroll: true,
                                            replace: true,
                                        },
                                    )
                                }
                            />
                        </CardFooter>
                    )}
                </CardFooter>
            </Card>
        </>
    );
}
