import {api} from  '../lib/axios'
import { useState, useEffect } from 'react'
import AbsenceSquare from './Function/AbsenceSquare'

interface Discipline {
    id: string;
    title: string;
    numberAbsence: number;
}

export function DisciplineTable(){
        // Estado para armazenar as disciplinas disponíveis
        const [availableDisciplines, setAvailableDisciplines] = useState<Discipline[]>([]);
        // Estado para armazenar o UUID da disciplina que será deletada
        const [id, setId] = useState('');

        // Efeito para buscar as disciplinas disponíveis da API quando o componente é montado
        useEffect(() => {
            // Função para buscar as disciplinas da API
            async function fetchDisciplines() {
                try {
                    const response = await api.get('disciplines');
                    const disciplines: Discipline[] = response.data.map((discipline: any) => ({
                        id: discipline.id,
                        title: discipline.title
                    }));
                    setAvailableDisciplines(disciplines);
                } catch (error) {
                    console.error('Error fetching disciplines:', error);
                }
            }
            // Chamada da função para buscar as disciplinas
            fetchDisciplines();
        }, []);

    return(
        <div className='justify-center flex w-full'> {/* Container principal com flexbox (coluna em dispositivos móveis e linha em dispositivos médios e maiores) */}

            <div className='flex flex-col items-center'> {/* Container calendario */}

                <div className='flex w-full py-4 justify-center'> 
                    <h1 className='font-semibold text-zinc-400 text-2xl'>Por Máteria</h1>
                </div>

                {/* Lista de disciplinas disponíveis */}
                <div className="className='mt-6 flex flex-col gap-3'">
                    {availableDisciplines.map((discipline, index) => {
                        return(
                            <div key={index}>
                                <span className='font-semibold text-xl text-zinc-300 leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400' key={index}>{discipline.title}</span>
                                <AbsenceSquare numberAbsence={2} />
                                {/* <AbsenceSquare numberAbsence={numberAbsence[discipline.id]} /> */}
                            </div>

                        )
                    })}
                </div>
            </div>

        </div>
    )

}