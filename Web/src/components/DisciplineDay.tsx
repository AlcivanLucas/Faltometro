import * as Popover from '@radix-ui/react-popover';
import clsx from 'clsx';
import { useState } from 'react';
import { calculateCompletedPercentage } from '../utils/calculate-completed-percentage';
import { DisciplineModal } from './DisciplineModal';

interface DisciplineDayProps {
    date: Date;
    defaultCompleted?: number;
    defaultAmount?: number;
}

export function DisciplineDay({
    defaultCompleted = 0,
    defaultAmount = 0,
    date,
}: DisciplineDayProps) {
    const defaultCompletedPercentage = calculateCompletedPercentage(
        defaultAmount,
        defaultCompleted
    );

    const [completedPercentage, setCompletedPercentage] = useState(
        defaultCompletedPercentage
    );

    function handleCompletedPercentage(percentage: number) {
        setCompletedPercentage(percentage);
    }

    return (
        <Popover.Root>
            <Popover.Trigger
                className={clsx(
                    'w-10 h-10 rounded-lg border-2  ',
                    {
                        'bg-zinc-900 border-zinc-800': completedPercentage === 0,
                        'bg-red-500 border-red-400': completedPercentage > 0 && completedPercentage < 20,
                        'bg-red-600 border-red-500': completedPercentage >= 20 && completedPercentage < 40,
                        'bg-red-700 border-red-600': completedPercentage >= 40 && completedPercentage < 60,
                        'bg-red-800 border-red-700': completedPercentage >= 60 && completedPercentage < 80,
                        'bg-red-900 border-red-800': completedPercentage >= 80,
                    }
                )}
            />
            <Popover.Portal>
                <>
                    <DisciplineModal
                        date={date}
                        handleCompletedPercentage={handleCompletedPercentage}
                        completedPercentage={completedPercentage}
                    />
                </>
            </Popover.Portal>
        </Popover.Root>
    );
}