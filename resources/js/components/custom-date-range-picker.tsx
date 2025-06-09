import { DateRangePicker, DateRangePickerProps } from '@heroui/react';
import { parseZonedDateTime } from '@internationalized/date';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

interface Props {
    startDate?: string;
    endDate?: string;
    setValue: (range: { start: string; end: string }) => void;
}

export default function CustomDateRangePicker({ startDate = '', endDate = '', setValue, ...props }: Props & DateRangePickerProps) {
    const [data, setData] = useState({
        start: convertDateToPerse(startDate),
        end: convertDateToPerse(endDate),
    });

    function convertDateToPerse(data = '') {
        const date = data ? dayjs(data) : dayjs();
        const dateTime = date.format('YYYY-MM-DDTHH:mm') + '[Asia/Jakarta]';
        return parseZonedDateTime(dateTime);
    }

    useEffect(() => {
        if (data) {
            setValue({
                start: dayjs(data.start.toDate()).format('YYYY-MM-DD HH:mm'),
                end: dayjs(data.end.toDate()).format('YYYY-MM-DD HH:mm'),
            });
        }
    }, [data]);

    return (
        // <DatePicker
        //     hideTimeZone
        //     value={data}
        //     onChange={(val: any) => setData(val)}
        //     variant="bordered"
        //     label="Pilih Rentang Tanggal"
        //     labelPlacement="outside"
        //     color="primary"
        //     classNames={{
        //         label: 'text-gray-800',
        //         description: 'text-gray-400 italic text-xs',
        //     }}
        //     visibleMonths={2}
        //     {...props}
        // />
        <DateRangePicker
            hideTimeZone
            variant="bordered"
            label="Pilih Rentang Tanggal"
            labelPlacement="outside"
            color="primary"
            defaultValue={data}
            visibleMonths={2}
            onChange={(value) => {
                if (value) {
                    setData({ start: value.start as any, end: value.end as any });
                }
            }}
            {...props}
        />
    );
}
