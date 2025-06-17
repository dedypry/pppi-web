import Gender from '@/components/gender';
import TextHeader from '@/components/text-header';
import { dateFormat } from '@/helpers/formater';
import { User } from '@/iterfaces/IUser';
import { Avatar, Button, Card, CardBody, CardFooter, CardHeader, Chip, Image } from '@heroui/react';
import { DownloadIcon } from 'lucide-react';

interface Props {
    user: User;
}
export default function Detail({ user }: Props) {
    return (
        <div className="grid grid-cols-12 gap-5">
            <div className="col-span-12 md:col-span-4">
                <div className="flex flex-col gap-4">
                    <Card>
                        <CardBody className="flex flex-col items-center gap-4">
                            <Avatar
                                src={user.profile.photo}
                                className="h-28 w-28"
                                color={user.profile.gender == 'female' ? 'danger' : 'success'}
                                isBordered
                            />
                            <Chip color="success" className="text-white">
                                {user.nia}
                            </Chip>
                        </CardBody>
                        <CardBody className="flex flex-col gap-1">
                            <TextHeader title="NIK" val={user.profile.nik} />
                            <TextHeader title="Nama" val={user.name} rightIcon={<Gender gender={user.profile.gender} />} />
                            <TextHeader title="Email" val={user.email} />
                            <TextHeader title="Lahir" val={`${user.profile.place_birth}, ${dateFormat(user.profile.date_birth as string)}`} />
                            <TextHeader title="Telp" val={user.profile.phone} />
                        </CardBody>
                        <CardFooter className="flex justify-between">
                            <p className="text-[12px] text-gray-500">Join Year : {user.join_year}</p>
                            <p className="text-[12px] text-gray-500">Created At : {dateFormat(user.created_at)}</p>
                        </CardFooter>
                    </Card>
                    <Button
                        startContent={<DownloadIcon />}
                        fullWidth
                        className="bg-primary"
                        variant="shadow"
                        as="a"
                        href={route('member.kta', user.id)}
                    >
                        Download E-KTA
                    </Button>
                </div>
            </div>
            <div className="col-span-12 md:col-span-8">
                <div className="flex flex-col gap-3">
                    <Card>
                        <CardHeader>Deskripsi</CardHeader>
                        <CardBody className="flex flex-col gap-1">
                            <TextHeader title="Provinsi" val={user.profile.province.name} fontSize="13px" width={150} />
                            <TextHeader title="Kota" val={user.profile.city.name} fontSize="13px" width={150} />
                            <TextHeader title="Kabupaten" val={user.profile.district.name} fontSize="13px" width={150} />
                            <TextHeader title="Alamat" val={user.profile.address} fontSize="13px" width={150} />
                            <TextHeader title="Pendidikan" val={`${user.profile.last_education_nursing} Keperawatan`} fontSize="13px" width={150} />
                            <TextHeader title="Pendidikan Formal" val={user.profile.last_education} fontSize="13px" width={150} />
                            <TextHeader title="Tempat Kerja" val={user.profile.workplace} fontSize="13px" width={150} />
                            <TextHeader title="Harapan" val={user.profile.hope_in || ''} fontSize="13px" width={150} />
                            <TextHeader title="Kontribusi" val={user.profile.contribution || ''} fontSize="13px" width={150} />
                        </CardBody>
                    </Card>

                    <Card>
                        <CardHeader>File Attachment</CardHeader>
                        <CardBody>
                            <Image src={user.profile.member_payment_file} height={200} />
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    );
}
