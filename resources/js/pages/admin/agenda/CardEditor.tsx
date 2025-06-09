import CustomDateRangePicker from '@/components/custom-date-range-picker';
import CustomInput from '@/components/custom-input';
import QuillJS from '@/components/quill-js';
import { SchedulerHelpers } from '@aldabil/react-scheduler/types';
import { Button, Card, CardBody, CardFooter, CardHeader } from '@heroui/react';
import { useForm } from '@inertiajs/react';

interface Props {
    scheduler: SchedulerHelpers;
}
export default function CustomEditor({ scheduler }: Props) {
    const event = scheduler.edited;

    const { data, setData, errors, post } = useForm({
        id: event?.event_id || '',
        title: event?.title as any,
        subtitle: event?.subtitle as any,
        content: event?.description || '',
        start_at: scheduler.state.start.value,
        end_at: scheduler.state.end.value,
    });

    const handleSubmit = async () => {
        try {
            scheduler.loading(true);

            /**Simulate remote data saving */
            // const added_updated_event = (await new Promise((res) => {

            // })) as ProcessedEvent;
            post(route('agenda.store'));

            // scheduler.onConfirm(added_updated_event, event ? 'edit' : 'create');
            scheduler.close();
        } finally {
            scheduler.loading(false);
        }
    };
    return (
        <Card>
            <CardBody className="flex w-[500px] flex-col gap-4">
                <CardHeader>Agenda</CardHeader>
                <CustomInput
                    label="Judul"
                    placeholder="Masukan Judul"
                    value={data.title as any}
                    onChange={(e) => setData('title', e.target.value)}
                    isInvalid={!!errors.title}
                    errorMessage={errors.title}
                />
                <CustomInput
                    label="Subtitle"
                    placeholder="Masukan SubJudul"
                    value={data.subtitle as any}
                    onChange={(e) => setData('subtitle', e.target.value)}
                    isInvalid={!!errors.subtitle}
                    errorMessage={errors.subtitle}
                />
                <CustomDateRangePicker
                    labelPlacement="outside"
                    label="Durasi Agenda"
                    variant="bordered"
                    startDate={data.start_at}
                    endDate={data.end_at}
                    setValue={(val) => {
                        setData('start_at', val.start);
                        setData('end_at', val.end);
                    }}
                />
                <QuillJS label="Description" value={data.content} onContent={(e) => setData('content', e.target.value)} />
            </CardBody>
            <CardFooter className="flex justify-end gap-2">
                <Button onPress={scheduler.close} radius="full">
                    Cancel
                </Button>
                <Button onPress={handleSubmit} radius="full" color="primary">
                    Confirm
                </Button>
            </CardFooter>
        </Card>
    );
}
