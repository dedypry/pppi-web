import Man from '@/assets/images/man.png';
import Woman from '@/assets/images/woman.png';
import CityList from '@/components/city';
import CustomDatePicker from '@/components/custom-date-picker';
import CustomInput from '@/components/custom-input';
import CustomSelect from '@/components/custom-select';
import DistrictList from '@/components/district';
import ProvinceList from '@/components/province';
import { User } from '@/iterfaces/IUser';
import { Avatar, Button, Card, CardBody, CardHeader, SelectItem, Tab, Tabs, Textarea } from '@heroui/react';
import { useForm } from '@inertiajs/react';
import { ShieldAlert, User2Icon } from 'lucide-react';
import { useEffect } from 'react';
import Password from './password';

interface Props {
    user: User;
}
export default function Content({ user }: Props) {
    const { data, setData, errors, post, processing } = useForm({
        front_title: '',
        back_title: '',
        nik: '',
        name: '',
        email: '',
        place_birth: '',
        date_birth: '',
        gender: '',
        citizenship: '',
        address: '',
        province_id: undefined as number | undefined,
        city_id: undefined as number | undefined,
        district_id: undefined as number | undefined,
        phone: '',
        last_education_nursing: '',
        last_education: '',
        workplace: '',
    });

    useEffect(() => {
        if (user) {
            setData('nik', user.profile?.nik);
            setData('front_title', user.profile?.front_title);
            setData('back_title', user.profile?.back_title);
            setData('name', user.name);
            setData('email', user.email);
            setData('place_birth', user.profile?.place_birth);
            setData('date_birth', user.profile?.date_birth || '');
            setData('gender', user.profile?.gender);
            setData('citizenship', user.profile?.citizenship);
            setData('province_id', user.profile?.province_id);
            setData('city_id', user.profile?.city_id);
            setData('district_id', user.profile?.district_id);
            setData('phone', user.profile?.phone);
            setData('last_education_nursing', user.profile?.last_education_nursing);
            setData('last_education', user.profile?.last_education?.toUpperCase());
            setData('workplace', user.profile?.workplace);
            setData('address', user.profile?.address);
        }
    }, [user]);
    const educations = ['D3', 'S1', 'NERS', 'S2', 'SPECIALIS', 'S3'];

    function handleSubmit(){
        post(route('profile.update'), {
            preserveState: true,
            preserveScroll: true,
            replace: true,
        });
    }
    return (
        <div className="relative">
            <Tabs>
                <Tab
                    key="Profile"
                    title={
                        <div className="flex space-x-2">
                            <User2Icon size={20} /> <span>Profile</span>
                        </div>
                    }
                >
                    <div className="flex flex-col gap-2">
                        <Card>
                            <CardBody className="flex flex-col gap-4">
                                <CustomInput
                                    value={data.front_title}
                                    onChange={(e) => setData('front_title', e.target.value)}
                                    isInvalid={!!errors.front_title}
                                    errorMessage={errors.front_title}
                                    label="Gelar Depan"
                                    placeholder="Ex: Dr, Br, Sr"
                                    description="Gelar Depan akan tampil di Kartu anggota"
                                />
                                <CustomInput
                                    value={data.back_title}
                                    onChange={(e) => setData('back_title', e.target.value)}
                                    isInvalid={!!errors.back_title}
                                    errorMessage={errors.back_title}
                                    label="Gelar Belakang"
                                    placeholder="contoh S.Kep, Ners ..."
                                    description="Gelar Belakang akan tampil di Kartu anggota"
                                />
                                <CustomInput
                                    isRequired
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    isInvalid={!!errors.name}
                                    errorMessage={errors.name}
                                    label="Nama Lengkap (tanpa gelar)"
                                    placeholder="Nama Anggota"
                                    description="gunakan huruf CAPITAL contoh:ANI"
                                />
                                <CustomInput
                                    value={data.nik}
                                    onChange={(e) => setData('nik', e.target.value)}
                                    isInvalid={!!errors.nik}
                                    errorMessage={errors.nik}
                                    isRequired
                                    label="Nomor Induk KTP"
                                    placeholder="NIK Anggota"
                                    description="NIK terdiri dari 16 digit angka"
                                />
                                <CustomInput
                                    isRequired
                                    value={data.phone}
                                    onChange={(e) => setData('phone', e.target.value)}
                                    isInvalid={!!errors.phone}
                                    errorMessage={errors.phone}
                                    label="No Telp/WA (Aktif)"
                                    placeholder="No Telp/WA Anggota"
                                    description="Pastikan No anda aktif"
                                />
                                <CustomInput
                                    isRequired
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    isInvalid={!!errors.email}
                                    errorMessage={errors.email}
                                    label="Email Anggota  (Aktif)"
                                    placeholder="Email Anggota"
                                    description="Pastikan email anda aktif, system akan mengirimkan pemberitahuan melalui email ini"
                                />
                                <CustomInput
                                    isRequired
                                    value={data.place_birth}
                                    onChange={(e) => setData('place_birth', e.target.value)}
                                    isInvalid={!!errors.place_birth}
                                    errorMessage={errors.place_birth}
                                    label="Tempat Lahir"
                                    placeholder="Masukan Tempat Lahir"
                                />
                                <CustomDatePicker
                                    isInvalid={!!errors.date_birth}
                                    errorMessage={errors.date_birth}
                                    time={data.date_birth}
                                    isRequired
                                    label="Tanggal Lahir"
                                    setValue={(val: string) => setData('date_birth', val)}
                                />
                                <CustomSelect
                                    isRequired
                                    selectedKeys={[data.gender]}
                                    onChange={(e) => setData('gender', e.target.value)}
                                    isInvalid={!!errors.gender}
                                    errorMessage={errors.gender}
                                    label="Jenis Kelamin"
                                    placeholder="Masukan Jenis Kelamin"
                                >
                                    <SelectItem key="male" startContent={<Avatar src={Man} isBordered size="sm" />}>
                                        Laki-laki
                                    </SelectItem>
                                    <SelectItem key="female" startContent={<Avatar src={Woman} isBordered size="sm" />}>
                                        Perempuan
                                    </SelectItem>
                                </CustomSelect>
                                <CustomSelect
                                    isRequired
                                    value={data.citizenship}
                                    selectedKeys={[data.citizenship]}
                                    onChange={(e) => setData('citizenship', e.target.value)}
                                    isInvalid={!!errors.citizenship}
                                    errorMessage={errors.citizenship}
                                    label="Kewarganegaraan"
                                    placeholder="Masukan Kewarganegaraan"
                                >
                                    <SelectItem key="wni">WNI (Warga Negara Indonesia) </SelectItem>
                                    <SelectItem key="wna">WNA (Warga Negara Asing) </SelectItem>
                                </CustomSelect>
                            </CardBody>
                        </Card>
                        <Card>
                            <CardHeader>Pendidikan</CardHeader>
                            <CardBody className="flex flex-col gap-4">
                                <CustomSelect
                                    selectedKeys={[data.last_education_nursing]}
                                    isRequired
                                    isInvalid={!!errors.last_education_nursing}
                                    errorMessage={errors.last_education_nursing}
                                    onChange={(e) => setData('last_education_nursing', e.target.value)}
                                    label="Pendidikan Terakhir Keperawatan"
                                    placeholder="Pilih Pendidikan Terakhir"
                                >
                                    {educations.map((item) => (
                                        <SelectItem key={item}>{item}</SelectItem>
                                    ))}
                                </CustomSelect>
                                <CustomInput
                                    value={data.last_education}
                                    isInvalid={!!errors.last_education}
                                    errorMessage={errors.last_education}
                                    onChange={(e) => setData('last_education', e.target.value)}
                                    label="Pendidikan Terakhir"
                                    placeholder="Pendidikan Terakhir"
                                    description="Pendidikan Terakhir selain Keperawatan (Formal)"
                                />
                                <CustomInput
                                    value={data.workplace}
                                    isRequired
                                    isInvalid={!!errors.workplace}
                                    errorMessage={errors.workplace}
                                    onChange={(e) => setData('workplace', e.target.value)}
                                    label="Tempat Bekerja"
                                    placeholder="Pendidikan Terakhir non perawat"
                                    description="Instansi/Institusi Tempat Bekerja (saat ini)"
                                />
                            </CardBody>
                        </Card>
                        <Card>
                            <CardHeader>Alamat</CardHeader>
                            <CardBody className="flex flex-col gap-4">
                                <ProvinceList
                                    isRequired
                                    isInvalid={!!errors.province_id}
                                    errorMessage={errors.province_id}
                                    value={data.province_id?.toString()}
                                    setValue={(val) => setData('province_id', val)}
                                />
                                <CityList
                                    isRequired
                                    isInvalid={!!errors.city_id}
                                    errorMessage={errors.city_id}
                                    provinceId={data.province_id}
                                    value={data.city_id}
                                    setValue={(val) => setData('city_id', val)}
                                />
                                <DistrictList
                                    isRequired
                                    isInvalid={!!errors.district_id}
                                    errorMessage={errors.district_id}
                                    cityId={data.city_id}
                                    value={data.district_id}
                                    setValue={(val) => setData('district_id', val)}
                                />
                                <Textarea
                                    value={data.address}
                                    isRequired
                                    isInvalid={!!errors.address}
                                    errorMessage={errors.address}
                                    onChange={(e) => setData('address', e.target.value)}
                                    label="Alamat"
                                    placeholder="Masukan Alamat Lengkap"
                                    labelPlacement="outside"
                                    variant="bordered"
                                    color="primary"
                                    classNames={{
                                        label: 'text-gray-800',
                                    }}
                                />
                            </CardBody>
                        </Card>
                        <Button variant="shadow" isLoading={processing} color="primary" onPress={handleSubmit}>
                            Simpan Perubahan
                        </Button>
                    </div>
                </Tab>
                <Tab
                    key="security"
                    title={
                        <div className="flex space-x-2">
                            <ShieldAlert size={20} /> <span>Keamanan</span>
                        </div>
                    }
                >
                    <Password />
                </Tab>
            </Tabs>
        </div>
    );
}
