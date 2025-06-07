import CustomInput from '@/components/custom-input';
import http from '@/helpers/axios';
import { notify, notifyError } from '@/utils/helpers/notify';
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Switch } from '@heroui/react';
import { router } from '@inertiajs/react';
import { useState } from 'react';

export default function CreateCategory() {
    const [isOpen, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [isActive, setIsActive] = useState(true);

    function handleUpdate() {
        http.post(route('category.store'), { isActive, name })
            .then(({ data }) => {
                notify(data.message);
                router.reload();
                setOpen(false);
            })
            .catch((err) => notifyError(err));
    }
    return (
        <>
            <Modal isOpen={isOpen} onOpenChange={() => setOpen(!isOpen)}>
                <ModalContent>
                    <ModalHeader>Edit Kategori</ModalHeader>
                    <ModalBody>
                        <CustomInput value={name} placeholder='Masukan Nama Kategori' onChange={(e) => setName(e.target.value)} label="Nama Kategori" />
                        <Switch isSelected={isActive} onValueChange={setIsActive}>
                            {isActive ? 'Is Active' : 'Non Active'}
                        </Switch>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onPress={handleUpdate}>
                            Simpan
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Button variant="shadow" size="sm" color='primary' onPress={() => setOpen(true)}>
                Tambah Kategory
            </Button>
        </>
    );
}
