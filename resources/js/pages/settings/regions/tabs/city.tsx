import CustomInput from '@/components/custom-input';
import { IResponseCity } from '@/iterfaces/IUser';
import debounce from '@/utils/helpers/debounce';
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Pagination,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from '@heroui/react';
import { router } from '@inertiajs/react';
import { SearchIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import LayoutRegion from '../layout';
interface Props {
    cities: IResponseCity;
}
export default function City({ cities }: Props) {
    const [selectedKeys, setSelectedKeys] = useState(new Set([]));
    const [isOpen, setOpen] = useState(false);
    const [value, setValue] = useState('');
    const [page, setPage] = useState(1);
    const queryParams = new URLSearchParams(window.location.search);
    const [search, setSearch] = useState(queryParams.get('search'));

    console.log('query', queryParams.get('search'));
    function handleUpdateCode(id: number, code: string) {
        router.patch(
            route('city.update', id),
            { code },
            {
                preserveState: true,
                replace: true,
                preserveScroll: true,
            },
        );
    }

    useEffect(() => {
        getData();
    }, [page]);

    function getData(dataSearch = '') {
        router.get(
            route('region.city'),
            {
                page,
                search: dataSearch || search,
            },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
            },
        );
    }

    function handleSearch(search: string) {
        router.get(route('region.city'), { search }, { preserveState: true, replace: true, preserveScroll: true });
    }

    function handleBulkUpdate() {
        const ids = (selectedKeys as any) === 'all' ? cities?.data.map((e) => e.id) : Array.from(selectedKeys);
        router.post(
            route('city.bulk.update'),
            { ids, code: value },
            {
                preserveState: false,
                replace: true,
                preserveScroll: true,
                onSuccess: () => {
                    setOpen(false);
                },
            },
        );
    }

    const debounceSearch = debounce((val: string) => handleSearch(val), 500);
    const debounceUpdateCode = debounce((id: number, val: string) => handleUpdateCode(id, val), 500);

    return (
        <LayoutRegion>
            <Modal isOpen={isOpen} onOpenChange={() => setOpen(!isOpen)} size="sm">
                <ModalContent>
                    <ModalHeader>Ubah Semua Kode</ModalHeader>
                    <ModalBody>
                        <CustomInput
                            label="Kode"
                            placeholder="Masukan Kode"
                            value={value}
                            onChange={(e) => {
                                setValue(e.target.value);
                            }}
                            description="Hal ini akan mengubah kode yang anda pilih"
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button variant="shadow" size="sm" onPress={() => setOpen(false)}>
                            Batal
                        </Button>
                        <Button color="primary" variant="shadow" size="sm" onPress={handleBulkUpdate}>
                            Ubah Kode{' '}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            <Card>
                <CardHeader className="flex justify-between gap-4">
                    <CustomInput
                        defaultValue={search || ''}
                        placeholder="Search"
                        size="sm"
                        endContent={<SearchIcon size={20} className="text-gray-400" />}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            debounceSearch(e.target.value);
                        }}
                        fullWidth
                    />
                    {Array.from(selectedKeys).length > 0 && (
                        <div className="flex gap-2">
                            <Button color="primary" size="sm" fullWidth onPress={() => setOpen(true)}>
                                Bulk Update
                            </Button>
                        </div>
                    )}
                </CardHeader>
                <CardBody>
                    <Table removeWrapper selectionMode="multiple" selectedKeys={selectedKeys} onSelectionChange={(val: any) => setSelectedKeys(val)}>
                        <TableHeader>
                            <TableColumn>Nama</TableColumn>
                            <TableColumn>Kode</TableColumn>
                            {/* <TableColumn> </TableColumn> */}
                        </TableHeader>
                        <TableBody>
                            {cities?.data.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>
                                        <CustomInput
                                            defaultValue={item.code}
                                            size="sm"
                                            onChange={(e) => debounceUpdateCode(item.id, e.target.value)}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardBody>
                <CardFooter className="flex justify-center">
                    <Pagination radius="full" initialPage={cities?.from} total={cities?.last_page} isCompact showControls onChange={setPage} />
                </CardFooter>
            </Card>
        </LayoutRegion>
    );
}
