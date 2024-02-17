import { Check } from "phosphor-react";
import * as Checkbox from '@radix-ui/react-checkbox';
import { FormEvent, useState, useEffect } from "react";
import { api } from "../lib/axios";



export function DeleteDisciplineForm() {
        // Estado para armazenar as disciplinas disponíveis
        const [availableDisciplines, setAvailableDisciplines] = useState<string[]>([]);
        // Estado para armazenar o UUID da disciplina que será deletada
        const [id, setId] = useState('');

        // Efeito para buscar as disciplinas disponíveis da API quando o componente é montado
        useEffect(() => {
            // Função para buscar as disciplinas da API
            async function fetchDisciplines() {
                try {
                    const response = await api.get('disciplines');
                    const disciplines = response.data.map((discipline: any) => discipline.title);
                    console.log(response);
                    console.log(disciplines);

                    // const disciplines = response.data.map((discipline: any) => discipline.id);
                    setAvailableDisciplines(disciplines);
                } catch (error) {
                    console.error('Error fetching disciplines:', error);
                }
            }
            // Chamada da função para buscar as disciplinas
            fetchDisciplines();
        }, []);

        // Função assíncrona para Deletar uma disciplina
        async function handleDeleteDiscipline(event: FormEvent) {
            event.preventDefault()
            try {
                // Requisição DELETE para a API enviando o UUID da disciplina
                await api.delete(`deletedisciplines/${id}`) 
                .then(response => {
                    console.log(`Deleted post with ID ${id}`);
                  })
                  .catch(error => {
                    console.error(error);
                  });
                // Limpa o campo de UUID após a exclusão da disciplina
                setId('');
                alert('Disciplina deletada com sucesso!');
            } catch (error) {
                console.error('Error deleting discipline:', error);
                alert('Erro ao deletar disciplina. Verifique o console para mais detalhes.');
            }
        }

      return(
        <form onSubmit={handleDeleteDiscipline} className="w-full flex flex-col mt-6">
            {/* Adicionamos um campo de entrada para o usuário inserir o UUID da disciplina */}
            <label htmlFor="id" className="font-semibold leading-tight">
                UUID da disciplina a ser deletada
            </label>
            <input
                type="text"
                id="id"
                value={id}
                onChange={(event) => setId(event.target.value)}
                placeholder="Digite o UUID da disciplina..."
                className="w-full mt-2 p-4 rounded-lg border border-gray-200 bg-gray-100 text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-zinc-900"
            />

            {/* Lista de disciplinas disponíveis */}
            <div className="className='mt-6 flex flex-col gap-3'">
                {availableDisciplines.map((discipline, index) => (
                    
                    <span className='font-semibold text-xl text-white leading-tight group-data-[state=checked]:line-through group-data-[state=checked]:text-zinc-400' key={index}>{discipline}</span>
                ))}
            </div>
            
            <button type="submit" className="mt-4 bg-red-500 text-white p-4 rounded-lg flex items-center justify-center">
                <Check size={24} />
                <span className="ml-2">Deletar</span>
            </button>
        </form>
      )
    
}