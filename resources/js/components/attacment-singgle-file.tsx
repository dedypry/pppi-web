import { Button, Card, CardBody, CardFooter, CardHeader, Image } from '@heroui/react';
import { TrashIcon, UploadIcon } from 'lucide-react';
import { useRef } from 'react';

interface Props {
    file: any;
    setFile: (val: any) => void;
    label?: string;
    emptyText?: string;
    description?: string;
    isInvalid?: boolean;
    errorMessage?: string;
}
export default function AttachmentSingleFile({ file, setFile, label, emptyText, description, isInvalid, errorMessage }: Props) {
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };
    return (
        <Card className='p-5 border'>
            <CardHeader className="flex flex-col items-start justify-start">
                {label && <p className={isInvalid ? "text-danger-500" : ""}>{label}</p>} { } {description && <p className={`text-sm italic ${isInvalid ? 'text-danger-400' : 'text-gray-400'}`}>{description}</p>} { }{' '}
            </CardHeader>

            <CardBody onClick={() => fileInputRef.current?.click()} className="hover:cursor-pointer">
                {file ? (
                    <>
                        <Image
                            src={file instanceof File ? URL.createObjectURL(file) : (file as string) || ''}
                            alt="Preview"
                            className="max-h-100 w-full rounded-md object-cover"
                        />
                        <div className="absolute right-3 top-0 z-10">
                            <Button className='bg-danger-500 text-white' variant='shadow' radius="full" isIconOnly size="sm" startContent={<TrashIcon size={20} />} onPress={() => setFile("")}></Button>
                        </div>
                    </>
                ) : (
                    <div className={`flex min-h-[200px] flex-col items-center justify-center gap-5 rounded-md border ${isInvalid ? 'border-danger' : ''}`}>
                        <UploadIcon className={`font-bold ${isInvalid ? 'text-danger' : ''}`} size={50} />
                        <p className={`text-center text-sm ${isInvalid ? 'text-danger-400' : 'text-gray-400'}`}>{emptyText || 'Upload File'}</p>
                    </div>
                )}
                <input type="file" accept="image/*" ref={fileInputRef} className="hidden" onChange={handleFileChange} />
            </CardBody>
            <CardFooter className='flex flex-col justify-start items-start'>
                {
                    errorMessage && <p className='text-xs text-danger'>{errorMessage}</p>
                }
                <p className={`italic text-xs ${isInvalid ? 'text-danger-400' :'text-gray-400'}`}>Max Upload File 2MB</p>
            </CardFooter>
        </Card>
    );
}
