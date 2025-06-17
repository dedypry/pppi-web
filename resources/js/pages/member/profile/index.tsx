import Gender from '@/components/gender';
import { SharedData } from '@/types';
import { Avatar, Button, Card } from '@heroui/react';
import { usePage } from '@inertiajs/react';
import { DownloadIcon, MapPinIcon } from 'lucide-react';

export default function MemberProfile() {
    const { auth } = usePage<SharedData>().props;
    return (
        <Card className="h-[220px] bg-white">
            <div className="relative h-[150px] w-full bg-gradient-to-br from-primary-600 to-cyan-600">
                <div className="absolute bottom-2 right-5">
                    <div className="flex items-center gap-2">
                        <Gender gender={auth.user.profile.gender} />
                        <p className="text-[20px] font-semibold text-white">
                            {auth.user.profile.front_title}. {auth.user.name}, {auth.user.profile.back_title}{' '}
                        </p>
                    </div>
                </div>
                <Avatar radius="sm" src={auth.user.profile.photo} isBordered color="success" className="absolute -bottom-14 left-5 h-24 w-24" />
            </div>
            <div className="flex items-center justify-between pl-32 pr-5 pt-3">
                <div className="flex items-center gap-1">
                    <MapPinIcon size={18} />
                    <p>{auth.user.profile.address}</p>
                </div>

                <div>
                    <Button variant="shadow" color="primary" startContent={<DownloadIcon />}>
                        Download KTA
                    </Button>
                </div>
            </div>
        </Card>
    );
}
