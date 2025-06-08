import CustomInput from '@/components/custom-input';
import { IResponseDistrict } from '@/iterfaces/IUser';
import debounce from '@/utils/helpers/debounce';
import { Card, CardBody, CardFooter, CardHeader, Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@heroui/react';
import { router } from '@inertiajs/react';
import { SearchIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import LayoutRegion from '../layout';
interface Props {
    district: IResponseDistrict;
}
export default function District({ district }: Props) {
    const [page, setPage] = useState(1);
    const queryParams = new URLSearchParams(window.location.search);
    const [search, setSearch] = useState(queryParams.get('search'));

    useEffect(() => {
        getData();
    }, [page]);

    function getData(dataSearch = '') {
        router.get(
            route('region.district'),
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
        router.get(route('region.district'), { search }, { preserveState: true, replace: true, preserveScroll: true });
    }

    const debounceSearch = debounce((val: string) => handleSearch(val), 500);

    return (
        <LayoutRegion>
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
                </CardHeader>
                <CardBody>
                    <Table removeWrapper>
                        <TableHeader>
                            <TableColumn>Kabupaten</TableColumn>
                            <TableColumn>Kota</TableColumn>
                            <TableColumn>Proinsi</TableColumn>
                        </TableHeader>
                        <TableBody>
                            {district?.data.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.city?.name}</TableCell>
                                    <TableCell>{item.city?.province?.name}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardBody>
                <CardFooter className="flex justify-center">
                    <Pagination radius="full" initialPage={district?.from} total={district?.last_page} isCompact showControls onChange={setPage} />
                </CardFooter>
            </Card>
        </LayoutRegion>
    );
}
