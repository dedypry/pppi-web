import { navigate } from '@/navigate/navigations';
import { Listbox, ListboxItem, ListboxSection } from '@heroui/react';
import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function SidebarMenu() {
    const [selected, setSelected] = useState<string>(window.location.pathname);
    useEffect(() => {
        const unlisten = router.on('navigate', (event) => {
            setSelected(new URL(event.detail.page.url, window.location.origin).pathname);
        });

        return () => {
            unlisten();
        };
    }, []);

    return (
        <div>
            <div className="my-5 ml-5 flex items-center gap-2">
                <img src="/logo1.png" alt="logo" className="h-[60px] object-cover" />
                <h1 className="text-[35px] font-bold text-white">PPPI</h1>
            </div>
            <Listbox
                className="text-white"
                variant="solid"
                itemClasses={{
                    base: 'data-[hover=true]:bg-white data-[hover=true]:text-gray-700',
                }}
            >
                {navigate.map((item, i) => {
                    if (item.header) {
                        return (
                            <ListboxSection title={item.header.toUpperCase()} className={i != 0 ? 'mt-2' : ''}>
                                {item.children.map(({ title, href, icon: Icon }) => (
                                    <ListboxItem
                                        onClick={() => router.visit(href)}
                                        key={title}
                                        startContent={<Icon />}
                                        className={`${selected === href ? 'bg-slate-50 text-gray-800' : ''} pl-3`}
                                    >
                                        {title}
                                    </ListboxItem>
                                ))}
                            </ListboxSection>
                        );
                    }

                    const Icon = item.icon;
                    return (
                        <ListboxItem
                            key={item.title}
                            onClick={() => router.visit(item.href || '/')}
                            startContent={Icon ? <Icon /> : null}
                            className={`${selected === item.href ? 'bg-slate-50 text-gray-800' : ''} pl-3`}
                        >
                            {item.title}
                        </ListboxItem>
                    );
                })}
            </Listbox>
        </div>
    );
}
