import { useEffect, useState } from 'react';
import * as Popover from '@radix-ui/react-popover';
import dayjs from 'dayjs';
import { api } from '../lib/axios';

import { DisciplinesList } from './DisciplinesList';
import { ProgressBar } from './ProgressBar';
import { calculateCompletedPercentage } from '../utils/calculate-completed-percentage';

// Definindo a interface para as propriedades do componente DisciplineModal
interface DisciplineModalProps {
    date: Date;
    handleCompletedPercentage: (percentage: number) => void;
    completedPercentage: number;
}

// Definindo a interface DisciplinesInfo que representa as informações sobre as disciplinas
export interface DisciplinesInfo {
    possibleDisciplines: {
        id: string;
        title: string;
        created_at: string;
    }[];
    completedDisciplines: string[];
}

// Componente funcional DisciplineModal que renderiza um modal com informações sobre as disciplinas em uma determinada data
export function DisciplineModal({
    date,
    handleCompletedPercentage,
    completedPercentage,
}: DisciplineModalProps) {

    // Estado para armazenar as informações sobre as disciplinas
    const [disciplinesInfo, setDisciplinesInfo] = useState<DisciplinesInfo>();

    // Obtém o dia da semana e o mês a partir da data fornecida
    const dateAndMonth = dayjs(date).format('DD/MM');
    const dayOfWeek = dayjs(date).format('dddd');

    // busca as informações sobre as disciplinas da API quando o componente é montado
    useEffect(() => {
        api
            .get('day', {
                params: {
                    date: date.toISOString(),
                },
            })
            
            .then((response) => {
                // Atualiza o estado com as informações recebidas da API
                setDisciplinesInfo(response?.data);

                // Calcula a porcentagem de disciplinas concluídas e atualiza o estado
                const updatedCompletedPercentage = calculateCompletedPercentage(
                    response?.data?.possibleDisciplines?.length,
                    response?.data?.completedDisciplines?.length
                );
                handleCompletedPercentage(updatedCompletedPercentage);
            });
    }, []);

    // Função para lidar com a alteração das disciplinas concluídas
    function handleCompletedChanged(
        disciplinesInfo: DisciplinesInfo,
        completedDisciplines: string[]
    ) {
        // Atualiza o estado com as disciplinas possíveis e as disciplinas concluídas
        setDisciplinesInfo({
            possibleDisciplines: disciplinesInfo?.possibleDisciplines,
            completedDisciplines,
        });
    }

    // Se não houver informações sobre as disciplinas, retorna um componente vazio
    if (!disciplinesInfo) {
        return <div></div>;
    }

    // Retorna o modal com as informações sobre as disciplinas
    return (
        <Popover.Content className='min-w-[320px] p-6 rounded-2xl bg-zinc-900 flex flex-col focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-zinc-900'>
            <span className='font-semibold text-zinc-400 first-letter:capitalize'>
                {dayOfWeek}
            </span>

            <span className='mt-1 font-extrabold loading-tight text-3xl'>
                {dateAndMonth}
            </span>

            {/* Barra de progresso mostrando a porcentagem de disciplinas concluídas */}
            <ProgressBar progress={completedPercentage} />

            {/* Componente DisciplinesList para exibir a lista de disciplinas */}
            <DisciplinesList
                date={date}
                handleCompletedPercentage={handleCompletedPercentage}
                disciplinesInfo={disciplinesInfo}
                onCompletedChanged={handleCompletedChanged}
            />
            {/* Setinha do Popover */}
            <Popover.Arrow height={8} width={16} className='fill-red-900 ' />
        </Popover.Content>
    );
}