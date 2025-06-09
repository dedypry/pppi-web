import { Textarea, TextAreaProps } from "@heroui/react";

export default function CustomTextArea({...props}:TextAreaProps){
    return (
        <Textarea
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
