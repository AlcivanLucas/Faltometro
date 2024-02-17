import * as Checkbox from '@radix-ui/react-checkbox';
import dayjs from 'dayjs';
import { Check } from 'phosphor-react';
import { api } from '../lib/axios';
import { calculateCompletedPercentage } from '../utils/calculate-completed-percentage';

import { DisciplinesInfo } from './DisciplineModal';

// modal que aparece quando clica no dia especifico do calendario
// Definindo a interface para as propriedades do componente DisciplinesList
interface DisciplinesListProps {
    date: Date;
    handleCompletedPercentage: (percentage: number) => void;
    disciplinesInfo: DisciplinesInfo;
    onCompletedChanged: (
        disciplinesInfo: DisciplinesInfo,
        completedDisciplines: string[]
    ) => void;
}
// Componente funcional DisciplinesList responsável por renderizar uma lista de disciplinas
export function DisciplinesList({
    date,
    handleCompletedPercentage,
    disciplinesInfo,
    onCompletedChanged,
}: DisciplinesListProps) {
    // Função assíncrona para lidar com a alternância de uma disciplina entre concluída e não concluída
    async function handleToggleDiscipline(disciplineId: string) {

        // Faz uma requisição PATCH à API para alternar o status da disciplina
        api.patch(`disciplines/${disciplineId}/toggle`);

        // Verifica se a disciplina já está concluída
        const isDisciplineAlreadyCompleted =
            disciplinesInfo?.completedDisciplines?.includes(disciplineId);

        let completedDisciplines: string[] = [];

        // Atualiza a lista de disciplinas concluídas
        if (isDisciplineAlreadyCompleted) {
            completedDisciplines = disciplinesInfo?.completedDisciplines.filter(
                (id) => id !== disciplineId
            );
        } else {
            completedDisciplines = [...disciplinesInfo?.completedDisciplines, disciplineId];
        }

        // Calcula a porcentagem de disciplinas concluídas e atualiza o estado
        const updatedCompletedPercentage = calculateCompletedPercentage(
            disciplinesInfo?.possibleDisciplines.length,
            completedDisciplines.length
        );
        handleCompletedPercentage(updatedCompletedPercentage);
        onCompletedChanged(disciplinesInfo, completedDisciplines);
    }

    // Verifica se a data é no passado
    const isDateInPast = dayjs(date).endOf('day').isBefore(new Date());

    // Retorna a lista de disciplinas
    return (
        <div className='mt-6 flex flex-col gap-3'>
            {disciplinesInfo?.possibleDisciplines.map((discipline) => {
                return (
                    <Checkbox.Root
                        key={discipline.id}
                        //Chama a função handleToggleDiscipline quando o estado do checkbox é alterado
                        onCheckedChange={() => handleToggleDiscipline(discipline.id)}
                        // Define se o checkbox está marcado com base na lista de disciplinas concluídas
                        checked={disciplinesInfo?.completedDisciplines?.includes(discipline.id)}
                        // Desabilita o checkbox se a data for no passado
                        disabled={isDateInPast}
                        className='flex items-center gap-3 group focus:outline-none disabled:cursor-not-allowed'
                    >   {/* Ícone de checkbox */}
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