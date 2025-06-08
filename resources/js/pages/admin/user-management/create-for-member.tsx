import CustomInput from '@/components/custom-input';
import CustomSelect from '@/components/custom-select';
import { Department } from '@/iterfaces/IDepartment';
import { Role } from '@/iterfaces/IRoles';
import { User } from '@/iterfaces/IUser';
import { Avatar, Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, SelectItem } from '@heroui/react';
import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';

interface Props {
    superiors: User[];
    department: Department[];
    roles: Role[];
    isOpen: boolean;
    setOpen: CallableFunction;
    user?: User;
    members: User[];
}
export default function CreateForMember({ superiors, department, roles, isOpen, setOpen, user, members }: Props) {
    const { data, setData, errors, post, processing } = useForm({
        id: '',
        user_ids: [] as string[],
        job_title: '',
        parent_id: '',
        role_id: [] as string[],
        department_id: '',
    });

    useEffect(() => {
        if (user) {
            setData('id', String(user.id));
            setData('job_title', user.job_title);
            setData('parent_id', user.parent_id?.toString());
            setData(
                'role_id',
                user.roles.map((item) => item.id.toString()),
            );
            setData(
                'user_ids',
                members.map((item) => item.id.toString()),
            );
            setData('department_id', user.department_id?.toString());
        }
    }, [user]);
    return (
        <Modal isOpen={isOpen} onOpenChange={() => setOpen(!isOpen)}>
            <ModalContent>
                <ModalHeader>Tambah Anggota Dari Member</ModalHeader>
                <ModalBody className="flex flex-col gap-4">
                    <CustomSelect
                        selectionMode="multiple"
                        isInvalid={!!errors.user_ids}
                        errorMessage={errors.user_ids}
                        selectedKeys={new Set(data.user_ids.map(String))}
                        label="Anggota"
                        placeholder="Pilih Anggota"
                        onSelectionChange={(keys) => {
                            const stringKeys = Array.from(keys).map(String); // konversi ke string[]
                            setData('user_ids', stringKeys);
                        }}
                    >
                        {members.map((item) => (
                            <SelectItem key={item.id} startContent={<Avatar src={item.profile.photo} />}>
                                {`${item.name} - ${item.nia}`}
                            </SelectItem>
                        ))}
                    </CustomSelect>
                    <CustomInput
                        isInvalid={!!errors.job_title}
                        errorMessage={errors.job_title}
                        label="Tugas dan tanggung jawab"
                        placeholder="Masukan Tugas dan tanggung jawab"
                        value={data.job_title}
                        onChange={(e) => setData('job_title', e.target.value)}
                    />
                    <CustomSelect
                        isInvalid={!!errors.parent_id}
                        errorMessage={errors.parent_id}
                        selectedKeys={[data.parent_id]}
                        label="Atasan"
                        placeholder="Pilih Atasan"
                        onChange={(e) => setData('parent_id', e.target.value)}
                    >
                        {superiors
                            .filter((e) => e.id !== user?.id)
                            .map((item) => (
                                <SelectItem key={item.id}>{item.name}</SelectItem>
                            ))}
                    </CustomSelect>
                    <CustomSelect
                        selectedKeys={[data.department_id]}
                        isInvalid={!!errors.department_id}
                        errorMessage={errors.department_id}
                        label="Department"
                        placeholder="Pilih Department"
                        onChange={(e) => setData('department_id', e.target.value)}
                    >
                        {department.map((item) => (
                            <SelectItem key={item.id}>{item.name}</SelectItem>
                        ))}
                    </CustomSelect>
                    <CustomSelect
                        selectionMode="multiple"
                        isInvalid={!!errors.role_id}
                        errorMessage={errors.role_id}
                        selectedKeys={new Set(data.role_id.map(String))}
                        label="Role"
                        placeholder="Pilih Role"
                        onSelectionChange={(keys) => {
                            const stringKeys = Array.from(keys).map(String); // konversi ke string[]
                            setData('role_id', stringKeys);
                        }}
                    >
                        {roles.map((item) => (
                            <SelectItem key={item.id}>{item.name}</SelectItem>
                        ))}
                    </CustomSelect>
                </ModalBody>

                <ModalFooter>
                    <Button variant="bordered" onPress={() => setOpen(false)}>
                        Batal
                    </Button>
                    <Button
                        color="primary"
                        isLoading={processing}
                        onPress={() =>
                            post(route('user.management.member'), {
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
