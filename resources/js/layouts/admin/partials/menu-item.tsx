import { Link } from '@inertiajs/react';

export default function MenuItem({ item, selected }: any) {
    return (
        <>
            <p className="mt-5 pb-1 text-sm text-gray-200">{item.header}</p>
            <ul className="flex flex-col">
                {item.children.map(({ icon: Icon, title, href }: any, j: number) => (
                    <Link href={href} key={j} className={`sidebar-item pl-2 ${selected === href ? 'bg-white text-gray-800' : 'text-white'}`}>
                        <Icon /> {title}
                    </Link>
                ))}
            </ul>
        </>
    );
}
