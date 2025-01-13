import { api } from "@/lib/axios";

interface GetProfileResponse {
  id: number;
  nome: string;
  matricula: string;
  email: string;
}

export async function getProfile(id: number) {
  const response = await api.get<GetProfileResponse>(`/api/Aluno/${id}`);
  return response.data;
}