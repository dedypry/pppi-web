/* eslint-disable react-hooks/exhaustive-deps */
import DropZone from '@/components/drop-zone';
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/react';
import { useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function AddBanner() {
    const [files, setFiles] = useState<File[]>([]);
    const { setData, post, processing, reset } = useForm({
        images: [] as File[],
    });
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setData('images', files);
    }, [files]);

    function handleSubmit() {
        post(route('banners.store'), {
            forceFormData: true,
            onSuccess: () => {
                reset('images');
                setFiles([]);
                setIsOpen(false);
            },
        });
    }

    return (
        <>
            <Modal isOpen={isOpen} onOpenChange={() => setIsOpen(!isOpen)} size="5xl">
                <ModalContent>
                    <ModalHeader>Tambah banner Baru</ModalHeader>
                    <ModalBody>
                        <DropZone files={files} setFiles={setFiles} />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="light" onPress={() => setIsOpen(false)}>
                            Close
                        </Button>
                        <Button color="primary" onPress={handleSubmit} isLoading={processing} disabled={processing}>
                            Simpan
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Button color="primary" onPress={() => setIsOpen(true)}>
                Tambah Banner
            </Button>
        </>
    );
}
