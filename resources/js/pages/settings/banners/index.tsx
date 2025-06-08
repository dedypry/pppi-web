/* eslint-disable @typescript-eslint/no-explicit-any */
import Carousel from '@/components/Carousel';
import http from '@/helpers/axios';
import { confirmSweet } from '@/helpers/confirm';
import { formatBytes } from '@/helpers/formater';
import {
    BreadcrumbItem,
    Breadcrumbs,
    Button,
    Card,
    CardBody,
    CardHeader,
    Image,
    Switch,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from '@heroui/react';
import { Head, router } from '@inertiajs/react';
import { ImageDownIcon, LayoutDashboard, Settings, Trash2 } from 'lucide-react';
import { useState } from 'react';
import AddBanner from './add-banner';
import { Banners } from '@/iterfaces/IBody';
import { notify, notifyError } from '@/utils/helpers/notify';



interface Props {
    banners: Banners[];
}
export default function SettingBanner({ banners }: Props) {
    const [selectedKeys, setSelectedKeys] = useState(new Set([]));

    function handleDelete(id: number) {
        router.delete(route('banners.destroy', id));
    }

    function handleBulkDelete() {
        const ids = (selectedKeys as any) === 'all' ? banners.map((e) => e.id) : Array.from(selectedKeys);
        router.delete(route('banner.bulk.delete'), {
            data: { ids },
        });
    }

    function handleUpdate(id: number, val: boolean) {
        http.patch(route('banners.update', id), { val })
            .then(({ data }) => {
                router.reload();
                notify(data.message)
            })
            .catch((err) => notifyError(err));
    }

    return (
        <>
            <Head title='Banner'/>
            <Breadcrumbs className="mb-10">
                <BreadcrumbItem onClick={() => router.visit(route('dashboard'))} startContent={<LayoutDashboard size={18} />}>
                    Dashboard
                </BreadcrumbItem>
                <BreadcrumbItem startContent={<Settings size={18} />}>Settings</BreadcrumbItem>
                <BreadcrumbItem startContent={<ImageDownIcon size={18} />}>Banner</BreadcrumbItem>
            </Breadcrumbs>

            <Card className="bg-gray-800">
                <Carousel autoPlay={true}>
                    {banners
                        .filter((e) => e.is_active)
                        .map((item) => (
                            <div key={item.id}>
                                <Image src={item.url} height={500} className="object-cover" />
                            </div>
                        ))}
                </Carousel>
            </Card>

            <Card className="mt-10 w-full">
                <CardHeader className="flex justify-between">
                    <p>Banner List</p>
                    <div className="flex gap-2">
                        <AddBanner />
                        {Array.from(selectedKeys).length > 0 && (
                            <Button color="danger" onPress={() => confirmSweet(() => handleBulkDelete())}>
                                Bulk Delete
                            </Button>
                        )}
                    </div>
                </CardHeader>
                <CardBody>
                    <Table
                        aria-label="Controlled table example with dynamic content"
                        selectionMode="multiple"
                        removeWrapper
                        selectedKeys={selectedKeys}
                        onSelectionChange={(val: any) => setSelectedKeys(val)}
                    >
                        <TableHeader>
                            <TableColumn>Image</TableColumn>
                            <TableColumn>size</TableColumn>
                            <TableColumn>Type</TableColumn>
                            <TableColumn>Status</TableColumn>
                            <TableColumn> </TableColumn>
                        </TableHeader>
                        <TableBody>
                            {banners.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>
                                        <Image src={item.url} height={80} className="max-w-[160px] object-cover" />
                                    </TableCell>
                                    <TableCell>{formatBytes(item.size)}</TableCell>
                                    <TableCell>{item.type}</TableCell>
                                    <TableCell>
                                        <Switch isSelected={item.is_active} onValueChange={(val) => handleUpdate(item.id, val)}>
                                            {item.is_active ? 'Aktif' : 'Tidak Aktif'}{' '}
                                        </Switch>
                                    </TableCell>
                                    <TableCell>
                                        <Button isIconOnly radius="full" variant="light" onPress={() => confirmSweet(() => handleDelete(item.id))}>
                                            <Trash2 size={20} className="text-danger" />
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
