import CustomInput from '@/components/custom-input';
import { Role } from '@/iterfaces/IRoles';
import { Autocomplete, AutocompleteItem, Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/react';
import { useForm } from '@inertiajs/react';
import { EditIcon } from 'lucide-react';
import { useState } from 'react';

interface Props {
    users: any;
    role: Role;
}
export default function EditRole({ role, users }: Props) {
    const [isOpen, setOpen] = useState(false);
    const { data, setData, patch, processing, reset } = useForm({
        name: role.name,
        userId: [] as string[],
    });

    function handleSubmit() {
        patch(route('roles.update', role.id), {
            onSuccess: () => {
                setOpen(false);
                reset();
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
            <Button isIconOnly radius="full" variant="light" size="sm" onPress={() => setOpen(true)}>
                <EditIcon className="text-warning" />
            </Button>
        </>
    );
}
