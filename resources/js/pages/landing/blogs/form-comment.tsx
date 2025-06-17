import { SharedData } from '@/types';
import { Button, Input, Textarea } from '@heroui/react';
import { useForm, usePage } from '@inertiajs/react';
import { useEffect } from 'react';

interface Props {
    onComment: (post: (url: string, options?: any) => void, reset: () => void) => void;
}
export default function FormComment({ onComment }: Props) {
    const { auth } = usePage<SharedData>().props;
    const { data, setData, errors, post, reset, processing } = useForm({
        content: '',
        name: '',
        email: '',
        website: '',
    });

    useEffect(() => {
        if (auth.user) {
            setData('email', auth.user.email);
            setData('name', auth.user.name);
        }
    }, [auth]);
    return (
        <div className='flex flex-col gap-5'>
            <div className="grid grid-cols-12 gap-5">
                <div className="col-span-12">
                    <Textarea
                        isInvalid={!!errors.content}
                        errorMessage={errors.content}
                        value={data.content}
                        onChange={(e) => setData('content', e.target.value)}
                        label="Comentar"
                        isRequired
                        placeholder="berikan komentar terbaik anda"
                    />
                </div>
                {!auth.user && (
                    <>
                        <div className="col-span-6">
                            <Input
                                isInvalid={!!errors.name}
                                errorMessage={errors.name}
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                label="Nama"
                                isRequired
                                placeholder="masukan nama samaran atau nama asli"
                            />
                        </div>
                        <div className="col-span-6">
                            <Input
                                isInvalid={!!errors.email}
                                errorMessage={errors.email}
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                label="Email"
                                isRequired
                                placeholder="Masukan Email Aktif"
                            />
                        </div>
                        <div className="col-span-12">
                            <Input
                                isInvalid={!!errors.website}
                                errorMessage={errors.website}
                                value={data.website}
                                onChange={(e) => setData('website', e.target.value)}
                                label="Website"
                                placeholder="isi jika anda punya"
                            />
                        </div>
                    </>
                )}
            </div>
            <div className="flex justify-end">
                <Button isLoading={processing} size="sm" variant="bordered" color="primary" radius="full" onPress={() => onComment(post, reset)}>
                    Simpan Komentar
                </Button>
            </div>
        </div>
    );
}
