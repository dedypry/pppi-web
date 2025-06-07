import http from '@/helpers/axios';
import { notifyError } from '@/utils/helpers/notify';
import { Autocomplete, AutocompleteItem } from '@heroui/react';
import { useEffect, useState } from 'react';

interface Props {
    value: number | undefined;
    cityId: number | undefined;
    setValue: (val: any) => void;
    isRequired?: boolean;
    isInvalid?: boolean;
    errorMessage?: string;
}
export default function DistrictList({ value, setValue, cityId, isRequired, isInvalid, errorMessage }: Props) {
    const [list, seList] = useState([]);

    useEffect(() => {
        getData();
    }, [cityId]);

    function getData() {
        if (cityId) {
            http.get(route('district', cityId))
                .then(({ data }) => {
                    seList(data);
                })
                .catch((err) => notifyError(err));
        } else {
            seList([]);
        }
    }
    return (
        <Autocomplete
            isRequired={isRequired}
            isInvalid={isInvalid}
            errorMessage={errorMessage}
            defaultItems={list}
            selectedKey={value}
            inputValue={(list.find((e: any) => e.id == value) as any)?.name}
            label="Kecamatan"
            placeholder="Pilih Kecamatan"
            variant="bordered"
            labelPlacement="outside"
            onSelectionChange={setValue}
        >
            {(item: any) => (
                <AutocompleteItem key={item.id} className="capitalize">
                    {item.name}
                </AutocompleteItem>
            )}
        </Autocomplete>
    );
}
