import { useEffect, useState } from "react"
import { Helmet } from "react-helmet-async"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { getStudentGrade } from "@/api/get-student-class"
import { updateDisciplina } from "@/api/update-classes"
import { api } from "@/lib/axios"
import { Plus } from "lucide-react"

interface Falta {
  id: number
  data: string
  motivo: string
  horas: string
}

export interface ScheduledClass {
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
  novaFalta: { horas: string, data: string }
}

export function Schedule() {
  const navigate = useNavigate()

  const [mySchedule, setMySchedule] = useState<ScheduledClass[]>([])

  const storedUser = localStorage.getItem("alunoLogado")
  const user = storedUser ? JSON.parse(storedUser) : null
  const alunoId = user?.id

  useEffect(() => {
    const fetchStudentGrade = async () => {
      try {
        const studentGrade = await getStudentGrade(alunoId)
        const gradeWithFalta = studentGrade.map(disciplina => ({
          ...disciplina,
          novaFalta: { horas: '', data: new Date().toISOString().slice(0, 10) }
        }));
        setMySchedule(gradeWithFalta)
      } catch (error) {
        toast.error("Erro ao carregar disciplinas")
      }
    };
  
    fetchStudentGrade()
  }, [alunoId])
  
  function handleSaveChanges() {
    Promise.all(mySchedule.map(disciplina => {
      const { id, nome, codigo, descricao, sala, totalHoras, professor, periodo, obrigatoria } = disciplina;
      return updateDisciplina(id, { nome, codigo, descricao, sala, totalHoras, professor, periodo, obrigatoria });
    })).then(results => {
      if (results.every(result => result !== null)) {
        toast.success("Todas as disciplinas foram atualizadas com sucesso!")
      } else {
        toast.error("Algumas disciplinas não foram atualizadas corretamente.")
      }
    })
  }

  function handleChangeField(index: number, field: keyof ScheduledClass | 'faltasHoras', value: any) {
    setMySchedule(prev => {
        const newSchedule = [...prev]
        const updatedItem = { ...newSchedule[index] }

        if (field === "faltasHoras") {
            updatedItem.faltas = updatedItem.faltas.map(falta => ({
                ...falta,
                horas: value
            }));
        } else if (field in updatedItem) {
            (updatedItem as any)[field] = value
        }

        newSchedule[index] = updatedItem
        return newSchedule
    })
}

function handleChangeFalta(index: number, value: string) {
  setMySchedule(prev => {
    const newSchedule = [...prev]
    newSchedule[index].novaFalta.horas = value
    return newSchedule
  })
}

const handleAddFalta = async (index: number) => {
  const disciplina = mySchedule[index]
  const { id, novaFalta } = disciplina

  if (novaFalta.horas.trim() === "") {
    toast.error("Informe as horas da falta.")
    return
  }

  try {
    const response = await api.post(`/api/Disciplina/${id}/Aluno/${alunoId}/Falta`, {
      horas: novaFalta.horas,
      data: novaFalta.data,
      motivo: "Absent"
    })
    if (response.data) {
      setMySchedule(prev => {
        const newSchedule = [...prev]
        newSchedule[index].faltas.push(response.data)
        newSchedule[index].novaFalta.horas = ''
        return newSchedule;
      });
      toast.success("Falta registrada com sucesso!")
    }
  } catch (error) {
    toast.error("Erro ao registrar a falta.")
  }
}

return (
    <>
      <Helmet title="Schedule" />
      <div className="flex flex-col items-center gap-8">
        <h1 className="text-3xl font-bold tracking-tight">Minha Grade de Disciplinas</h1>

        <div className="w-full max-w-8xl border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Código</TableHead>
                <TableHead>Disciplina</TableHead>
                <TableHead>Período</TableHead>
                <TableHead>Obrigatória?</TableHead>
                <TableHead>Professor</TableHead>
                <TableHead>Sala</TableHead>
                <TableHead>Faltas (Horas)</TableHead>
                <TableHead>Percentual de faltas</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mySchedule.map((item, index) => {                
                return (
                  <TableRow key={item.id}>
                    <TableCell>{item.codigo}</TableCell>
                    <TableCell>{item.nome}</TableCell>
                    <TableCell>{item.periodo}</TableCell>
                    <TableCell>{item.obrigatoria ? "Obrigatória" : "Optativa"}</TableCell>

                    {/* Professor */}
                    <TableCell>
                      <Input
                        className="border px-2 py-1 w-28"
                        value={item.professor || ""}
                        onChange={(e) => handleChangeField(index, "professor", e.target.value)}
                      />
                    </TableCell>

                    {/* Sala */}
                    <TableCell>
                      <Input
                        className="border px-2 py-1 w-28"
                        value={item.sala || ""}
                        onChange={(e) => handleChangeField(index, "sala", e.target.value)}
                      />
                    </TableCell>

                    {/* Faltas */}
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="px-2 py-1">
                          {item.faltas.reduce((acc, falta) => acc + parseFloat(falta.horas), 0).toFixed(0)}
                        </span>
                      </div>
                    </TableCell>

                    <TableCell>
                      {item.faltas && item.totalHoras > 0 ? `${(item.faltas.reduce((acc, falta) => acc + Number(falta.horas), 0) / item.totalHoras * 100).toFixed(2)}%` : "0%"}
                    </TableCell>

                    <TableCell>
                      <div className="mt-2 flex flex-row gap-2">
                        <Input
                          type="number"
                          placeholder="Adicionar horas de falta"
                          value={item.novaFalta.horas}
                          onChange={e => handleChangeFalta(index, e.target.value)}
                        />
                        <Button size='default' onClick={() => handleAddFalta(index)}><Plus /></Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>

        {/* Botões de ação */}
        <div className="flex gap-4">
          <Button onClick={handleSaveChanges}>Salvar alterações</Button>

          <Button variant="outline" onClick={() => navigate("/board")}>
            Ir para quadro de atividades
          </Button>
        </div>
      </div>
    </>
  )
}
