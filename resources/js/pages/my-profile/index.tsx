import Gender from '@/components/gender';
import { dateFormat } from '@/helpers/formater';
import { User } from '@/iterfaces/IUser';
import { Avatar, Button, Card, CardBody, CardHeader } from '@heroui/react';
import {
    Building2,
    CalendarCheck2Icon,
    FacebookIcon,
    FlagIcon,
    InstagramIcon,
    LandPlotIcon,
    LoaderIcon,
    MailIcon,
    MapPin,
    PhoneCallIcon,
    SlackIcon,
    Ticket,
    User2Icon,
} from 'lucide-react';

interface Props {
    user: User;
}

interface IListProfile {
    title: string;
    value: string;
    Icon: any;
}
const ListProfile = ({ title, value, Icon }: IListProfile) => (
    <div className="flex items-center gap-2">
        <Icon size={18} /> <span className="font-semibold">{title}</span> : {value}
    </div>
);
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
                    <Card>
                        <CardBody>
                            <div className="flex gap-2">
                                <p className="text-gray-500">Tentang</p>
                                <Gender gender={user.profile?.gender} />
                            </div>
                            <ul className="text-md mt-2 flex flex-col gap-2 text-gray-500">
                                <div className="flex flex-col gap-2">
                                    <ListProfile Icon={User2Icon} title="Nama" value={user.name} />
                                    <ListProfile Icon={SlackIcon} title="Roles" value={user.roles?.map((item) => item.name).join(', ')} />
                                    <ListProfile Icon={FlagIcon} title="Kewarganegaraan" value={user.profile?.citizenship} />
                                    <ListProfile Icon={LandPlotIcon} title="Provinsi" value={user.profile?.province.name} />
                                    <ListProfile Icon={FlagIcon} title="Kota" value={user.profile?.city.name} />
                                    <ListProfile Icon={LoaderIcon} title="Kabupaten" value={user.profile?.district.name} />
                                    <ListProfile Icon={MapPin} title="Alamat" value={user.profile?.address} />
                                </div>
                            </ul>
                            <p className="mt-8 text-gray-500">Kontak</p>
                            <ul className="text-md mt-2 flex flex-col gap-2 text-gray-500">
                                <div className="flex flex-col gap-2">
                                    <ListProfile Icon={PhoneCallIcon} title="Telp/wa" value={user.profile?.phone} />
                                    <ListProfile Icon={MailIcon} title="Email" value={user.email} />
                                </div>
                            </ul>

                            <p className="mt-8 text-gray-500">Sosial Media</p>
                            <ul className="text-md mt-2 flex flex-col gap-2 text-gray-500">
                                <div className="flex flex-col gap-2">
                                    <ListProfile Icon={FacebookIcon} title="Facebook" value={user.profile?.phone} />
                                    <ListProfile Icon={InstagramIcon} title="Instagram" value={user.email} />
                                    <ListProfile Icon={Ticket} title="Tik Tok" value={user.email} />
                                </div>
                            </ul>
                        </CardBody>
                    </Card>
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
