import { Input, InputProps } from '@heroui/react';

export default function CustomInput(props: InputProps) {
    return (
        <Input
            labelPlacement="outside"
            variant="bordered"
            color="primary"
            classNames={{
                label: 'text-gray-800',
            }}
            {...props}
        />
    );
}
