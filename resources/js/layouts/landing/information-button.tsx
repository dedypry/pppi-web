import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
import { router } from "@inertiajs/react";
import { useState } from "react";

interface Props {
    scrolled: boolean;
}
export default function InformationButton({scrolled}:Props){
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
            <Dropdown isOpen={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
                <DropdownTrigger>
                    <p className={`link-anim cursor-pointer ${scrolled ? 'text-gray-800' : 'text-white'}`}>Informasi</p>
                </DropdownTrigger>
                <DropdownMenu>
                    <DropdownItem key={'blog'} color="primary" onClick={() => router.visit(route('blogs'))}>
                        Blogs
                    </DropdownItem>
                    <DropdownItem key={'galesy'} color="primary" onClick={() => router.visit(route('gallery'))}>
                        Gallery
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        </div>
    );
}
