import { dateFormat } from '@/helpers/formater';
import { User } from '@/iterfaces/IUser';
import { Avatar, Button, Card, CardBody, CardHeader } from '@heroui/react';
import { Building2, CalendarCheck2Icon, MapPin } from 'lucide-react';
import LeftProfile from './components/left-profile';

interface Props {
    user: User;
}

export default function MyProfile({ user }: Props) {
    return (
        <div className="flex flex-col gap-4">
            <Card>
                <div className="z-0 h-[300px] w-full bg-gradient-to-br from-primary to-cyan-400"></div>
                <div className="relative h-[100px] w-full px-5">
                    <Avatar src={user.profile?.photo} isBordered radius="lg" className="absolute -top-1/2 z-10 h-32 w-32" />

                    <div className="flex items-center justify-between pl-40 pt-2">
                        <div className="flex flex-col gap-3">
                            <p className="text-[20px] font-semibold">{user.name}</p>
                            <div className="flex gap-2 text-gray-500">
                                <div className="flex gap-2">
                                    <Building2 size={20} /> <p className="text-sm">{user.job_title}</p>
                                </div>
                                <div className="flex gap-2">
                                    <MapPin size={20} /> <p className="text-sm">{user.profile?.address}</p>
                                </div>
                                <div className="flex gap-2">
                                    <CalendarCheck2Icon size={20} /> <p className="text-sm">Bergabung, {dateFormat(user.created_at)}</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <Button color="primary">Download CV</Button>
                        </div>
                    </div>
                </div>
            </Card>

            <div className="grid grid-cols-12 gap-2">
                <div className="col-span-4">
                    <LeftProfile user={user} />
                </div>
                <div className="col-span-8">
                    <div className="flex flex-col gap-2">
                        <Card>
                            <CardHeader>Pendidikan</CardHeader>
                            <CardBody></CardBody>
                        </Card>
                        <Card>
                            <CardHeader>Pekerjaan</CardHeader>
                            <CardBody></CardBody>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
