// Components
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';


export default function VerifyEmail({ status }: { status?: string }) {
    const { post, processing } = useForm({});

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return <h1>login</h1>;
}
