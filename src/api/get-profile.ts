import { api } from "@/lib/axios";

interface GetProfileResponse {
    id: number
    nome: string
    email: string
    matricula: string
}

export async function getProfile() {
    const response = await api.get<GetProfileResponse>('/api/Aluno')

    return response.data
}