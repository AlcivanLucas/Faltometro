import axios from 'axios'

export const api = axios.create({
     baseURL: 'http://localhost:3333' // aqui é em desenvolvimento
    // baseURL: 'https://faltometroserver.vercel.app' // aqui é em produção
})