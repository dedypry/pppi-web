import http from '@/helpers/axios';
import { confirmSweet } from '@/helpers/confirm';
import { Category } from '@/iterfaces/IBlogs';
import { notify, notifyError } from '@/utils/helpers/notify';
import { Avatar, Button, Card, CardBody, CardHeader, Switch, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@heroui/react';
import { router } from '@inertiajs/react';
import { Trash2Icon } from 'lucide-react';
import { useState } from 'react';
import Edit from './edit';
import ModalCategory from './modal-category';
interface Props {
    categories: Category[];
}
export default function CategoryList({ categories }: Props) {
    const [isOpen, setOpen] = useState(false);
    function handleUpdate(cat: Category, isActive: boolean) {
        http.patch(route('category.update', cat.id), { isActive, name: cat.name })
            .then(({ data }) => {
                notify(data.message);
                router.reload();
            })
            .catch((err) => notifyError(err));
    }

    function handleDelete(id: number) {
        http.delete(route('category.destroy', id))
            .then(({ data }) => {
                notify(data.message);
                router.reload();
            })
            .catch((err) => notifyError(err));
    }
    return (
        <>
            <ModalCategory isOpen={isOpen} setOpen={setOpen} />
            <Card>
                <CardHeader className="flex justify-between">
                    <p>List Kategori</p>
                    <Button variant="shadow" size="sm" color="primary" onPress={() => setOpen(true)}>
                        Tambah Kategori
                    </Button>
                </CardHeader>
                <CardBody>
                    <Table>
                        <TableHeader>
                            <TableColumn>Icon</TableColumn>
                            <TableColumn>Nama</TableColumn>
                            <TableColumn>Status</TableColumn>
                            <TableColumn> </TableColumn>
                        </TableHeader>
                        <TableBody>
                            {categories.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>
                                        <Avatar size="lg" src={item.icon!} />
                                    </TableCell>
                                    <TableCell>
                                        <p>{item.name}</p>
                                        <p className='text-xs text-gray-500 italic'>{item.description!}</p>
                                    </TableCell>
                                    <TableCell>
                                        <Switch isSelected={item.is_active} onValueChange={(val) => handleUpdate(item, val)} />
                                    </TableCell>
                                    <TableCell>
                                        <Edit category={item} />
                                        <Button
                                            isIconOnly
                                            radius="full"
                                            variant="light"
                                            size="sm"
                                            onPress={() => confirmSweet(() => handleDelete(item.id))}
                                        >
                                            <Trash2Icon size={20} className="text-danger" />
                                        </Button>
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
