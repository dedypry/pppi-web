import { ReactNode } from 'react';

interface Props {
    children?: ReactNode;
    title?: string;
    subtitle?: string;
}
export default function HeaderContent({ children, title, subtitle }: Props) {
    return (
        <div className={`-mt-[60px] mb-10 shadow-lg h-[200px] flex w-full items-end pb-5 bg-gradient-to-b from-primary-900 to-primary-700`}>
            {children}
            <div className="container mx-auto flex flex-col gap-2">
                <p className="text-white text-[40px] font-bold">{title}</p>
                <p className="text-gray-100 italic">{subtitle}</p>
            </div>
        </div>
    );
}
