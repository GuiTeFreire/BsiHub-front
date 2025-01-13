import { api } from "@/lib/axios"

export interface RegisterStudentBody {
    nome: string
    email: string
    senha: string
    matricula: string
}

export async function registerStudent({ nome, email, senha, matricula }: RegisterStudentBody) {
    await api.post('/api/Login/Cadastro', { nome, email, senha, matricula })
}