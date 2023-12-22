import { useEffect, useState } from 'react';
import * as Popover from '@radix-ui/react-popover';
import dayjs from 'dayjs';
import { api } from '../lib/axios';

import { DisciplinesList } from './DisciplinesList';
import { ProgressBar } from './ProgressBar';
import { calculateCompletedPercentage } from '../utils/calculate-completed-percentage';

interface DisciplineModalProps {
    date: Date;
    handleCompletedPercentage: (percentage: number) => void;
    completedPercentage: number;
}

export interface DisciplinesInfo {
    possibleDisciplines: {
        id: string;
        title: string;
        created_at: string;
    }[];
    completedDisciplines: string[];
}

export function DisciplineModal({
    date,
    handleCompletedPercentage,
    completedPercentage,
}: DisciplineModalProps) {
    const [disciplinesInfo, setDisciplinesInfo] = useState<DisciplinesInfo>();

    const dateAndMonth = dayjs(date).format('DD/MM');
    const dayOfWeek = dayjs(date).format('dddd');

    useEffect(() => {
        api
            .get('day', {
                params: {
                    date: date.toISOString(),
                },
            })
            .then((response) => {
                setDisciplinesInfo(response?.data);
                const updatedCompletedPercentage = calculateCompletedPercentage(
                    response?.data?.possibleDisciplines?.length,
                    response?.data?.completedDisciplines?.length
                );
                handleCompletedPercentage(updatedCompletedPercentage);
            });
    }, []);

    function handleCompletedChanged(
        disciplinesInfo: DisciplinesInfo,
        completedDisciplines: string[]
    ) {
        setDisciplinesInfo({
            possibleDisciplines: disciplinesInfo?.possibleDisciplines,
            completedDisciplines,
        });
    }

    if (!disciplinesInfo) {
        return <div></div>;
    }

    return (
        <Popover.Content className='min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-zinc-900'>
            <span className='font-semibold text-zinc-400 first-letter:capitalize'>
                {dayOfWeek}
            </span>
            <span className='mt-1 font-extrabold loading-tight text-3xl'>
                {dateAndMonth}
            </span>
            <ProgressBar progress={completedPercentage} />
            <DisciplinesList
                date={date}
                handleCompletedPercentage={handleCompletedPercentage}
                disciplinesInfo={disciplinesInfo}
                onCompletedChanged={handleCompletedChanged}
            />
            <Popover.Arrow height={8} width={16} className='fill-red-900 ' />
        </Popover.Content>
    );
}