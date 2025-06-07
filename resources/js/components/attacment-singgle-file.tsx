import { Button, Card, CardBody, CardFooter, CardHeader, Image } from '@heroui/react';
import { TrashIcon, UploadIcon } from 'lucide-react';
import { useRef } from 'react';

interface Props {
    file: any;
    setFile: (val: any) => void;
    label?: string;
    emptyText?: string;
    description?: string;
}
export default function AttachmentSingleFile({ file, setFile, label, emptyText, description }: Props) {
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };
    return (
        <Card>
            <CardHeader className='flex flex-col justify-start items-start'>
                {label && <p>{label}</p>} {}{' '}
                {description && <p className='text-gray-400 text-sm italic'>{description}</p>} {}{' '}
            </CardHeader>

            <CardBody onClick={() => fileInputRef.current?.click()} className="hover:cursor-pointer">
                {file ? (
                    <>
                        <Image
                            src={typeof file == 'string' ? file : URL.createObjectURL(file)}
                            alt="Preview"
                            className="max-h-100 w-full rounded-md object-cover"
                        />
                        <div className="absolute right-3 top-0">
                            <Button color="danger" radius="full" isIconOnly size="sm" startContent={<TrashIcon size={20} />}></Button>
                        </div>
                    </>
                ) : (
                    <div className="flex min-h-[200px] flex-col items-center justify-center gap-5 rounded-md border">
                        <UploadIcon className="font-bold" size={50} />
                        <p className="text-center text-sm text-gray-400">{emptyText || 'Upload File'}</p>
                    </div>
                )}
                <input type="file" accept="image/*" ref={fileInputRef} className="hidden" onChange={handleFileChange} />
            </CardBody>
            <CardFooter><p className='text-gray-400 italic'>Max Upload File 2MB</p></CardFooter>
        </Card>
    );
}
