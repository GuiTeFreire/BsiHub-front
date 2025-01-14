import { api } from "@/lib/axios";

interface GetTaskResponse {
    id: number,
    nome: string,
    descricao: string,
    dataEntrega: string,
    status: string,
    alunoId: number,
    disciplinaId: number,
    notaId: number
}

export async function getTask(id: number) {
    const response = await api.get<GetTaskResponse>(`/api/Atividade/${id}`);
    return response.data;
}