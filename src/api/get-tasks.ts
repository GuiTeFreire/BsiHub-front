import { api } from "@/lib/axios";

interface GetTasksResponse {
    id: number,
    nome: string,
    descricao: string,
    dataEntrega: string,
    status: string,
    alunoId: number,
    disciplinaId: number,
    notaId: number
}

export async function getTask() {
    const response = await api.get<GetTasksResponse[]>(`/api/Atividade/`);
    return response.data;
}