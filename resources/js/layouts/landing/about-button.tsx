import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react';
import { router } from '@inertiajs/react';
import { useState } from 'react';

interface Props {
    scrolled: boolean;
}
export default function AboutButton({ scrolled }: Props) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
            <Dropdown isOpen={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
                <DropdownTrigger>
                    <p className={`link-anim cursor-pointer ${scrolled ? 'text-gray-800':'text-white'}`}>Tentang Kami</p>
                </DropdownTrigger>
                <DropdownMenu>
                    <DropdownItem key={'about'} color="primary" onClick={() => router.visit(route('history'))}>
                        Sejarah PPPI
                    </DropdownItem>
                    <DropdownItem key={'visi'} color="primary" onClick={() => router.visit(route('visi.misi'))}>
                        Visi dan Misi
                    </DropdownItem>
                    <DropdownItem key={'struktur'} color="primary" onClick={() => router.visit(route('organization'))}>
                        Struktur Organisasi
                    </DropdownItem>
                    <DropdownItem key={'lpk'} color="primary">
                        LPK PPPI
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    );
}
