import { Check } from "phosphor-react";
import * as Checkbox from '@radix-ui/react-checkbox';
import { FormEvent, useState } from "react";
import { api } from "../lib/axios";

// Array contendo os dias da semana disponíveis para aparecer no formulário
const availableWeekDays = [
    'Domingo',
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado',
]

export function NewDisciplineForm() {
    // Estados para controlar o título da disciplina e os dias da semana selecionados
    const [title, setTitle] = useState('')
    const [weekDays, setWeekDays] = useState<number[]>([])

    // Função assíncrona para criar uma nova disciplina
    async function createNewDiscipline(event: FormEvent) {
        event.preventDefault()

        // Verifica se o título ou os dias da semana não foram preenchidos e retorna caso algum deles esteja vazio
        if (!title || weekDays.length === 0) {
            return alert('Preencha todos os campos')
        }

        // Requisição POST para a API enviando o título e os dias da semana selecionados
        await api.post('disciplines', {
            title,
            weekDays
        })

        // Limpa os campos de título e dias da semana após o envio da disciplina
        setTitle('')
        setWeekDays([])

        alert('Disciplina adicinada com sucesso!')
    }

    // Função para lidar com a seleção ou desseleção de um dia da semana
    function handleToggleWeekDay(weekDay: number) {
        // Se o dia da semana já estiver selecionado, remove-o da lista
        if (weekDays.includes(weekDay)) {
            const weekDaysWithRemovedOne = weekDays.filter(day => day !== weekDay)
            setWeekDays(weekDaysWithRemovedOne)
        // Se o dia da semana não estiver selecionado, adiciona-o à lista
        } else {
            const weekDaysWithAddedOne = [...weekDays, weekDay]
            setWeekDays(weekDaysWithAddedOne)
        }
    }


    return (
        // Retorna o formulário JSX para adicionar uma nova disciplina
        <form onSubmit={createNewDiscipline} className="w-full flex flex-col mt-6">
            <label htmlFor="title" className="font-semibold leading-tight">
                Qual o seu compromisso?
            </label>
            {/* Campo de entrada para o título da disciplina */}
            <input
                type="text"
                id="title"
                placeholder="ex.: Matemática, português, etc..."
                className="p-4 rounded-lg mt-3 bg-zinc-800 text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-zinc-900"
                autoFocus
                value={title}
                onChange={event => setTitle(event.target.value)}
            />
            <label htmlFor="" className="font-semibold leading-tight mt-4">
                Qual a recorrência?
            </label>
            {/* Lista de checkboxes para selecionar os dias da semana */}
            <div className="mt-3 flex flex-col gap-2">
                {availableWeekDays.map((weekDay, index) => {
                    return (
                        <Checkbox.Root
                            key={weekDay}
                            className="flex items-center gap-3 group focus:outline-none"
                            checked={weekDays.includes(index)}
                            onCheckedChange={() => handleToggleWeekDay(index)}
                        >
                            <div className="h-8 w-8 rounded-lg flex items-center justify-center bg-zinc-900 border-2 border-zinc-800 group-data-[state=checked]:bg-green-500 group-data-[state=checked]:border-green-50 transition-colors group-focus:ring-2 group-focus:ring-red-600 group-focus:ring-offset-2 group-focus:ring-offset-background">
                                <Checkbox.Indicator>
                                    <Check size={20} className="text-white" />
                                </Checkbox.Indicator>
                            </div>

                            <span className="text-white leading-tight">
                                {weekDay}
                            </span>
                        </Checkbox.Root>
                    )
                })}

            </div>
            {/* Botão para confirmar a adição da disciplina */}
            <button
                type="submit"
                className="mt-6 rounded-lg p-4 flex items-center justify-center gap-3 font-semibold bg-green-600 hover:bg-green-500 transition-colors focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-zinc-900">
                <Check size={20} weight="bold" />
                Confirmar
            </button>
        </form>
    )
}