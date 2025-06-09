import UploadAvatar from '@/components/upload-avatar';
import { IChild } from '@/iterfaces/IBody';
import { Card, CardBody, CardHeader, Divider, Listbox, ListboxItem, ListboxSection } from '@heroui/react';
import { router, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
interface Props {
    logo?: string;
}
export default function LayoutApps({ children, logo }: IChild & Props) {
    const [selected, setSelected] = useState<string>(window.location.pathname);
    const { data, setData, post } = useForm({
        logo: logo || ('' as any),
    });
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
            title: 'Apps',
            href: '/settings/apps',
        },
        {
            title: 'Visi dan Misi',
            href: '/settings/apps/visi',
        },
    ];

    return (
        <div className="grid grid-cols-12 gap-4">
            <div className="col-span-4">
                <Card>
                    <CardHeader>
                        <UploadAvatar file={data.logo} setFile={(file: File) => setData('logo', file)} post={() => post(route('apps.store'))} label='Upload Photo Logo' />
                    </CardHeader>
                    <Divider />
                    <CardBody>
                        <Listbox
                            className="text-gray-800"
                            variant="solid"
                            itemClasses={{
                                base: 'data-[hover=true]:bg-primary data-[hover=true]:text-white',
                            }}
                        >
                            <ListboxSection title="Pengaturan APlikasi" classNames={{ heading: 'font-semibold italic text-sm', group: 'pl-2' }}>
                                {navigations.map((item) => (
                                    <ListboxItem
                                        onClick={() => router.visit(item.href)}
                                        key={item.title}
                                        className={selected === item.href ? 'bg-primary text-white' : ''}
                                    >
                                        {item.title}
                                    </ListboxItem>
                                ))}
                            </ListboxSection>
                        </Listbox>
                    </CardBody>
                </Card>
            </div>
            <div className="col-span-8">{children}</div>
        </div>
    );
}
