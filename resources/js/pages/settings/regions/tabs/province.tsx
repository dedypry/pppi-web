import CustomInput from '@/components/custom-input';
import { IResponseProvince } from '@/iterfaces/IUser';
import debounce from '@/utils/helpers/debounce';
import { Card, CardBody, CardFooter, CardHeader, Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@heroui/react';
import { router } from '@inertiajs/react';
import { SearchIcon } from 'lucide-react';
import LayoutRegion from '../layout';

interface Props {
    provinces: IResponseProvince;
}

export default function Province({ provinces }: Props) {

    function handleUpdateCode(id: number, code: string) {
        router.patch(
            route('province.update', id),
            { code },
            {
                preserveState: true,
                replace: true,
                preserveScroll: true,
            },
        );
    }

    function handleSearch(search:string){
        router.get(route('region.index'), { search }, { preserveState: true, replace: true, preserveScroll: true });
    }

    const debounceSearch = debounce((val: string) => handleSearch(val), 500);
    const debounceUpdateCode = debounce((id: number, val: string) => handleUpdateCode(id, val), 500);
    return (
        <LayoutRegion>
            <Card>
                <CardHeader className="flex justify-between">
                    <p>Province</p>
                    <div className="flex gap-2">
                        <CustomInput
                            placeholder="Search"
                            size="sm"
                            endContent={<SearchIcon size={20} className="text-gray-400" />}
                            onChange={(e) => debounceSearch(e.target.value)}
                        />
                        {/* <Button color="primary" size="sm">
                            Tambah
                        </Button> */}
                    </div>
                </CardHeader>
                <CardBody>
                    <Table removeWrapper>
                        <TableHeader>
                            <TableColumn>Nama</TableColumn>
                            <TableColumn>Kode</TableColumn>
                            {/* <TableColumn> </TableColumn> */}
                        </TableHeader>
                        <TableBody>
                            {provinces.data.map((item) => (
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
                    <Pagination
                        radius="full"
                        initialPage={provinces?.from}
                        total={provinces?.last_page}
                        isCompact
                        showControls
                        onChange={(page) =>
                            router.get(
                                route('region.index'),
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
        </LayoutRegion>
    );
}
