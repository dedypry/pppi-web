/* eslint-disable @typescript-eslint/no-explicit-any */
import CustomInput from '@/components/custom-input';
import http from '@/helpers/axios';
import { notifyError } from '@/utils/helpers/notify';
import { Autocomplete, AutocompleteItem, Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/react';
import { useEffect, useState } from 'react';

interface Props {
    value: any;
    setValue: CallableFunction;
    isInvalid: boolean;
    errorMessage?: string;
}
export default function AddCategory({ value, setValue, isInvalid, errorMessage }: Props) {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);

    useEffect(() => {
        getCategories();
    }, []);

    function handleSubmit() {
        http.post(route('category.store'), { name })
            .then(({ data }) => {
                setValue(data.data.id);
                setOpen(false);
                getCategories();
            })
            .catch((err) => notifyError(err));
    }

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
    return (
        <>
            <Modal isOpen={open} onOpenChange={() => setOpen(!open)}>
                <ModalContent>
                    <ModalHeader>Tambah Kategori Baru</ModalHeader>
                    <ModalBody>
                        <CustomInput label="Nama Kategori" placeholder="Masukan Nama Kategori" onChange={(e) => setName(e.target.value)} />
                    </ModalBody>
                    <ModalFooter>
                        <Button variant="shadow" color="primary" onPress={handleSubmit}>
                            Simpan
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Autocomplete
                isRequired
                label="Kategori"
                labelPlacement="outside"
                items={categories}
                variant="bordered"
                placeholder="Pilih Kategori"
                selectedKey={value}
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
