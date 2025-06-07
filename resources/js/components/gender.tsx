import female from '@/assets/images/femenine.png';
import male from '@/assets/images/male.png';
import { Image } from '@heroui/react';

interface Props {
    gender: string;
}
export default function Gender({ gender }: Props) {
    return <Image src={gender === 'male' ? male : female} height={20} />;
}
