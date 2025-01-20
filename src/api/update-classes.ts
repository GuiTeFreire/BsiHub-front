import { api } from "@/lib/axios"

interface DisciplinaAlteracaoDto {
    nome: string;
    codigo: string;
    descricao: string;
    sala: string;
    totalHoras: number;
    professor: string;
    periodo: number;
    obrigatoria: boolean;
}
  
interface DisciplinaDto {
    id: number;
    nome: string;
    codigo: string;
    descricao: string;
    sala: string;
    totalHoras: number;
    professor: string;
    periodo: number;
    obrigatoria: boolean;
}


export async function updateDisciplina(id: number, data: DisciplinaAlteracaoDto): Promise<DisciplinaDto | null> {
    const response = await api.put<DisciplinaDto>(`/api/Disciplina/${id}`, data);
    return response.data;
}
