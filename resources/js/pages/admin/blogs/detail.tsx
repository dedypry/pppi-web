/* eslint-disable @typescript-eslint/no-explicit-any */
import { dateFormat } from '@/helpers/formater';
import { Blog } from '@/iterfaces/IBlogs';
import { Chip, Image, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/react';
import { EyeIcon, MessageSquareTextIcon } from 'lucide-react';
interface Props {
    blog: Blog;
    isOpen: boolean;
    setOpen: CallableFunction;
}
export default function BlogDetail({ blog, isOpen, setOpen }: Props) {
    function getColorStatus(status){
        let color = "warning"

        switch (status) {
            case 'publish':
                color = 'success'
                break;

            case 'draft':
                color = 'default'
                break;

            case 'reject':
                color = 'danger'
                break;

            default:
                color = 'warning';
                break;
        }
        return color
    }
    return (
        <Modal isOpen={isOpen} onOpenChange={() => setOpen(!isOpen)} size="5xl" placement="bottom-center" backdrop="blur" scrollBehavior="inside">
            <ModalContent>
                <ModalHeader>Blog Detail</ModalHeader>

                <ModalBody>
                    <div className="flex flex-col text-center mb-5">
                        <p className="text-center text-3xl">{blog.title}</p>
                        <p className="font-normal">{blog.subtitle}</p>
                    </div>
                    <Image src={blog.cover} />
                    <div dangerouslySetInnerHTML={{ __html: blog.content }} className="mb-10" />
                    <p className="italic">Di Tulis pada tanggal : {dateFormat(blog.created_at)} </p>
                    <div className="flex items-center gap-5">
                        <p className="italic">Status :</p>
                        <Chip color={getColorStatus(blog.status) as any}>{blog.status.toUpperCase()}</Chip>{' '}
                    </div>
                </ModalBody>
                <ModalFooter className="flex justify-between">
                    <div>
                        <p className="italic">Penulis : {blog.writer.name} </p>
                    </div>
                    <div className="flex gap-5">
                        <div className="flex gap-2">
                            <EyeIcon /> View
                        </div>
                        <div className="flex gap-2">
                            <MessageSquareTextIcon /> Comment
                        </div>
                    </div>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
