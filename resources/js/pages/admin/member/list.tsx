import CustomInput from '@/components/custom-input';
import Gender from '@/components/gender';
import { confirmSweet } from '@/helpers/confirm';
import { IUserResponse } from '@/iterfaces/IUser';
import debounce from '@/utils/helpers/debounce';
import {
    Avatar,
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
import { EditIcon, EllipsisVerticalIcon, EyeIcon, PhoneIcon, SearchIcon, Trash2Icon } from 'lucide-react';
import { useState } from 'react';

interface Props {
    users: IUserResponse;
}
export default function MemberList({ users }: Props) {
    const queryParams = new URLSearchParams(window.location.search);
    const [search, setSearch] = useState(queryParams.get('search'));


    function handleSearch(val: string) {
        router.get(
            route('member.index'),
            { search: val },
            {
                preserveState: true,
                replace: true,
                preserveScroll: true,
            },
        );
    }
    const debounceSearch = debounce((val: string) => handleSearch(val), 500);
    return (
        <>
            <Card>
                <CardHeader className="flex justify-between">
                    <p>List Anggota</p>
                    <div>
                        <CustomInput
                            placeholder="Search"
                            defaultValue={search || ''}
                            endContent={<SearchIcon className="text-gray-500" />}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                debounceSearch(e.target.value);
                            }}
                        />
                    </div>
                </CardHeader>
                <CardBody>
                    <Table removeWrapper>
                        <TableHeader>
                            <TableColumn className="text-center">Photo</TableColumn>
                            <TableColumn>User</TableColumn>
                            <TableColumn>Address</TableColumn>
                            <TableColumn>Latar Belakang</TableColumn>
                            <TableColumn>Pekerjaan</TableColumn>
                            <TableColumn> </TableColumn>
                        </TableHeader>
                        <TableBody>
                            {users?.data.map((user) => (
                                <TableRow
                                    key={user.id}
                                    className="cursor-pointer hover:bg-primary-50"
                                    onClick={() => router.visit(route('member.show', user.id))}
                                >
                                    <TableCell>
                                        <div className="flex flex-col items-center justify-center gap-2">
                                            <Avatar src={user.profile.photo} className="h-20 w-20" isBordered />
                                            <Chip className="bg-cyan-700 text-white" size="sm">
                                                {user.nia}
                                            </Chip>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex gap-2">
                                            <Gender gender={user.profile.gender} />
                                            <p>{user.name}</p>
                                        </div>
                                        <p>{user.email}</p>
                                        <Button size="sm" color="primary" radius="full" className="mt-1" startContent={<PhoneIcon size={15} />}>
                                            Telp. {user.profile.phone}
                                        </Button>
                                    </TableCell>
                                    <TableCell>
                                        <p>
                                            {user.profile.district.name}, {user.profile.city.name} - {user.profile.province.name}
                                        </p>
                                        <p>{user.profile.address}</p>
                                    </TableCell>
                                    <TableCell>
                                        <p>
                                            {user.profile?.last_education_nursing.toUpperCase()} | {user.profile?.last_education.toUpperCase()}
                                        </p>
                                        <p>
                                            {' '}
                                            {user.profile.citizenship.toUpperCase()} - {user.profile.workplace}{' '}
                                        </p>
                                    </TableCell>
                                    <TableCell>
                                        <p>
                                            {' '}
                                            {user.profile.citizenship.toUpperCase()} - {user.profile.workplace}{' '}
                                        </p>
                                    </TableCell>
                                    <TableCell>
                                        <Dropdown>
                                            <DropdownTrigger>
                                                <Button isIconOnly variant="light">
                                                    <EllipsisVerticalIcon />
                                                </Button>
                                            </DropdownTrigger>
                                            <DropdownMenu>
                                                <DropdownItem
                                                    key="edit"
                                                    startContent={<EditIcon size={20} />}
                                                    color="warning"
                                                    onClick={() => router.visit(route('member.edit', user.id))}
                                                >
                                                    Edit
                                                </DropdownItem>
                                                <DropdownItem
                                                    key="detail"
                                                    startContent={<EyeIcon size={20} />}
                                                    color="primary"
                                                    onClick={() => router.visit(route('member.show', user.id))}
                                                >
                                                    Detail
                                                </DropdownItem>
                                                <DropdownItem
                                                    key="hapus"
                                                    startContent={<Trash2Icon size={20} />}
                                                    color="danger"
                                                    onClick={() => confirmSweet(() => router.delete(route('member.destroy', user.id)))}
                                                >
                                                    Hapus
                                                </DropdownItem>
                                            </DropdownMenu>
                                        </Dropdown>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardBody>
                <CardFooter className="flex justify-center">
                    <Pagination
                        radius="full"
                        initialPage={users?.from}
                        total={users?.last_page}
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
            </Card>
        </>
    );
}
