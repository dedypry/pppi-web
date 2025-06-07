import http from '@/helpers/axios';
import { confirmSweet } from '@/helpers/confirm';
import { Category } from '@/iterfaces/IBlogs';
import { notify, notifyError } from '@/utils/helpers/notify';
import { Button, Card, CardBody, CardHeader, Switch, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@heroui/react';
import { router } from '@inertiajs/react';
import { Trash2Icon } from 'lucide-react';
import Edit from './edit';
import CreateCategory from './create';
interface Props {
    categories: Category[];
}
export default function CategoryList({ categories }: Props) {
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
            <Card>
                <CardHeader className='flex justify-between'>
                    <p>List Kategori</p>
                    <CreateCategory/>
                </CardHeader>
                <CardBody>
                    <Table>
                        <TableHeader>
                            <TableColumn>Nama</TableColumn>
                            <TableColumn>Icon</TableColumn>
                            <TableColumn>Status</TableColumn>
                            <TableColumn> </TableColumn>
                        </TableHeader>
                        <TableBody>
                            {categories.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.icon}</TableCell>
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
