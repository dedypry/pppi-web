import CustomInput from '@/components/custom-input';
import { type SharedData } from '@/types';
import { Card, CardBody, Tab, Tabs } from '@heroui/react';
import { useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';

type ProfileForm = {
    name: string;
    email: string;
};

export default function Profile({ mustVerifyEmail, status }: { mustVerifyEmail: boolean; status?: string }) {
    const { auth } = usePage<SharedData>().props;

    const { data, setData, patch, errors, processing, recentlySuccessful } = useForm<Required<ProfileForm>>({
        name: auth.user.name,
        email: auth.user.email,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route('profile.update'), {
            preserveScroll: true,
        });
    };

    return (
        <Tabs
            aria-label="Options"
            isVertical
            variant="light"
            classNames={{
                base: 'bg-white rounded-lg',
                tab: 'text-primary min-w-[200px] text-left',
                panel: 'w-full',
            }}
        >
            <Tab key="profile" title="Profile">
                <Card className="w-full">
                    <CardBody>
                        <div className="grid grid-cols-12 gap-2">
                            <div className="col-span-4">
                                <CustomInput label="Gelar Depan" placeholder="Masukan Gelar Depan" />
                            </div>
                            <div className="col-span-4">
                                <CustomInput
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    label="Nama"
                                    placeholder="Masukan Nama"
                                />
                            </div>
                            <div className="col-span-4">
                                <CustomInput label="Gelar Belakang" placeholder="Masukan Gelar Belakang" />
                            </div>
                            <div className="col-span-4">
                                <CustomInput label="Email" placeholder="Masukan Email" />
                            </div>
                            <div className="col-span-4">
                                <CustomInput label="No.Telp" placeholder="Masukan No.Telp" />
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </Tab>
            <Tab key="Keamanan" title="Keamanan">
                <Card className="w-full">
                    <CardBody>
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                        dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                    </CardBody>
                </Card>
            </Tab>

        </Tabs>
    );
}
