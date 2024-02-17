import { DisciplineDay } from './DisciplineDay'; // Importa o componente DisciplineDay
import { generateDatesFromYearBeginning } from '../utils/generate-dates-from-year-beginning'; // Importa a função para gerar datas desde o início do ano
import { useEffect, useState } from 'react'; // Importa hooks do React
import { api } from '../lib/axios'; // Importa o cliente HTTP axios
import dayjs from 'dayjs'; // Importa a biblioteca dayjs para manipulação de datas
import {DisciplineModal} from './DisciplineModal'
import { calculateCompletedPercentage } from '../utils/calculate-completed-percentage';
import { DisciplineTable } from './DisciplineTable';

interface DisciplineDayProps {
    date: Date;
    defaultCompleted?: number;
    defaultAmount?: number;
}

// Array com os dias da semana
const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];

// Gera as datas do calendário desde o início do ano
const summaryDates = generateDatesFromYearBeginning();

// Define o tamanho mínimo do calendário como 18 semanas (18 * 7 dias)
const minimumSummaryDatesSize = 10 * 7;

// Calcula a quantidade de dias que faltam para completar o calendário
const amountOfDaysToFill = minimumSummaryDatesSize - summaryDates.length;

// Descobre o mês atual
const dateMonth: string =  dayjs().format('MMMM');

// Tipo para a estrutura de dados do resumo
type Summary = {
    id: string;
    date: string;
    amount: number;
    completed: number;
}[];

// Componente principal para exibir o calendário
export function SummaryTable(){
//     defaultCompleted = 0,
//     defaultAmount = 0,
//     date,
// }: DisciplineDayProps) {
//     const defaultCompletedPercentage = calculateCompletedPercentage(
//         defaultAmount,
//         defaultCompleted
//     );

//     const [completedPercentage, setCompletedPercentage] = useState(
//         defaultCompletedPercentage
//     );

//     function handleCompletedPercentage(percentage: number) {
//         setCompletedPercentage(percentage);
//     }

    // Estado para armazenar os dados do resumo
    const [summary, setSummary] = useState<Summary>([]);

    // Efeito para buscar os dados do resumo via API ao carregar o componente
    useEffect(() => {
        api.get('summary').then((response) => {
            setSummary(response.data);
        });
    }, []);

    // Obtém o primeiro dia do mês a partir das datas geradas
    const firstDayOfMonth = dayjs(summaryDates[0]).startOf('month');

    // Obtém o índice do primeiro dia da semana no mês
    const firstDayIndex = firstDayOfMonth.day();

    // Reorganiza os dias da semana para começar do dia correto
    const reorganizedWeekDays = [
        ...weekDays.slice(firstDayIndex),
        ...weekDays.slice(0, firstDayIndex),
    ];

    // Renderiza o componente
    return (
        
        <div className='flex flex-col md:flex-row'> {/* Container principal com flexbox (coluna em dispositivos móveis e linha em dispositivos médios e maiores) */}

            <div className=' flex flex-col items-center'> {/* Container calendario */}

                {/* Container do Mês */}
                <div className='flex justify-center w-full py-4'> 
                    <span className='text-zinc-400 text-2xl font-bold'>
                        {dateMonth}
                    </span>
                </div>

                {/* Container do Calendário */}
                <div className='justify-center flex w-full'>

                    {/* Renderiza os dias da semana */}
                    <div className='grid grid-rows-7 grid-flow-row gap-3'>
                        {reorganizedWeekDays.map((weekDay, index) => {
                            return (
                                <div
                                    key={`${weekDay}-${index}`}
                                    className='text-zinc-400 text-xl font-bold h-10 w-10 flex items-center justify-center'
                                >
                                    {weekDay}
                                </div>
                            );
                        })}
                    </div>

                    {/* Renderiza os dias do calendário */}
                    <div className='grid grid-rows-7 grid-flow-col gap-3'>
                        {summary.length > 0 &&
                            summaryDates.map((date) => {
                                const dayInSummary = summary.find((day) => {
                                    return dayjs(date).isSame(day.date, 'day');
                                });

                                return (
                                    <DisciplineDay
                                        key={date.toString()}
                                        date={date}
                                        defaultAmount={dayInSummary?.amount}
                                        defaultCompleted={dayInSummary?.completed}
                                    />
                                );
                            })}

                        {/* Renderiza os dias restantes do calendário vazio */}
                        {amountOfDaysToFill > 0 &&
                            Array.from({ length: amountOfDaysToFill }).map((_, i) => (
                                <div
                                    key={i}
                                    className='w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed'
                                ></div>
                            ))}
                    </div>
                </div>
            
            </div>
            {/* <DisciplineTable/> */}
            <DisciplineTable/>



        </div>

       
    );
}
