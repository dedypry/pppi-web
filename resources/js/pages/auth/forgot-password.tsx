// Components
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';


export default function ForgotPassword({ status }: { status?: string }) {
    const { data, setData, post, processing, errors } = useForm<Required<{ email: string }>>({
        email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return <h1>login</h1>;
}
