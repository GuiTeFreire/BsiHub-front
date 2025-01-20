import { api } from "@/lib/axios";

export interface CreateTaskBody {
    nome: string
    descricao: string
    dataEntrega: string
    status: string
    alunoId: number
    disciplinaId: number
}

interface UpdateTaskBody {
    alunoId: number
    disciplinaId: number
    notaId: number
    nome: string
    descricao: string
    dataEntrega: string
    status: string
}

interface Aluno {
    id: number
    nome: string
    matricula: string
    email: string
  }
  
  interface Falta {
    id: number
    data: string
    motivo: string
    horas: string
  }
  
  interface Disciplina {
    id: number
    nome: string
    codigo: string
    descricao: string
    sala: string
    totalHoras: number
    professor: string
    periodo: number
    obrigatoria: boolean
    faltas: Falta[]
  }
  
  interface Nota {
    id: number
    valor: number
    dataAvaliacao: string
    peso: number
  }
  
interface Atividade {
    id: number
    nome: string
    descricao: string
    dataEntrega: string
    status: string
    aluno: Aluno
    disciplina: Disciplina
    nota: Nota
  }

export async function createTask(taskDetails: CreateTaskBody) {
    await api.post('/api/Atividade', {
        nome: taskDetails.nome,
        descricao: taskDetails.descricao,
        dataEntrega: taskDetails.dataEntrega,
        status: taskDetails.status,
        alunoId: taskDetails.alunoId,
        disciplinaId: taskDetails.disciplinaId,
    })
}

export async function deleteTask(id: number) {
    await api.delete(`/api/Atividade/${id}`)
}

export async function updateTask(id: number, updateData: Partial<UpdateTaskBody>): Promise<void> {
    await api.put(`/api/Atividade/${id}`, updateData)
}


export async function getTasks(alunoId: number): Promise<Atividade[]> {
  const response = await api.get<Atividade[]>(`/api/Atividade/Aluno`, {
    params: { id: alunoId }
  });
  return response.data
}

export async function getTaskById(id: number): Promise<Atividade> {
    const response = await api.get<Atividade>(`/api/Atividade/${id}`)
    return response.data
}