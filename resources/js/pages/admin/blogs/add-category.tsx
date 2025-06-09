/* eslint-disable @typescript-eslint/no-explicit-any */
import http from '@/helpers/axios';
import { notifyError } from '@/utils/helpers/notify';
import { Autocomplete, AutocompleteItem } from '@heroui/react';
import { useEffect, useState } from 'react';
import ModalCategory from './category/modal-category';

interface Props {
    value: any;
    setValue: CallableFunction;
    isInvalid: boolean;
    errorMessage?: string;
}
export default function AddCategory({ value, setValue, isInvalid, errorMessage }: Props) {
    const [open, setOpen] = useState(false);
    const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);

    useEffect(() => {
        getCategories();
    }, []);


    function getCategories() {
        http.get(route('category.create'))
            .then(({ data }) => {
                setCategories([
                    ...data,
                    {
                        id: 'new',
                        name: 'Buat Baru',
                    },
                ]);
            })
            .catch((err) => notifyError(err));
    }

    console.log("VAL", value)
    return (
        <>
            <ModalCategory
                isOpen={open}
                setOpen={setOpen}
                onSuccess={(data: any) => {
                    setValue(data.data.id);
                    setOpen(false);
                    getCategories();
                }}
            />
            <Autocomplete
                isRequired
                label="Kategori"
                labelPlacement="outside"
                items={categories}
                variant="bordered"
                placeholder="Pilih Kategori"
                selectedKey={value}
                inputValue={(categories.find((e:any)=> e.id == value) as any)?.name}
                onSelectionChange={(key) => {
                    if (key === 'new') {
                        setOpen(true);
                    } else {
                        setValue(key);
                    }
                }}
                isInvalid={isInvalid}
                errorMessage={errorMessage}
            >
                {(item: any) => <AutocompleteItem key={String(item.id)}>{item.name}</AutocompleteItem>}
            </Autocomplete>
        </>
    );
}
