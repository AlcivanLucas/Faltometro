import {api} from  '../lib/axios'
import { useState } from 'react'
import { DisciplinesList } from './DisciplinesList'
import { SpeakerSimpleHigh } from 'phosphor-react'


export function DisciplineTable(){


    return(
        <div className='flex flex-col md:flex-row'> {/* Container principal com flexbox (coluna em dispositivos móveis e linha em dispositivos médios e maiores) */}

            <div className=' flex flex-col items-center'> {/* Container calendario */}

                {/* Container do Mês */}
                <div className='flex justify-center w-full py-4'> 
                    <h1 className='font-semibold text-zinc-400 text-2xl'>Faltas por Compromisso</h1>
                </div>

                {/* Container do Calendário */}
                <div className='justify-center flex w-full'>
                    <span>Matemática</span>
                    <span>Português</span>
                    <span>Geografia</span>
                    <span>Biologia</span>

                </div>
            
            </div>




        </div>
    )

}