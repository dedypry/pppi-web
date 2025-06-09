import { Avatar, Button } from '@heroui/react';
import { useEffect, useRef, useState } from 'react';

interface Props {
    photo: string;
    setPhoto: (val?: File) => void;
    isInvalid?: boolean;
    errorMessage?: string;
}
export default function InputPhotoProfile({ photo, setPhoto, isInvalid, errorMessage }: Props) {
    const [file, setFile] = useState<File>();
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (file) {
            setPhoto(file);
        }
    }, [file]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    function handleReset() {
        setFile(undefined);
        setPhoto(undefined);
    }
    return (
        <div className="flex items-center gap-5">
            <input type="file" accept="image/*" ref={fileInputRef} className="hidden" onChange={handleFileChange} />
            {/* <Image src={(file && URL.createObjectURL(file)) || photo || UserCircle} width={200} height={200} className="object-cover" /> */}
            <Avatar src={(file && URL.createObjectURL(file)) || photo}  isBordered className='w-32 h-32' />
            <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                    <Button size='sm' radius='full' variant="shadow" onPress={handleReset}>
                        Reset
                    </Button>
                    <Button size='sm' radius='full' color="primary" variant="shadow" onPress={() => fileInputRef.current?.click()}>
                        Upload Photo
                    </Button>
                </div>
                <p className={`${isInvalid && errorMessage ? 'text-danger' : 'text-gray-500'} text-xs italic`}>
                    Foto Terbaru Ukuran 4x6 dengan background warna merah (472 x 709 px) <span className="text-danger">*</span>
                    <br />
                    {isInvalid && errorMessage && <span className="italic">{errorMessage}</span>}
                </p>
            </div>
        </div>
    );
}
