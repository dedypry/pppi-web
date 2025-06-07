import Man from '@/assets/images/man.png';
import Woman from '@/assets/images/woman.png';
import AttachmentSingleFile from '@/components/attacment-singgle-file';
import CityList from '@/components/city';
import CustomDatePicker from '@/components/custom-date-picker';
import CustomInput from '@/components/custom-input';
import CustomSelect from '@/components/custom-select';
import DistrictList from '@/components/district';
import InputPhotoProfile from '@/components/input-photo-profile';
import ProvinceList from '@/components/province';
import { User } from '@/iterfaces/IUser';
import { Button, Card, CardBody, CardHeader, Divider, Image, Radio, RadioGroup, SelectItem, Textarea } from '@heroui/react';
import { useForm } from '@inertiajs/react';
import dayjs from 'dayjs';
import { useEffect } from 'react';

interface Props {
    sort: string;
    user: User;
}
export default function CreateMember({ sort, user }: Props) {
    const { data, setData, errors, post, reset, processing } = useForm({
        id: undefined as number | undefined,
        join_year: dayjs().format('YY'),
        type: 'redirect',
        sort: sort,
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
        hope_in: '',
        contribution: '',
        is_member_payment: '',
        reason_reject: '',
        photo: '' as any,
        member_payment_file: '' as any,
    });

    useEffect(() => {
        if (user) {
            setData('id', user.id);
            setData('nik', user.profile.nik);
            setData('name', user.name);
            setData('email', user.email);
            setData('place_birth', user.profile.place_birth);
            setData('date_birth', user.profile.date_birth || '');
            setData('gender', user.profile.gender);
            setData('citizenship', user.profile.citizenship);
            setData('province_id', user.profile.province_id);
            setData('city_id', user.profile.city_id);
            setData('district_id', user.profile.district_id);
            setData('phone', user.profile.phone);
            setData('last_education_nursing', user.profile.last_education_nursing);
            setData('last_education', user.profile.last_education.toUpperCase());
            setData('workplace', user.profile.workplace);
            setData('hope_in', user.profile.hope_in || '');
            setData('contribution', user.profile.contribution || '');
            setData('is_member_payment', user.profile.is_member_payment ? 'yes' : 'no');
            setData('reason_reject', user.profile.reason_reject || '');
            setData('photo', user.profile.photo);
            setData('member_payment_file', user.profile.member_payment_file);
            setData('address', user.profile.address);
            setData('sort', user.sort.toString());
            setData('join_year', user.join_year.toString());

        }
    }, [user]);
    const educations = ['D3', 'S1', 'NERS', 'S2', 'SPECIALIS', 'S3'];

    function handleSubmit(type = 'redirect') {
        setData('type', type);
        post(route('member.store'), {
            onSuccess: () => reset(),
        });
    }
    return (
        <div className="flex flex-col gap-4">
            <Card>
                <CardHeader className="flex items-center justify-between">
                    <p>Profile</p>
                    <div className="flex gap-2">
                        <CustomInput
                            label="Tahun Bergabung"
                            labelPlacement="outside-left"
                            value={data.join_year}
                            onChange={(e) => setData('join_year', e.target.value)}
                            size="sm"
                            type="number"
                        />
                        <CustomInput
                            label="No. Urut"
                            labelPlacement="outside-left"
                            value={data.sort}
                            onChange={(e) => setData('sort', e.target.value)}
                            size="sm"
                            type="number"
                        />
                    </div>
                </CardHeader>
                <CardBody className="flex flex-col gap-5">
                    <div className="grid grid-cols-12 gap-5">
                        <div className="col-span-12">
                            <InputPhotoProfile
                                photo={data.photo}
                                setPhoto={(val) => setData('photo', val)}
                                isInvalid={!!errors.photo}
                                errorMessage={errors.photo}
                            />
                            <Divider className="my-2" />
                        </div>
                        <div className="col-span-12 sm:col-span-6 md:col-span-4">
                            <CustomInput
                                value={data.nik}
                                onChange={(e) => setData('nik', e.target.value)}
                                isInvalid={!!errors.nik}
                                errorMessage={errors.nik}
                                isRequired
                                label="Nomor Induk KTP"
                                placeholder="NIK Anggota"
                            />
                        </div>
                        <div className="col-span-12 sm:col-span-6 md:col-span-4">
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
                        </div>
                        <div className="col-span-12 sm:col-span-6 md:col-span-4">
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
                        </div>
                        <div className="col-span-12 sm:col-span-6 md:col-span-8">
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
                        </div>
                        <div className="col-span-12 sm:col-span-6 md:col-span-4">
                            <CustomInput
                                isRequired
                                value={data.place_birth}
                                onChange={(e) => setData('place_birth', e.target.value)}
                                isInvalid={!!errors.place_birth}
                                errorMessage={errors.place_birth}
                                label="Tempat Lahir"
                                placeholder="Masukan Tempat Lahir"
                            />
                        </div>
                        <div className="col-span-12 sm:col-span-6 md:col-span-4">
                            <CustomDatePicker
                                isInvalid={!!errors.date_birth}
                                errorMessage={errors.date_birth}
                                time={data.date_birth}
                                isRequired
                                label="Tanggal Lahir"
                                setValue={(val: string) => setData('date_birth', val)}
                            />
                        </div>
                        <div className="col-span-12 sm:col-span-6 md:col-span-4">
                            <CustomSelect
                                isRequired
                                selectedKeys={[data.gender]}
                                onChange={(e) => setData('gender', e.target.value)}
                                isInvalid={!!errors.gender}
                                errorMessage={errors.gender}
                                label="Jenis Kelamin"
                                placeholder="Masukan Jenis Kelamin"
                            >
                                <SelectItem key="male" startContent={<Image src={Man} width={30} />}>
                                    Laki-laki
                                </SelectItem>
                                <SelectItem key="female" startContent={<Image src={Woman} width={30} />}>
                                    Perempuan
                                </SelectItem>
                            </CustomSelect>
                        </div>
                        <div className="col-span-12 sm:col-span-6 md:col-span-4">
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
                        </div>
                        <div className="col-span-12 sm:col-span-6 md:col-span-4">
                            <ProvinceList
                                isRequired
                                isInvalid={!!errors.province_id}
                                errorMessage={errors.province_id}
                                value={data.province_id?.toString()}
                                setValue={(val) => setData('province_id', val)}
                            />
                        </div>
                        <div className="col-span-12 sm:col-span-6 md:col-span-4">
                            <CityList
                                isRequired
                                isInvalid={!!errors.city_id}
                                errorMessage={errors.city_id}
                                provinceId={data.province_id}
                                value={data.city_id}
                                setValue={(val) => setData('city_id', val)}
                            />
                        </div>
                        <div className="col-span-12 sm:col-span-6 md:col-span-4">
                            <DistrictList
                                isRequired
                                isInvalid={!!errors.district_id}
                                errorMessage={errors.district_id}
                                cityId={data.city_id}
                                value={data.district_id}
                                setValue={(val) => setData('district_id', val)}
                            />
                        </div>
                        <div className="col-span-12">
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
                        </div>
                    </div>
                </CardBody>
            </Card>
            <Card>
                <CardHeader>Pendidikan dan Pekerjaan</CardHeader>
                <CardBody>
                    <div className="grid grid-cols-12 gap-5">
                        <div className="col-span-12 sm:col-span-6">
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
                        </div>
                        <div className="col-span-12 sm:col-span-6">
                            <CustomInput
                                value={data.last_education}
                                isInvalid={!!errors.last_education}
                                errorMessage={errors.last_education}
                                onChange={(e) => setData('last_education', e.target.value)}
                                label="Pendidikan Terakhir"
                                placeholder="Pendidikan Terakhir"
                                description="Pendidikan Terakhir selain Keperawatan (Formal)"
                            />
                        </div>
                        <div className="col-span-12 sm:col-span-6">
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
                        </div>
                        <div className="col-span-12 sm:col-span-6">
                            <CustomInput
                                value={data.contribution}
                                label="Kontribusi"
                                placeholder="Tuliskan Kontribusi"
                                description="Kontribusi yang diharapkan dapat diberikan untuk Organisasi (PPPI/P3I)"
                            />
                        </div>
                        <div className="col-span-12">
                            <Textarea
                                value={data.hope_in}
                                isInvalid={!!errors.hope_in}
                                errorMessage={errors.hope_in}
                                onChange={(e) => setData('hope_in', e.target.value)}
                                variant="bordered"
                                labelPlacement="outside"
                                label="Apa yang di Harapkan"
                                placeholder="Tuliskan Harapkan"
                                description="Kontribusi yang diharapkan dapat diberikan untuk Organisasi (PPPI/P3I)"
                            />
                        </div>
                        <div className="col-span-12">
                            <RadioGroup
                                value={data.is_member_payment}
                                isRequired
                                isInvalid={!!errors.is_member_payment}
                                errorMessage={errors.is_member_payment}
                                label="Kontribusi Keanggotaan sebesar Rp. 100.000,-(sebagai anggota baru)"
                                orientation="horizontal"
                                onValueChange={(val) => setData('is_member_payment', val)}
                            >
                                <Radio value="yes">Bersedia</Radio>
                                <Radio value="no">Tidak Bersedia</Radio>
                            </RadioGroup>
                        </div>
                    </div>
                </CardBody>
            </Card>

            {data.is_member_payment == 'yes' ? (
                <AttachmentSingleFile
                    file={data.member_payment_file}
                    setFile={(val) => setData('member_payment_file', val)}
                    label="Bukti Transfer"
                    description="Jika bersedia, dapat dikirimkan melalui BRI KCP Jatinegara No.Rek: 120601000397303 a.n Perkumpulan Perawat Pembaharuan Indonesia"
                />
            ) : (
                <Card>
                    <CardBody>
                        <Textarea
                            isRequired
                            isInvalid={!!errors.reason_reject}
                            errorMessage={errors.reason_reject}
                            label="Alasan Tidak Bersedia"
                            variant="bordered"
                            labelPlacement="outside"
                            placeholder="Masukan Alasan"
                            onChange={(e) => setData('reason_reject', e.target.value)}
                        />
                    </CardBody>
                </Card>
            )}

            <div className="flex justify-end gap-2">
                <Button variant="shadow">Batal</Button>
                <Button isLoading={processing} disabled={processing} color="primary" variant="shadow" onPress={() => handleSubmit('stay')}>
                    Simpan dan Lanjutkan Tambah Anggota Baru
                </Button>
                <Button
                    isLoading={processing}
                    disabled={processing}
                    className="bg-cyan-600 text-white"
                    variant="shadow"
                    onPress={() => handleSubmit()}
                >
                    Simpan
                </Button>
            </div>
        </div>
    );
}
