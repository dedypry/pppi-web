import http from '@/helpers/axios';
import { notifyError } from '@/utils/helpers/notify';
import { Autocomplete, AutocompleteItem } from '@heroui/react';
import { useEffect, useState } from 'react';

interface Props {
    value: number | undefined;
    provinceId: number | undefined;
    setValue: (val: any) => void;
    isRequired?: boolean;
    isInvalid?: boolean;
    errorMessage?: string;
}
export default function CityList({ value, setValue, provinceId, isRequired, isInvalid, errorMessage }: Props) {
    const [list, seList] = useState([]);

    useEffect(() => {
        getData();
    }, [provinceId]);

    function getData() {
        if (provinceId) {
            http.get(route('city', provinceId))
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
            label="Kota"
            placeholder="Pilih Kota"
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
