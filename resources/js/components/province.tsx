import http from '@/helpers/axios';
import { notifyError } from '@/utils/helpers/notify';
import { Autocomplete, AutocompleteItem } from '@heroui/react';
import { useEffect, useState } from 'react';

interface Props {
    value: string | undefined;
    setValue: (val: any) => void;
    isRequired?: boolean;
    isInvalid?: boolean;
    errorMessage?: string;
}
export default function ProvinceList({ value, setValue, isRequired, isInvalid, errorMessage }: Props) {
    const [list, seList] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    function getData() {
        http.get(route('province'))
            .then(({ data }) => {
                seList(data.map((e: any) => ({ value: e.id, label: e.name })));
            })
            .catch((err) => notifyError(err));
    }


    return (
        <Autocomplete
            selectedKey={value}
            isRequired={isRequired}
            isInvalid={isInvalid}
            errorMessage={errorMessage}
            inputValue={(list.find((e: any) => e.id == value) as any)?.name}
            defaultItems={list}
            label="Provinsi"
            placeholder="Pilih Provinsi"
            variant="bordered"
            labelPlacement="outside"
            onSelectionChange={setValue}
        >
            {(item: any) => (
                <AutocompleteItem key={item.value} textValue={item.label} className="capitalize">
                    {item.label}
                </AutocompleteItem>
            )}
        </Autocomplete>
    );
}
