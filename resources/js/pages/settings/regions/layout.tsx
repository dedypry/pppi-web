import { IChild } from '@/iterfaces/IBody';
import { Card, Listbox, ListboxItem, ListboxSection } from '@heroui/react';
import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function LayoutRegion({ children }: IChild) {
    const [selected, setSelected] = useState<string>(window.location.pathname);
    useEffect(() => {
        const unlisten = router.on('navigate', (event) => {
            setSelected(new URL(event.detail.page.url, window.location.origin).pathname);
        });

        return () => {
            unlisten();
        };
    }, []);

    const navigations = [
        {
            title: 'Provinsi',
            href: '/settings/regions',
        },
        {
            title: 'Kota',
            href: '/settings/regions/city',
        },
        {
            title: 'Kabupaten',
            href: '/settings/regions/district',
        },
    ];
    return (
        <div className="grid grid-cols-12 gap-4">
            <div className="col-span-12 sm:col-span-3">
                <Card className="sticky top-16">
                    <Listbox
                        className="text-gray-800"
                        variant="solid"
                        itemClasses={{
                            base: 'data-[hover=true]:bg-primary data-[hover=true]:text-white',
                        }}
                    >
                        <ListboxSection title="Wilayah" classNames={{ heading: 'font-semibold italic text-sm', group: 'pl-2' }}>
                            {navigations.map((item) => (
                                <ListboxItem onClick={() => router.visit(item.href)} key={item.title} className={selected === item.href ? 'bg-primary text-white':''}>
                                    {item.title}
                                </ListboxItem>
                            ))}
                        </ListboxSection>
                    </Listbox>
                </Card>
            </div>
            <div className="col-span-12 sm:col-span-9">{children}</div>
        </div>
    );
}
