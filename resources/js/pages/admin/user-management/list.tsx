import CustomInput from '@/components/custom-input';
import ToggleCheck from '@/components/toggle-check';
import { Department } from '@/iterfaces/IDepartment';
import { Role } from '@/iterfaces/IRoles';
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
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from '@heroui/react';
import { router } from '@inertiajs/react';
import { EditIcon, EllipsisVerticalIcon, EyeIcon, LogOutIcon, SearchIcon } from 'lucide-react';
import { useState } from 'react';
import Create from './create';
import CreateForMember from './create-for-member';

interface Props {
    users: IUserResponse;
    superiors: User[];
    members: User[];
    department: Department[];
    roles: Role[];
}
export default function UserManagement({ users, superiors, department, roles, members }: Props) {
    const [page, setPage] = useState(1);
    const [open, setOpen] = useState(false);
    const [openMember, setOpenMember] = useState(false);
    const [dataEdit, setDataEdit] = useState<User | undefined>();

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
            <CreateForMember
                superiors={superiors}
                department={department}
                roles={roles}
                isOpen={openMember}
                setOpen={(val: boolean) => {
                    setOpenMember(val);
                    if (!val) {
                        setDataEdit(undefined);
                    }
                }}
                user={dataEdit}
                members={members}
            />
            <Create
                superiors={superiors}
                department={department}
                roles={roles}
                isOpen={open}
                setOpen={(val: boolean) => {
                    setOpen(val);
                    if (!val) {
                        setDataEdit(undefined);
                    }
                }}
                user={dataEdit}
            />
            <CardHeader className="flex justify-between">
                <div className="flex gap-2">
                    <Button className="bg-info" variant="shadow" size="sm" onPress={() => setOpenMember(true)}>
                        Tambah User Dari Member
                    </Button>
                    <Button color="primary" variant="shadow" size="sm" onPress={() => setOpen(true)}>
                        Tambah User
                    </Button>
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
                        <TableColumn className="text-center">Status</TableColumn>
                        <TableColumn>Department</TableColumn>
                        <TableColumn>Role</TableColumn>
                        <TableColumn className="text-center">Deskripsi Pekerjaan</TableColumn>
                        <TableColumn> </TableColumn>
                    </TableHeader>
                    <TableBody emptyContent="Tidak Ada Data">
                        {users?.data.map((user) => (
                            <TableRow key={user.id}>
                                <TableCell>{user.name}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.superior?.name}</TableCell>
                                <TableCell className="flex justify-center">
                                    <ToggleCheck isActive={user.is_active} />
                                </TableCell>
                                <TableCell>{user.department?.name}</TableCell>
                                <TableCell>
                                    {user?.roles?.map((item) => (
                                        <Chip key={item.id} size="sm" color="warning" variant="dot">
                                            {item.name.replace('_', ' ')}
                                        </Chip>
                                    ))}
                                </TableCell>
                                <TableCell className="flex justify-center">{user.job_title}</TableCell>
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
                                            <DropdownItem
                                                key="edit"
                                                startContent={<EditIcon size={20} />}
                                                onClick={() => {
                                                    setDataEdit(user);
                                                    setOpen(true);
                                                }}
                                            >
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
                        <Pagination
                            radius="full"
                            initialPage={users?.from}
                            total={users?.last_page}
                            isCompact
                            showControls
                            onChange={(val) => {
                                setPage(val);
                                getData(val);
                            }}
                        />
                    </CardFooter>
                )}
            </CardFooter>
        </Card>
    );
}
