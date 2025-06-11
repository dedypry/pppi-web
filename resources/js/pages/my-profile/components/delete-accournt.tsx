import InputPassword from '@/components/input-password';
import { Alert, Button, Card, CardBody, Checkbox, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/react';
import { useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function DeleteAccount() {
    const [confirm, setConfirm] = useState(false);
    const [open, setOpen] = useState(false);
    const {
        data,
        setData,
        delete: destroy,
    } = useForm({
        password: '',
    });

    function handleDelete() {
        destroy(route('profile.destroy'));
    }
    return (
        <>
            <Modal isOpen={open} onOpenChange={() => setOpen(!open)}>
                <ModalContent>
                    <ModalHeader>Hapus Akun</ModalHeader>
                    <ModalBody>
                        <InputPassword value={data.password} onChange={(e) => setData('password', e.target.value)} />
                    </ModalBody>
                    <ModalFooter>
                        <Button onPress={() => setOpen(false)}>Batal</Button>
                        <Button color="danger" onPress={handleDelete}>
                            Hapus Akun
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Card>
                <CardBody className="flex flex-col gap-5">
                    <Alert color="warning" title="Are you sure you want to delete your account?">
                        <p className="text-xs italic">Once you delete your account, there is no going back. Please be certain.</p>
                    </Alert>
                    <Checkbox isSelected={confirm} onValueChange={setConfirm}>
                        <p className="text-xs">I confirm my account deactivation</p>
                    </Checkbox>
                    <div>
                        <Button
                            disabled={!confirm}
                            className={`mt-2 ${confirm ? 'bg-danger-600' : 'bg-danger-300'}`}
                            variant="shadow"
                            color="danger"
                            onPress={() => setOpen(true)}
                        >
                            Hapus Akun
                        </Button>
                    </div>
                </CardBody>
            </Card>
        </>
    );
}
