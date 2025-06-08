/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { DatePicker, DatePickerProps } from '@heroui/react';
import { CalendarDate, CalendarDateTime, parseDate, ZonedDateTime } from '@internationalized/date';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

interface Props {
    time?: string;
    setValue: CallableFunction;
}
export default function CustomDatePicker({ time = '', setValue, ...props }: Props & DatePickerProps) {
    const [data, setData] = useState<CalendarDate | CalendarDateTime | ZonedDateTime | null>(null);

    useEffect(() => {
        if (time) {
            const d = dayjs(time).format('YYYY-MM-DD');
            setData(parseDate(d));
        }
    }, [time]);

    useEffect(() => {
        if (data) {
            setValue(data!.toString());
        }
    }, [data]);

    return (
        <DatePicker
            value={data ?? undefined}
            variant="bordered"
            labelPlacement="outside"
            onChange={setData}
            color="primary"
            classNames={{
                label: 'text-gray-800',
            }}
            {...props}
        />
    );
}
