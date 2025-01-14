import { api } from "@/lib/axios";

interface UpdateTaskBody {
    descricao: string,
    disciplinaId: number,
    dataEntrega: string,
}

export async function updateTask(id: number, { descricao, disciplinaId, dataEntrega }: UpdateTaskBody) {
    await api.put(`/api/Atividade/${id}`, { descricao, disciplinaId, dataEntrega })
}