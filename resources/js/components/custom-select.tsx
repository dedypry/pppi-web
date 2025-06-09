import { Select, SelectProps } from '@heroui/react';

export default function CustomSelect({ ...props }:SelectProps) {
    return (
        <Select
            variant="bordered"
            labelPlacement="outside"
            color="primary"
            classNames={{
                label: 'text-gray-800',
                description: 'text-gray-400 italic text-xs',
            }}
            {...props}
        />
    );
}
