import CustomInput from '@/components/custom-input';
import { IUserResponse, User } from '@/iterfaces/IUser';
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Chip,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Pagination,
    Switch,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from '@heroui/react';
import { router } from '@inertiajs/react';
import { CheckCircle, CircleXIcon, EditIcon, EllipsisVerticalIcon, EyeIcon, LogOutIcon, SearchIcon } from 'lucide-react';
import { useState } from 'react';
import Create from './create';

interface Props {
    users: IUserResponse;
    superiors: User[];
}
export default function UserManagement({ users, superiors }: Props) {
    const [page, setPage] = useState(1);
    console.log('USER', superiors);

    // useEffect(()=>{
    //     getData()
    // },[page])

    function getData(pageData: number) {
        router.get(
            route('user.management.index'),
            {
                page: pageData || page,
            },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            },
        );
    }
    return (
        <Card>
            <CardHeader className="flex justify-between">
                <div className="flex gap-2">
                    <Button className="bg-info" variant="shadow" size="sm">
                        Tambah User Dari Member
                    </Button>
                    <Create superiors={superiors} />
                </div>
                <div className="w-[300px]">
                    <CustomInput size="sm" placeholder="Search" endContent={<SearchIcon size={20} className="text-gray-400" />} />
                </div>
            </CardHeader>
            <CardBody>
                <Table>
                    <TableHeader>
                        <TableColumn>Nama</TableColumn>
                        <TableColumn>Email</TableColumn>
                        <TableColumn>Atasan</TableColumn>
                        <TableColumn>Status</TableColumn>
                        <TableColumn>Department</TableColumn>
                        <TableColumn>Role</TableColumn>
                        <TableColumn>Anggota Organisasi</TableColumn>
                        <TableColumn> </TableColumn>
                    </TableHeader>
                    <TableBody emptyContent="Tidak Ada Data">
                        {users?.data.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.superior?.name}</TableCell>
                                <TableCell>
                                    {user.is_active ? (
                                        <CheckCircle size={20} className="text-success" />
                                    ) : (
                                        <CircleXIcon size={20} className="text-danger" />
                                    )}
                                </TableCell>
                                <TableCell>{user.sort}</TableCell>
                                <TableCell>
                                    {user?.roles?.map((item) => (
                                        <Chip key={item.id} size="sm" color="warning" variant="dot">
                                            {item.name.replace('_', ' ')}
                                        </Chip>
                                    ))}
                                </TableCell>
                                <TableCell>
                                    <Switch isSelected={user.is_organization} />
                                </TableCell>
                                <TableCell>
                                    <Dropdown>
                                        <DropdownTrigger>
                                            <Button size="sm" variant="light" radius="full" isIconOnly>
                                                <EllipsisVerticalIcon />
                                            </Button>
                                        </DropdownTrigger>
                                        <DropdownMenu>
                                            <DropdownItem key="detail" startContent={<EyeIcon size={20} />}>
                                                Detail
                                            </DropdownItem>
                                            <DropdownItem key="edit" startContent={<EditIcon size={20} />}>
                                                edit
                                            </DropdownItem>
                                            <DropdownItem key="out" startContent={<LogOutIcon size={20} />}>
                                                Keluarkan
                                            </DropdownItem>
                                        </DropdownMenu>
                                    </Dropdown>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardBody>
            <CardFooter>
                {users?.data.length > 0 && (
                    <CardFooter className="flex justify-center">
                        <Pagination radius="full" initialPage={users?.from} total={users?.last_page} isCompact showControls onChange={(val)=>{
                            setPage(val)
                            getData(val)
                        }} />
                    </CardFooter>
                )}
            </CardFooter>
        </Card>
    );
}
