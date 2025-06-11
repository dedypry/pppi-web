import { Blog, Category } from '@/iterfaces/IBlogs';
import { IPaginationResponse } from '@/iterfaces/IPagination';
import HeaderContent from '@/layouts/landing/header-content';
import { Avatar, Card, CardBody, CardFooter, CardHeader } from '@heroui/react';
import { Head, router } from '@inertiajs/react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import ContentRight from './content-right';

dayjs.extend(relativeTime);

interface Props {
    blogs: IPaginationResponse<Blog>;
    categories: Category[];
}
export default function Blogs({ blogs, categories }: Props) {
    return (
        <>
            <Head title="Blogs" />
            <HeaderContent title="Blogs PPPI" subtitle="Landasan arah dan komitmen PPPI dalam membangun masa depan keperawatan Indonesia." />
            <div className="container mx-auto flex flex-col gap-5 px-10">
                <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-12 md:col-span-9">
                        <div className="grid grid-cols-12 gap-3">
                            {blogs?.data.map((blog) => (
                                <div
                                    className="relative col-span-12 mt-10 md:col-span-6"
                                    key={blog.id}
                                    onClick={() => router.visit(route('blogs.detail', blog.id))}
                                >
                                    <Card radius="lg" className="cursor-pointer hover:bg-primary-50">
                                        <CardHeader className="h-[260px]">
                                            {/* <Image src={blog.cover} className="h-[300px] w-full object-cover" /> */}
                                        </CardHeader>
                                        <CardBody className="flex h-[130px] flex-col gap-3 px-5">
                                            <p className="text-[20px] font-semibold text-gray-600">{blog.title}</p>
                                            <p className="line-clamp-2 text-sm italic text-gray-400">{blog.subtitle}</p>
                                        </CardBody>
                                        <CardFooter className="flex gap-2 px-5">
                                            <Avatar src={blog.writer?.profile?.photo || '/avatar.PNG'} isBordered size="sm" />
                                            <p className="text-xs text-gray-600">
                                                {blog.writer.name} - {dayjs(blog.created_at).format('MMMM DD, YYYY')} -{' '}
                                                {dayjs(blog.created_at).fromNow()}
                                            </p>
                                        </CardFooter>
                                    </Card>
                                    <div className="absolute -top-10 px-5">
                                        <img src={blog.cover} alt="" className="h-[300px] w-full rounded-lg object-cover shadow-md" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="col-span-12 md:col-span-3">
                        <ContentRight categories={categories} />
                    </div>
                </div>
            </div>
        </>
    );
}
