import { dateFormat } from '@/helpers/formater';
import { Blog, BlogResponse } from '@/iterfaces/IBlogs';
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Image,
    Input,
    Pagination,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from '@heroui/react';
import { router } from '@inertiajs/react';
import { BookCheck, BookPlusIcon, EditIcon, EllipsisVerticalIcon, SearchIcon, Trash2Icon } from 'lucide-react';
import { useState } from 'react';
import BlogDetail from './detail';
interface Props {
    blogs: BlogResponse;
}
export default function Blogs({ blogs }: Props) {
    const [isOpen, setOpen] = useState(false);
    const [data, setData] = useState<Blog>();
    return (
        <>
            {data && <BlogDetail isOpen={isOpen} setOpen={setOpen} blog={data} />}
            <Card>
                <CardHeader className="flex justify-between">
                    <p>List Blog</p>
                    <div>
                        <Button
                            color="primary"
                            size="sm"
                            startContent={<BookPlusIcon size={18} />}
                            onPress={() => router.visit(route('blogs.create'))}
                        >
                            Buat Blog
                        </Button>
                    </div>
                </CardHeader>
                <CardHeader className="flex justify-end">
                    <div>
                        <Input endContent={<SearchIcon className="text-gray-500" />} placeholder="Search" />
                    </div>
                </CardHeader>
                <CardBody>
                    <Table removeWrapper>
                        <TableHeader>
                            <TableColumn>Cover</TableColumn>
                            <TableColumn>Judul</TableColumn>
                            <TableColumn>Kategori</TableColumn>
                            <TableColumn>Status</TableColumn>
                            <TableColumn>Views</TableColumn>
                            <TableColumn>Penulis</TableColumn>
                            <TableColumn>Di Buat</TableColumn>
                            <TableColumn>Di Terbitkan</TableColumn>
                            <TableColumn> </TableColumn>
                        </TableHeader>
                        <TableBody>
                            {blogs?.data.map((item) => (
                                <TableRow
                                    key={item.id}
                                    className="cursor-pointer hover:bg-primary-50"
                                    onClick={() => {
                                        setData(item);
                                        setOpen(!isOpen);
                                    }}
                                >
                                    <TableCell>
                                        <Image src={item.cover} height={50} />
                                    </TableCell>
                                    <TableCell>
                                        <p>{item.title}</p>
                                        <p className="text-xs italic text-gray-600">{item.subtitle}</p>
                                    </TableCell>
                                    <TableCell>{item.category.name}</TableCell>
                                    <TableCell>{item.status}</TableCell>
                                    <TableCell>{item.view_count}</TableCell>
                                    <TableCell>{item.writer.name}</TableCell>
                                    <TableCell>{dateFormat(item.created_at)}</TableCell>
                                    <TableCell>{dateFormat(item.publish_at)}</TableCell>
                                    <TableCell>
                                        <Dropdown>
                                            <DropdownTrigger>
                                                <Button isIconOnly radius="full" size="sm" variant="light">
                                                    <EllipsisVerticalIcon />
                                                </Button>
                                            </DropdownTrigger>
                                            <DropdownMenu>
                                                <DropdownItem key="reject" startContent={<Trash2Icon size={18} />} color="danger">
                                                    Reject
                                                </DropdownItem>
                                                <DropdownItem key="publish" startContent={<BookCheck size={18} />} color="success">
                                                    Publish
                                                </DropdownItem>
                                                <DropdownItem key="edit" startContent={<EditIcon size={18} />} color="warning" onClick={()=> router.visit(route('blogs.edit', item.id))}>
                                                    Edit
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
                        initialPage={blogs?.from}
                        total={blogs?.last_page}
                        isCompact
                        showControls
                        onChange={(page) =>
                            router.get(
                                route('blogs.index'),
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
