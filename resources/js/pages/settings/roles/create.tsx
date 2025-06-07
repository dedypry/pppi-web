import CustomInput from '@/components/custom-input';
import { Autocomplete, AutocompleteItem, Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/react';
import { useForm } from '@inertiajs/react';
import { useState } from 'react';

interface Props{
    users:any
}
export default function CreateRole({users}:Props) {
    const [isOpen, setOpen] = useState(false);
    const { data, setData, post, processing, reset, errors } = useForm({
        name: '',
        userId: [] as string[],
    });

    function handleSubmit() {
        post(route('roles.store'), {
            onSuccess: () => {
                setOpen(false);
                reset()
            },
        });
    }

    function handleSelect(val: any) {
        if (!data.userId.includes(val)) {
            setData('userId', [...data.userId, val]);
        }
    }
    return (
        <>
            <Modal isOpen={isOpen} onOpenChange={() => setOpen(!isOpen)}>
                <ModalContent>
                    <ModalHeader>Tambah Role</ModalHeader>
                    <ModalBody>
                        <CustomInput
                            isRequired
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            label="Nama Role"
                            placeholder="Masukan Role"
                            isInvalid={!!errors.name}
                            errorMessage={errors.name}
                        />
                        <Autocomplete
                            items={users}
                            value={data.userId}
                            multiple
                            onSelectionChange={handleSelect}
                            variant="bordered"
                            label="User"
                            placeholder="Pilih User"
                            labelPlacement="outside"
                            isInvalid={!!errors.userId}
                            errorMessage={errors.userId}
                        >
                            {(item: any) => <AutocompleteItem key={item.id}>{item.name}</AutocompleteItem>}
                        </Autocomplete>
                    </ModalBody>
                    <ModalFooter>
                        <Button onPress={handleSubmit} isLoading={processing} disabled={processing} size="sm" color="primary" variant="shadow">
                            Simpan
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Button onPress={() => setOpen(true)} color="primary" size="sm" variant="shadow">
                Tambah Role
            </Button>
        </>
    );
}
