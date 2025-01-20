import { api } from "@/lib/axios";

interface Falta {
  id: number;
  data: string;
  motivo: string;
  horas: string;
}

interface Disciplina {
  id: number;
  nome: string;
  codigo: string;
  descricao: string;
  sala: string;
  totalHoras: number;
  professor: string;
  periodo: number;
  obrigatoria: boolean;
  faltas: Falta[];
}

export async function getClasses(): Promise<Disciplina[]> {
  const response = await api.get<Disciplina[]>('/api/Disciplina');
  return response.data;
}
