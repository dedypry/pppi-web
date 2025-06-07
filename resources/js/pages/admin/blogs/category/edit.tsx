import CustomInput from '@/components/custom-input';
import http from '@/helpers/axios';
import { Category } from '@/iterfaces/IBlogs';
import { notify, notifyError } from '@/utils/helpers/notify';
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Switch } from '@heroui/react';
import { router } from '@inertiajs/react';
import { EditIcon } from 'lucide-react';
import { useState } from 'react';

interface Props {
    category: Category;
}
export default function Edit({ category }: Props) {
    const [isOpen, setOpen] = useState(false);
    const [name, setName] = useState(category.name);
    const [isActive, setIsActive] = useState(category.is_active);

    function handleUpdate() {
        http.patch(route('category.update', category.id), { isActive, name })
            .then(({ data }) => {
                notify(data.message);
                router.reload();
                setOpen(false)
            })
            .catch((err) => notifyError(err));
    }
    return (
        <>
            <Modal isOpen={isOpen} onOpenChange={() => setOpen(!isOpen)}>
                <ModalContent>
                    <ModalHeader>Edit Kategori</ModalHeader>
                    <ModalBody>
                        <CustomInput value={name} onChange={(e) => setName(e.target.value)} label="Nama Kategori" />
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
            <Button isIconOnly radius="full" variant="light" size="sm" onPress={() => setOpen(true)}>
                <EditIcon size={20} className="text-warning" />
            </Button>
        </>
    );
}
