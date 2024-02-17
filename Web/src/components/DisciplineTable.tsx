import {api} from  '../lib/axios'
import { useState } from 'react'
import { DisciplinesList } from './DisciplinesList'
import { SpeakerSimpleHigh } from 'phosphor-react'

import { calculateCompletedPercentage } from '../utils/calculate-completed-percentage';

export function DisciplineTable(){

    return(
        <div className='flex flex-col md:flex-row'> {/* Container principal com flexbox (coluna em dispositivos móveis e linha em dispositivos médios e maiores) */}

            <div className='flex flex-col items-center'> {/* Container calendario */}
                <div className='flex w-full py-4 justify-center'> 
                    <h1 className='font-semibold text-zinc-400 text-2xl'>Faltas por Compromisso</h1>
                </div>
                <div className='justify-center flex w-full'>
                    <span>Matemática</span>
                    <span>Português</span>
                    <span>Geografia</span>
                    <span>Biologia</span>
                </div>


                {/* <DisciplineModal
                        date={date}
                        handleCompletedPercentage={handleCompletedPercentage}
                        completedPercentage={completedPercentage}
                    /> */}
            </div>
        </div>
    )

}