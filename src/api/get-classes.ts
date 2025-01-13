import { api } from "@/lib/axios";

export async function getClasses() {
    const response = await api.get('/api/Disciplina')
    return response.data
}