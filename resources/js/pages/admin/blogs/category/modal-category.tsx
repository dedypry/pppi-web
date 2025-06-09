import CustomInput from '@/components/custom-input';
import CustomTextArea from '@/components/custom-textarea';
import UploadAvatar from '@/components/upload-avatar';
import http from '@/helpers/axios';
import { notify, notifyError } from '@/utils/helpers/notify';
import { Button, Divider, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Switch } from '@heroui/react';
import { router } from '@inertiajs/react';
import { useState } from 'react';

interface Props {
    isOpen: boolean;
    setOpen: CallableFunction;
    onSuccess?: CallableFunction;
}
export default function ModalCategory({ isOpen, setOpen, onSuccess }: Props) {
    const [name, setName] = useState('');
    const [isActive, setIsActive] = useState(true);
    const [file, setFile] = useState<any>();
    const [description, setDescription] = useState('');

    function handleUpdate() {
        http.post(
            route('category.store'),
            { isActive, name, icon: file, description },
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            },
        )
            .then(({ data }) => {
                notify(data.message);
                if (onSuccess) {
                    onSuccess(data);
                } else {
                    router.reload();
                }
                setOpen(false);
            })
            .catch((err) => notifyError(err));
    }
    return (
        <>
            <Modal isOpen={isOpen} onOpenChange={() => setOpen(!isOpen)}>
                <ModalContent>
                    <ModalHeader>Tambah Kategori</ModalHeader>
                    <ModalBody>
                        <UploadAvatar file={file} setFile={setFile} showButtonUpload label="Upload Icon" />
                        <Divider className="my-5" />
                        <CustomInput
                            value={name}
                            placeholder="Masukan Nama Kategori"
                            onChange={(e) => setName(e.target.value)}
                            label="Nama Kategori"
                        />
                        <CustomTextArea
                            label="Deskripsi"
                            placeholder="Masukan Deskripsi"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
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
        </>
    );
}
