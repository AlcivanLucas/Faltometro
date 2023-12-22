import * as Checkbox from '@radix-ui/react-checkbox';
import dayjs from 'dayjs';
import { Check } from 'phosphor-react';
import { api } from '../lib/axios';
import { calculateCompletedPercentage } from '../utils/calculate-completed-percentage';

import { DisciplinesInfo } from './DisciplineModal';
// modal que aparece quando clica no dia especifico do calendario
interface DisciplinesListProps {
    date: Date;
    handleCompletedPercentage: (percentage: number) => void;
    disciplinesInfo: DisciplinesInfo;
    onCompletedChanged: (
        disciplinesInfo: DisciplinesInfo,
        completedDisciplines: string[]
    ) => void;
}

export function DisciplinesList({
    date,
    handleCompletedPercentage,
    disciplinesInfo,
    onCompletedChanged,
}: DisciplinesListProps) {
    async function handleToggleDiscipline(disciplineId: string) {
        api.patch(`disciplines/${disciplineId}/toggle`);

        const isDisciplineAlreadyCompleted =
            disciplinesInfo?.completedDisciplines?.includes(disciplineId);

        let completedDisciplines: string[] = [];

        if (isDisciplineAlreadyCompleted) {
            completedDisciplines = disciplinesInfo?.completedDisciplines.filter(
                (id) => id !== disciplineId
            );
        } else {
            completedDisciplines = [...disciplinesInfo?.completedDisciplines, disciplineId];
        }

        const updatedCompletedPercentage = calculateCompletedPercentage(
            disciplinesInfo?.possibleDisciplines.length,
            completedDisciplines.length
        );
        handleCompletedPercentage(updatedCompletedPercentage);
        onCompletedChanged(disciplinesInfo, completedDisciplines);
    }

    const isDateInPast = dayjs(date).endOf('day').isBefore(new Date());

    return (
        <div className='mt-6 flex flex-col gap-3'>
            {disciplinesInfo?.possibleDisciplines.map((discipline) => {
                return (
                    <Checkbox.Root
                        key={discipline.id}
                        onCheckedChange={() => handleToggleDiscipline(discipline.id)}
                        checked={disciplinesInfo?.completedDisciplines?.includes(discipline.id)}
                        disabled={isDateInPast}
                        className='flex items-center gap-3 group focus:outline-none disabled:cursor-not-allowed'
                    >
                        <div className='h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-red-500 group-data-[state=checked]:border-red-500 transition-colors group-focus:ring-2 group-focus:ring-red-600 group-focus:ring-offset-2 group-focus:ring-offset-background'>
                            <Checkbox.Indicator>
                                <Check size={20} className='text-white' />
                            </Checkbox.Indicator>
                        </div>

                        <span className='font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400'>
                            {discipline.title}
                        </span>
                    </Checkbox.Root>
                );
            })}
        </div>
    );
}