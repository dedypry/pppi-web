import CustomDatePicker from '@/components/custom-date-picker';
import CustomInput from '@/components/custom-input';
import InputTags from '@/components/input-tags';
import QuillJS from '@/components/quill-js';
import { Blog } from '@/iterfaces/IBlogs';
import { Button, Card, CardBody, CardFooter, CardHeader, Switch } from '@heroui/react';
import { useForm } from '@inertiajs/react';
import { getLocalTimeZone, today } from '@internationalized/date';
import { useEffect, useRef, useState } from 'react';
import AddCategory from './add-category';

interface Props {
    blog: Blog;
}
export default function Create({ blog }: Props) {
    const { data, setData, post, errors, processing } = useForm({
        id: null as number | null,
        cover: '' as any,
        title: '',
        subtitle: '',
        content: '',
        tags: [] as string[],
        status: '',
        isDraft: false as boolean,
        categoryId: 1,
        schedule: today(getLocalTimeZone()).subtract({ days: 1 }) as any,
    });

    useEffect(() => {
        if (blog) {
            setData('id', blog.id);
            setData('title', blog.title)
            setData('subtitle', blog.subtitle)
            setData('content', blog.content)
            setData('tags', JSON.parse(blog.tags));
            setData('status', blog.status)
            setData('isDraft', blog.status==='draft')
            setData('categoryId', blog.category_id)
        }
    }, [blog]);

    const [file, setFile] = useState<File>();
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        setData('cover', file || blog?.cover);
    }, [file]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    function handleSubmit() {
        post(route('blogs.store'), {
            forceFormData: true,
        });
    }

    return (
        <div className="grid grid-cols-12">
            <div className="col-span-8 space-y-5">
                <Card>
                    <CardHeader>Cover</CardHeader>
                    <CardBody onClick={() => fileInputRef.current?.click()} className="hover:cursor-pointer">
                        {(file || blog?.cover) ? (
                            <>
                                <img src={file ? URL.createObjectURL(file) : blog?.cover} alt="Preview" className="max-h-64 w-full rounded-md object-cover" />
                                <div className="absolute right-3 top-0">
                                    <Button color="danger" size="sm">
                                        Hapus Cover
                                    </Button>
                                </div>
                            </>
                        ) : (
                            <p className="text-center text-sm text-gray-400">Klik untuk upload cover</p>
                        )}
                        <input type="file" accept="image/*" ref={fileInputRef} className="hidden" onChange={handleFileChange} />
                    </CardBody>
                </Card>

                <Card>
                    <CardHeader>Blog</CardHeader>
                    <CardBody className="flex flex-col gap-4">
                        <CustomInput
                            isRequired
                            label="Judul"
                            placeholder="Masukan Judul"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            isInvalid={!!errors.title}
                            errorMessage={errors.title}
                        />
                        <CustomInput
                            label="Subtitle"
                            placeholder="Masukan Sub Judul"
                            value={data.subtitle}
                            onChange={(e) => setData('subtitle', e.target.value)}
                            isInvalid={!!errors.subtitle}
                            errorMessage={errors.subtitle}
                        />
                        <div>
                            <p className="mb-1 text-sm">Content</p>
                            <QuillJS value={data.content} onContent={(val) => setData('content', val)} />
                            {errors.content && <p className="text-danger">{errors.content}</p>}
                        </div>
                    </CardBody>
                </Card>
            </div>
            <div className="col-span-4 pl-3">
                <Card className="sticky top-16">
                    <CardBody className="flex flex-col gap-4">
                        <Switch isSelected={data.isDraft} onValueChange={(val) => setData('isDraft', val)}>
                            Save To Draft
                        </Switch>
                        <AddCategory
                            value={data.categoryId}
                            setValue={(val: number) => setData('categoryId', val)}
                            isInvalid={!!errors.subtitle}
                            errorMessage={errors.subtitle}
                        />
                        <InputTags
                            label="Tags"
                            isRequired
                            placeholder="Input Tags"
                            items={data.tags}
                            onTags={(val: string[]) => setData('tags', val)}
                            isInvalid={!!errors.tags}
                            errorMessage={errors.tags}
                        />

                        <CustomDatePicker time={data.schedule} setValue={(val: string) => setData('schedule', val)} />
                    </CardBody>
                    <CardFooter>
                        <Button isLoading={processing} disabled={processing} color="primary" fullWidth onPress={handleSubmit}>
                            Simpan Blog
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
