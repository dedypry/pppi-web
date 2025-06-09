import { IAgenda } from '@/iterfaces/IAgenda';
import { Scheduler } from '@aldabil/react-scheduler';
import { Card, CardBody } from '@heroui/react';
import CustomEditor from './CardEditor';
import { router } from '@inertiajs/react';
interface Props {
    agenda: IAgenda[];
}
export default function Agenda({ agenda }: Props) {
    console.log('AGENDA', agenda);
    // {
    //     event_id: 1,
    //     title: 'Event 1',
    //     start: new Date('2021/5/2 09:30'),
    //     end: new Date('2021/5/2 10:30'),
    // }
    return (
        <Card>
            <CardBody>
                <Scheduler
                    onDelete={async (val: number) => router.delete(route('agenda.destroy', val))}
                    customEditor={(scheduler) => <CustomEditor scheduler={scheduler} />}
                    onEventDrop={async (_e, droppedOn, updatedEvent, originalEvent) => {
                        console.log('ID:', originalEvent.event_id);
                        console.log('Tanggal baru mulai:', updatedEvent.start); // Date object
                        console.log('Tanggal baru selesai:', updatedEvent.end); // Date object
                        console.log('Dropped on cell (optional):', droppedOn);

                        // Contoh kirim ke server:
                        // await axios.put(`/api/agenda/${originalEvent.event_id}`, {
                        //   start_at: updatedEvent.start.toISOString(),
                        //   end_at: updatedEvent.end.toISOString()
                        // });

                        // Kembalikan updatedEvent agar scheduler memperbarui tampilannya
                        return updatedEvent;
                    }}
                    view="month"
                    events={agenda?.map((item) => ({
                        event_id: item.id,
                        title: item.title,
                        subtitle: item.subtitle,
                        start: new Date(item.start_at),
                        end: new Date(item.end_at),
                        draggable: true,
                        agendaAvatar: 'http://127.0.0.1:8000/logo.png',
                    }))}
                    fields={[
                        {
                            name: 'Description',
                            type: 'input',
                            default: 'Default Value...',
                            config: { label: 'Details', multiline: true, rows: 4 },
                        },
                    ]}
                />
            </CardBody>
        </Card>
    );
}
