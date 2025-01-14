import { api } from "@/lib/axios"

export interface CreateTaskBody {
    id: number,
    nome: string,
    descricao: string,
    dataEntrega: string,
    status: string,
    alunoId: number,
    disciplinaId: number,
}

export async function createTask({ descricao, dataEntrega, status, disciplinaId }: CreateTaskBody) {
    await api.post('/api/Atividade', { descricao, dataEntrega, status, disciplinaId })
}