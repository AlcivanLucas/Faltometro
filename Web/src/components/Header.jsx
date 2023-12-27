import { Plus, X } from 'phosphor-react'
import * as Dialog from '@radix-ui/react-dialog';// Radix-ui
import { useState } from 'react'

import logoImage from '../assets/logo.svg';
import { NewDisciplineForm } from './NewDisciplineForm';
// import { DeleteDisciplineForm } from './DeleteDisciplineForm';

import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Button from "./Button";

//programação imperativa vs declarativa (react)
//modal aula 03 
export function Header() {
    const { signout } = useAuth();
    const navigate = useNavigate();
    
    return (
        <div className="w-full max-w-3xl mx-auto flex items-center justify-between">
            <img src={logoImage} alt="" />

            <Dialog.Root>
                <Dialog.Trigger
                    type="button"
                    className="border border-red-500 font-semibold rounded-lg px-6 py-4 flex items-center gap-3 hover:border-red-300 transition-colors focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-background"
                >
                    <Plus size={20} className="text-red-500" />
                    Adicionar disciplina
                </Dialog.Trigger>

                <Dialog.Trigger
                    type="button"
                    className="border border-red-500 font-semibold rounded-lg px-6 py-4 flex items-center gap-3 hover:border-red-300 transition-colors focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-background"
                >
                    <X size={20} className="text-red-500" />
                    Deletar disciplina
                </Dialog.Trigger>   
                
                <div>
                    <Button 
                        Text="Sair" 
                        onClick={() => [signout(), navigate("/")]}
                    >
                            Sair
                    </Button>
                </div>

                
                 <Dialog.Portal>  {/* tira o conteúdo de dentro do header*/}
                    <Dialog.Overlay className="w-screen h-screen bg-black/80 fixed inset-0" />

                    <Dialog.Content className="absolute p-10 bg-zinc-900 rounded-2xl w-full max-w-md top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" >
                        <Dialog.Close className="absolute right-6 top-6 text-zinc-400 rounded-lg hover:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 focus:ring-offset-zinc-900" >
                            <X size={24} arial-label="Fechar" />
                        </Dialog.Close>

                        <Dialog.Title className="text-3xl leading-tight font-extrabold">
                            Adicionar disciplina
                        </Dialog.Title>

                        <NewDisciplineForm />
                    </Dialog.Content>
                </Dialog.Portal>

            </Dialog.Root>
        </div>
    )
}