import { IApp } from '@/iterfaces/IApps';
import { navigate } from '@/navigate/navigations';
import { Link, router, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import MenuItem from './menu-item';

export default function SidebarMenu() {
    const { props } = usePage();
    const [selected, setSelected] = useState<string>(window.location.pathname);
    const apps: IApp = props.apps as any;

    useEffect(() => {
        const unlisten = router.on('navigate', (event) => {
            setSelected(new URL(event.detail.page.url, window.location.origin).pathname);
        });

        return () => {
            unlisten();
        };
    }, []);

    return (
        <div className="flex max-h-screen flex-col">
            <Link href='/' className="my-5 ml-5 flex items-center gap-2">
                <img src={apps?.logo || '/logo1.png'} alt="logo" className="h-[60px] object-cover" />
                <h1 className="text-[35px] font-bold text-white">{apps?.short_name?.toUpperCase()}</h1>
            </Link>

            <ul className="scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-primary-200 scrollbar-track-transparent flex-1 overflow-y-auto pb-10 pr-1">
                {navigate.map((item, i) => {
                    const IconParent: any = item.icon;
                    return (
                        <div key={i}>
                            {item.header ? (
                                <MenuItem item={item as any} selected={selected} />
                            ) : (
                                <Link
                                    href={item.href || ''}
                                    className={`sidebar-item ${selected === item.href ? 'bg-white text-gray-800' : 'text-white'}`}
                                >
                                    <IconParent /> {item.title}
                                </Link>
                            )}
                        </div>
                    );
                })}
            </ul>
        </div>
    );
}
