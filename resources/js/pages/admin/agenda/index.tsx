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
                    view="month"
                    events={agenda?.map((item) => ({
                        event_id: item.id,
                        title: item.title,
                        subtitle: item.subtitle,
                        start: new Date(item.start_at),
                        end: new Date(item.end_at),
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
