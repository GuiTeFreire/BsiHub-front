import { api } from "@/lib/axios"

export interface SignInBody {
    matricula: string
    senha: string
}

export async function signIn({ matricula, senha }: SignInBody) {
    const response = await api.post('/api/Login', { matricula, senha })
    return response.data
}