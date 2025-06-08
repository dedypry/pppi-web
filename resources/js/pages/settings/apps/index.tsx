import { IChild } from '@/iterfaces/IBody';
import { Avatar, Button, Card, CardBody, CardHeader, Divider, Listbox, ListboxItem, ListboxSection } from '@heroui/react';
import { router, useForm } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';
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

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setData('logo', e.target.files[0]);
        }
    };

    const fileInputRef = useRef<HTMLInputElement | null>(null);

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
                    <CardHeader className="flex justify-center gap-2">
                        <input type="file" accept="image/*" ref={fileInputRef} className="hidden" onChange={handleFileChange} />

                        <Avatar
                            isBordered
                            className="h-32 w-32 cursor-pointer"
                            onClick={() => fileInputRef.current?.click()}
                            src={data.logo instanceof File ? URL.createObjectURL(data.logo) : (data.logo as string) || ''}
                        />

                        <div className="flex flex-col gap-1">
                            <p className="text-xs italic text-gray-400">Logo Organisasi</p>
                            <Button size="sm" radius="full" className="px-10" onPress={() => setData('logo', logo)}>
                                Reset
                            </Button>
                            <Button size="sm" radius="full" color="primary" className="px-10" onPress={() => post(route('apps.store'))}>
                                Simpan
                            </Button>
                        </div>
                        {/* <InputPhotoProfile photo={data.logo} setPhoto={(val:any) => setData('logo', val)} /> */}
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
