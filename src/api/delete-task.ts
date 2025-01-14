import { api } from "@/lib/axios";

export async function deleteTask(id: number) {
    await api.delete(`/api/Atividade/${id}`)
}