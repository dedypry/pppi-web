import CustomInput from '@/components/custom-input';
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Textarea } from '@heroui/react';
import { useForm } from '@inertiajs/react';

interface Props {
    open: boolean;
    setOpen: CallableFunction;
}
export default function Create({ open, setOpen }: Props) {
    const { data, setData, post, errors, processing } = useForm({
        name: '',
        icon: '',
        description: '',
    });
    return (
        <Modal isOpen={open} onOpenChange={() => setOpen(!open)}>
            <ModalContent>
                <ModalHeader>Tambah Department</ModalHeader>
                <ModalBody>
                    <CustomInput
                        isRequired
                        isInvalid={!!errors.name}
                        errorMessage={errors.name}
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        label="Nama"
                        placeholder="Masukan Department"
                    />
                    <Textarea
                        variant="bordered"
                        labelPlacement="outside"
                        value={data.description}
                        onChange={(e) => setData('description', e.target.value)}
                        label="Deskripsi"
                        placeholder="Masukan Deskripsi"
                        color="primary"
                        classNames={{
                            label: 'text-gray-600',
                        }}
                    />
                </ModalBody>
                <ModalFooter>
                    <Button onPress={() => setOpen(false)}>Batal</Button>
                    <Button
                        isLoading={processing}
                        color="primary"
                        variant="shadow"
                        onPress={() =>
                            post(route('department.store'), {
                                onSuccess: () => {
                                    setOpen(false);
                                },
                            })
                        }
                    >
                        Simpan
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
