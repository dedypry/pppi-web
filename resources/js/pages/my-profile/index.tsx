import { dateFormat } from '@/helpers/formater';
import { User } from '@/iterfaces/IUser';
import { Avatar, Button, Card } from '@heroui/react';
import { router } from '@inertiajs/react';
import { Building2, CalendarCheck2Icon, EditIcon, MapPin } from 'lucide-react';
import { ChangeEvent, useRef } from 'react';
import Content from './components/content';
import LeftProfile from './components/left-profile';

interface Props {
    user: User;
}

export default function MyProfile({ user }: Props) {
    const ref = useRef<HTMLInputElement | null>(null);

    function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const form = new FormData();
            form.append('file', file);
            router.post(route('profile.update.photo'), form, {
                forceFormData: true,
            });
        }
    }
    return (
        <div className="flex flex-col gap-4">
            <Card>
                <div className="z-0 h-[300px] w-full bg-gradient-to-br from-primary to-cyan-400"></div>
                <div className="relative h-[100px] w-full px-5">
                    <div className="absolute -top-1/2 z-10">
                        <div className="group relative cursor-pointer">
                            <input type="file" accept="image/*" ref={ref} className="hidden" onChange={handleFileChange} />
                            <Avatar src={user.profile?.photo} isBordered radius="lg" className="h-32 w-32" onClick={() => ref.current?.click()} />
                            <div className="absolute bottom-1 right-1 hidden group-hover:block">
                                <Button isIconOnly variant="light" size="sm" radius="full" onPress={() => ref.current?.click()}>
                                    <EditIcon size={20} className="text-white" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between pl-40 pt-2">
                        <div className="flex flex-col gap-3">
                            <p className="text-[20px] font-semibold">{user.name}</p>
                            <div className="flex gap-2 text-gray-500">
                                <div className="flex gap-2">
                                    <Building2 size={20} /> <p className="text-sm">{user.department?.name || "Kesehatan"}</p>
                                </div>
                                <div className="flex gap-2">
                                    <MapPin size={20} /> <p className="text-sm">{user.profile?.address}</p>
                                </div>
                                <div className="flex gap-2">
                                    <CalendarCheck2Icon size={20} /> <p className="text-sm">Bergabung, {dateFormat(user.created_at)}</p>
                                </div>
                            </div>
                        </div>
                        {user.nia && (
                            <div>
                                <Button color="primary">Download CV</Button>
                            </div>
                        )}
                    </div>
                </div>
            </Card>

            <div className="grid grid-cols-12 gap-2">
                <div className="col-span-12 md:col-span-4">
                    <div className="sticky top-20">
                        <LeftProfile user={user} />
                    </div>
                </div>
                <div className="col-span-12 md:col-span-8">
                    <Content user={user} />
                </div>
            </div>
        </div>
    );
}
