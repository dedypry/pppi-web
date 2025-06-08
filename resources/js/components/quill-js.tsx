/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import http from '@/helpers/axios';
import MagicUrl from 'quill-magic-url';
import QuillResizeImage from 'quill-resize-image';
import 'quill/dist/quill.snow.css';
import { useEffect } from 'react';
import { useQuill } from 'react-quilljs';
interface Props {
    value: string;
    onContent: (val: any) => void;
    label?:string
}
export default function QuillJS({ value, onContent, label }: Props) {
    const { quill, quillRef, Quill } = useQuill({
        modules: {
            resize: {
                locale: {},
            },
            magicUrl: true,
        },
        formats: ['image'],
    });
    if (Quill) {
        Quill.register('modules/resize', QuillResizeImage);
        Quill.register('modules/magicUrl', MagicUrl);
    }

    const insertToEditor = (url: string) => {
        const range = quill!.getSelection();
        quill!.insertEmbed(range!.index, 'image', url);
    };

    const saveToServer = async (file: File) => {
        const body = new FormData();
        body.append('file', file);

        const { data } = await http.post(route('file.store'), body, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        insertToEditor(data.url);
    };

    // Open Dialog to select Image File
    const selectLocalImage = () => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.onchange = () => {
            const file = input.files![0];
            saveToServer(file);
        };
    };

    useEffect(() => {
        if (quill) {
            (quill.getModule('toolbar') as any).addHandler('image', selectLocalImage);

            quill.on('text-change', () => {
                onContent(quill.root.innerHTML);
            });
            quill.clipboard.dangerouslyPasteHTML(value)
        }
    }, [quill]);
    return (
        <div className="w-full">
            {label && <p className='text-sm mb-1'>{label}</p>}
            <div ref={quillRef} />
        </div>
    );
}
