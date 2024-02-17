import { Check } from "phosphor-react";
import * as Checkbox from '@radix-ui/react-checkbox';
import { FormEvent, useState } from "react";
import { api } from "../lib/axios";



export function DeleteDisciplineForm() {
      return(
        <form className="w-full flex flex-col mt-6">
            <label htmlFor="title" className="font-semibold leading-tight">
                Deseja excluir qual disciplina?
            </label>
            <input
                type="text"
                id="title"
                placeholder="ex.: Matemática, português, etc..."
                className="w-full mt-2 p-4 rounded-lg border border-gray-200"
            />
            <div className="w-full">
                <span> Matematica</span>
                <span> Portugues</span>
                <span> Fisica</span>
                <span> Quimica</span>
            </div>
            
            <button type="submit" className="mt-4 bg-red-500 text-white p-4 rounded-lg flex items-center justify-center">
                <Check size={24} />
                <span className="ml-2">Deletar</span>
            </button>
        </form>
      )
    
}