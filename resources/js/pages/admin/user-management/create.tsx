import CustomInput from '@/components/custom-input';
import CustomSelect from '@/components/custom-select';
import InputPassword from '@/components/input-password';
import { User } from '@/iterfaces/IUser';
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, SelectItem } from '@heroui/react';
import { useForm } from '@inertiajs/react';
import { useState } from 'react';

interface Props {
    superiors: User[];
}
export default function Create({ superiors }: Props) {
    const [isOpen, setOpen] = useState(false);
    const { data, setData } = useForm({
        name: '',
        email: '',
        parent_id: '',
        department_id: '',
        password: '',
    });
    return (
        <>
            <Modal isOpen={isOpen} onOpenChange={() => setOpen(!isOpen)}>
                <ModalContent>
                    <ModalHeader>Tambah Anggota</ModalHeader>
                    <ModalBody className="flex flex-col gap-4">
                        <CustomInput label="Nama" placeholder="Masukan Nama" value={data.name} onChange={(e) => setData('name', e.target.value)} />
                        <CustomInput
                            label="Email"
                            placeholder="Masukan Email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                        />
                        <CustomSelect label="Atasan" placeholder="Pilih Atasan" onChange={(e) => console.log(e.target.value)}>
                            {superiors.map((item) => (
                                <SelectItem key={item.id}>{item.name}</SelectItem>
                            ))}
                        </CustomSelect>
                        <CustomSelect label="Department" placeholder="Pilih Department" onChange={(e) => console.log(e.target.value)}>
                            {superiors.map((item) => (
                                <SelectItem key={item.id}>{item.name}</SelectItem>
                            ))}
                        </CustomSelect>
                        <InputPassword value={data.password} onChange={(e) => setData('password', e.target.value)} />
                    </ModalBody>
                    <ModalFooter>
                        <Button variant="bordered">Batal</Button>
                        <Button color="primary">Simpan</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Button color="primary" variant="shadow" size="sm" onPress={() => setOpen(true)}>
                Tambah User
            </Button>
        </>
    );
}
