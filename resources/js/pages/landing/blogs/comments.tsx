import { Blog } from '@/iterfaces/IBlogs';
import { Avatar, Button, Card, CardBody, CardFooter, CardHeader, Divider, Input, Textarea } from '@heroui/react';
import { useForm } from '@inertiajs/react';
import dayjs from 'dayjs';
import { ReplyIcon } from 'lucide-react';

interface Props {
    blog: Blog;
}
export default function Comment({ blog }: Props) {
    const { data, setData, errors, post, reset, processing } = useForm({
        content: '',
        name: '',
        email: '',
        website: '',
    });

    return (
        <Card className="mt-5 p-3">
            <CardHeader>
                <p className="text-[20px] font-bold"> {blog?.comments.length} Comment</p>
            </CardHeader>
            <CardBody>
                {blog?.comments?.map((comment) => (
                    <div className="flex flex-col gap-2" key={comment.id}>
                        <div className="flex gap-5">
                            <div>
                                <Avatar size="lg" isBordered src={comment?.user?.profile?.photo} />
                            </div>
                            <div>
                                <p className="text-md font-semibold">{comment.name} {dayjs(comment.created_at).format('MMMM, DD YYYY')}</p>
                                <p className="mt-1 text-sm text-gray-500">
                                    {comment.content}
                                </p>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <Button size="sm" color="primary" variant="bordered" radius="full" startContent={<ReplyIcon />}>
                                Balas Comment
                            </Button>
                        </div>
                    </div>
                ))}

                <Divider className="my-5" />

                <CardHeader className="flex flex-col items-start">
                    <p className="text-[20px] font-bold">Tinggalkan Comentar</p>
                    <p className="text-sm italic text-gray-400">
                        Alamat email Anda tidak akan dipublikasikan. Kolom yang wajib diisi ditandai dengan tanda
                    </p>
                </CardHeader>
                <CardBody>
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
                    </div>
                </CardBody>
                <CardFooter className="flex justify-end">
                    <Button
                        isLoading={processing}
                        size="sm"
                        variant="bordered"
                        color="primary"
                        radius="full"
                        onPress={() =>
                            post(route('blogs.comment', blog.id), {
                                preserveState: true,
                                replace: true,
                                preserveScroll: true,
                                onSuccess: () => reset(),
                            })
                        }
                    >
                        Simpan Komentar
                    </Button>
                </CardFooter>
            </CardBody>
        </Card>
    );
}
