import { dateSchedule } from '@/helpers/formater';
import { Blog } from '@/iterfaces/IBlogs';
import { IPaginationResponse } from '@/iterfaces/IPagination';
import { Button, Card, Image } from '@heroui/react';
import { router } from '@inertiajs/react';

interface Props {
    blogs: IPaginationResponse<Blog>;
}
export default function ListBlogs({ blogs }: Props) {
    return (
        <div className="flex flex-col gap-5 md:gap-2">
            {blogs?.data?.map((blog) => (
                <div onClick={() => router.visit(route('blogs.detail', blog.id))}>
                    <Card key={blog.id} className="flex cursor-pointer flex-col hover:bg-primary-50 md:flex-row">
                        <Image src={blog.cover} className="h-[200px] w-auto object-cover md:h-[150px] md:w-[200px]" />
                        <div className="flex flex-1 flex-col justify-between px-5 py-5">
                            <div className="">
                                <p className="text-[20px] font-semibold">{blog.title}</p>
                                <p>{blog.subtitle}</p>
                            </div>
                            <div className="flex items-end justify-between pt-10 md:pt-0">
                                <Button
                                    className="bg-primary-200 text-white shadow-md shadow-cyan-100"
                                    size="sm"
                                    radius="full"
                                    onPress={() => router.visit(route('blogs.detail', blog.id))}
                                >
                                    Selengkapnya
                                </Button>
                                <p className="text-right text-sm italic text-gray-400">{dateSchedule(blog.created_at)} WIB</p>
                            </div>
                        </div>
                    </Card>
                </div>
            ))}

            {blogs?.total > 10 && (
                <div className="my-5 flex justify-end">
                    <Button radius="full" color="primary" size="sm">
                        Lihat berita PPPI lebih banyak
                    </Button>
                </div>
            )}
        </div>
    );
}
