export type Column = {
    id: number
    title: string
    color: string
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
  
  export interface Atividade {
    id: number
    nome: string
    descricao: string
    dataEntrega: string
    status: string
    aluno: Aluno
    disciplina: Disciplina
    nota: Nota
  }