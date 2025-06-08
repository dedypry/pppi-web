import { Input, Button, InputProps } from "@heroui/react";
import { LockKeyhole, Eye, EyeClosed } from "lucide-react";
import { useState } from "react";

export default function InputPassword({...props}:InputProps){
    const [isPassword, setIsPassword] = useState(false)
    return (
        <Input
            startContent={<LockKeyhole size={20} className={props.isInvalid ? 'text-danger' : 'text-secondary-600'} />}
            label="Password"
            labelPlacement="outside"
            placeholder="input password"
            type={!isPassword ? 'password' : 'text'}
            endContent={
                <Button isIconOnly radius="full" size="sm" variant="light" onPress={() => setIsPassword(!isPassword)}>
                    {isPassword ? (
                        <Eye className={props.isInvalid ? 'text-danger' : ''} />
                    ) : (
                        <EyeClosed className={props.isInvalid ? 'text-danger' : ''} />
                    )}
                </Button>
            }
            variant="bordered"
            color="primary"
            classNames={{
                label: 'text-gray-800',
            }}
            {...props}
        />
    );
}
