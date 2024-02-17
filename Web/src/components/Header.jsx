import { Plus, X } from 'phosphor-react'
import * as Dialog from '@radix-ui/react-dialog';// Radix-ui
import { useState } from 'react'

import logoImage from '../assets/logo.svg';
import { NewDisciplineForm } from './NewDisciplineForm';
import { DeleteDisciplineForm } from './DeleteDisciplineForm';

import NewDisciplineModal from './NewDisciplineModal'
import DeleteDisciplineModal from './DeleteDisciplineModal'

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
            <NewDisciplineModal/>
            <DeleteDisciplineModal/>
            <div>
                <Button 
                    Text="Sair" 
                    onClick={() => [signout(), navigate("/")]}
                >
                        Sair
                </Button>
            </div>
        </div>
    )
}