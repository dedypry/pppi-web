import UserCircle from '@/assets/images/user.jpg';
import { Button, Image } from '@heroui/react';
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
        <div className="flex items-center gap-10">
            <input type="file" accept="image/*" ref={fileInputRef} className="hidden" onChange={handleFileChange} />
            <Image src={(file && URL.createObjectURL(file)) || photo || UserCircle} width={200} height={200} className="object-cover" />
            <div className="flex flex-col gap-5">
                <div className="flex gap-2">
                    <Button variant="shadow" onPress={handleReset}>
                        Reset
                    </Button>
                    <Button color="primary" variant="shadow" onPress={() => fileInputRef.current?.click()}>
                        Upload Photo
                    </Button>
                </div>
                <p className={isInvalid && errorMessage ? 'text-danger' : ''}>
                    Foto Terbaru Ukuran 4x6 dengan background warna merah (472 x 709 px) <span className="text-danger">*</span>
                    <br />
                    {isInvalid && errorMessage && <span className="italic">{errorMessage}</span>}
                </p>
            </div>
        </div>
    );
}
