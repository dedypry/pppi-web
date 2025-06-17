import { Blog, Category } from '@/iterfaces/IBlogs';
import HeaderContent from '@/layouts/landing/header-content';
import { Avatar, Card, CardBody, CardFooter, CardHeader, Chip, Image } from '@heroui/react';
import { Head } from '@inertiajs/react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Comment from './comments';
import ContentRight from './content-right';

dayjs.extend(relativeTime);

interface Props {
    blog: Blog;
    categories: Category[];
    tags: string;
}
export default function Blogs({ blog, categories, tags }: Props) {
    console.log('BLOG', JSON.parse(blog.tags));
    function decodeHtml(html: string) {
        const txt = document.createElement('textarea');
        txt.innerHTML = html;
        return txt.value;
    }

    const blogTags = JSON.parse(blog.tags);
    return (
        <>
            <Head title={blog?.title} />
            <HeaderContent title={blog?.category?.name} subtitle={blog?.category?.description || ''} />
            <div className="container mx-auto flex flex-col gap-5 px-5 md:px-10">
                <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-12 md:col-span-9">
                        <Card className="p-2 md:p-3">
                            <CardHeader>
                                <Image src={blog?.cover} className="w-full object-cover" />
                            </CardHeader>
                            <CardBody>
                                {blogTags.map((e: string) => (
                                    <Chip className="bg-danger-300 text-white" size="sm">
                                        {e}
                                    </Chip>
                                ))}
                                <p className="my-2 text-[36px] font-bold">{blog?.title}</p>
                                <div className="flex items-center gap-2">
                                    <Avatar src={blog?.writer?.profile?.photo || '/avatar.PNG'} size="sm" isBordered />
                                    <p className="text-xs text-gray-800">
                                        {blog?.writer.name} - {dayjs(blog?.created_at).format('MMMM DD, YYYY')} - {dayjs(blog?.created_at).fromNow()}
                                    </p>
                                </div>
                            </CardBody>
                            <CardBody>
                                <p className="mb-5 text-sm italic text-gray-400">{blog?.subtitle}</p>
                                <div dangerouslySetInnerHTML={{ __html: decodeHtml(blog?.content) }}></div>
                            </CardBody>
                            <CardFooter>
                                <div className="flex gap-2">
                                    {JSON.parse(tags).map((tag: string) => (
                                        <Chip className="bg-primary-500 text-white" size="sm">
                                            {tag}
                                        </Chip>
                                    ))}
                                </div>
                            </CardFooter>
                        </Card>

                        <Comment blog={blog} />
                    </div>
                    <div className="col-span-12 md:col-span-3">
                        <ContentRight categories={categories} />
                    </div>
                </div>
            </div>
        </>
    );
}
