import { useEffect, useState } from "react"
import { Helmet } from "react-helmet-async"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { v4 as uuid } from "uuid"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { Trash } from "lucide-react"

export interface Evaluation {
    id: string;      // identificador (pode ser um uuid ou um timestamp)
    name: string;    // nome da avaliação (ex: "Prova 1", "Trabalho", etc.)
    weight: number;  // peso (ex: 2, 3, 4...)
    grade: number;   // nota obtida (ex: 7.5)
  }
  
  export interface ScheduledClass {
    code: string;
    name: string;
    period: string;
    mandatory: string;
  
    teacher?: string;
    absences?: number;
    evaluations: Evaluation[];  // Lista de avaliações
  }
  

export function Schedule() {
  const navigate = useNavigate()

  // Estado local: array de disciplinas, cada uma com possible `evaluations[]`
  const [mySchedule, setMySchedule] = useState<ScheduledClass[]>([])

  // Carregamos do localStorage ao montar
  useEffect(() => {
    const stored = localStorage.getItem("myGrade")
    if (stored) {
      setMySchedule(JSON.parse(stored))
    }
  }, [])

  // Salvar as mudanças de volta no localStorage
  function handleSaveChanges() {
    localStorage.setItem("myGrade", JSON.stringify(mySchedule))
    toast.success("Grade atualizada com sucesso!")
  }

  // Atualiza campo normal (teacher, absences, etc.)
  function handleChangeField(index: number, field: keyof ScheduledClass, value: any) {
    setMySchedule((prev) => {
      const newSchedule = [...prev]
      const updatedItem = { ...newSchedule[index], [field]: value }
      newSchedule[index] = updatedItem
      return newSchedule
    })
  }

  // Adicionar nova avaliação a uma disciplina
  function handleAddEvaluation(classIndex: number) {
    setMySchedule((prev) => {
      const newSchedule = [...prev]
      const scheduleItem = { ...newSchedule[classIndex] }

      const newEval: Evaluation = {
        id: uuid(),
        name: "Avaliação",
        weight: 1,
        grade: 0,
      }

      scheduleItem.evaluations = [...(scheduleItem.evaluations || []), newEval]
      newSchedule[classIndex] = scheduleItem
      return newSchedule
    })
  }

  // Atualizar campos de uma avaliação específica
  function handleUpdateEvaluation(classIndex: number, evalId: string, field: keyof Evaluation, value: any) {
    setMySchedule((prev) => {
      const newSchedule = [...prev]
      const scheduleItem = { ...newSchedule[classIndex] }

      const updatedEvals = scheduleItem.evaluations.map((evaluation) => {
        if (evaluation.id === evalId) {
          return { ...evaluation, [field]: value }
        }
        return evaluation
      })

      scheduleItem.evaluations = updatedEvals
      newSchedule[classIndex] = scheduleItem
      return newSchedule
    })
  }

  // Remover uma avaliação
  function handleRemoveEvaluation(classIndex: number, evalId: string) {
    setMySchedule((prev) => {
      const newSchedule = [...prev]
      const scheduleItem = { ...newSchedule[classIndex] }

      scheduleItem.evaluations = scheduleItem.evaluations.filter((e) => e.id !== evalId)
      newSchedule[classIndex] = scheduleItem
      return newSchedule
    })
  }

  // Calcular média ponderada de uma disciplina
  function getWeightedAverage(evaluations: Evaluation[]) {
    if (!evaluations || evaluations.length === 0) return 0

    let sumWeighted = 0
    let sumWeights = 0
    for (const ev of evaluations) {
      sumWeighted += ev.grade * ev.weight
      sumWeights += ev.weight
    }

    // Exemplo: se sumWeights for 0, retorna 0
    return sumWeights > 0 ? sumWeighted / sumWeights : 0
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
                <TableHead>Faltas</TableHead>
                <TableHead>Avaliações</TableHead>
                <TableHead>Média</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mySchedule.map((item, index) => {
                const weightedAvg = getWeightedAverage(item.evaluations || [])
                
                return (
                  <TableRow key={item.code}>
                    <TableCell>{item.code}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.period}</TableCell>
                    <TableCell>{item.mandatory}</TableCell>

                    {/* Professor */}
                    <TableCell>
                      <Input
                        className="border px-2 py-1 w-28"
                        value={item.teacher || ""}
                        onChange={(e) => handleChangeField(index, "teacher", e.target.value)}
                      />
                    </TableCell>

                    {/* Faltas */}
                    <TableCell>
                      <Input
                        type="number"
                        min={0}
                        className="border px-2 py-1 w-16"
                        value={item.absences || 0}
                        onChange={(e) => handleChangeField(index, "absences", Number(e.target.value))}
                      />
                    </TableCell>

                    {/* Avaliações */}
                    <TableCell colSpan={1}>
                      <div className="flex flex-col gap-2">
                        {(item.evaluations || []).map((evalObj) => (
                          <div key={evalObj.id} className="flex items-center gap-2">
                            {/* Nome da avaliação */}
                            <Input
                              className="border px-2 py-1 w-24"
                              value={evalObj.name}
                              onChange={(e) =>
                                handleUpdateEvaluation(index, evalObj.id, "name", e.target.value)
                              }
                            />

                            Peso:
                            <Input
                              type="number"
                              min={0}
                              className="border px-1 py-1 w-16"
                              value={evalObj.weight}
                              onChange={(e) =>
                                handleUpdateEvaluation(index, evalObj.id, "weight", Number(e.target.value))
                              }
                            />

                            Nota:
                            <Input
                              type="number"
                              step="0.1"
                              min={0}
                              max={10}
                              className="border px-1 py-1 w-16"
                              value={evalObj.grade}
                              onChange={(e) =>
                                handleUpdateEvaluation(index, evalObj.id, "grade", Number(e.target.value))
                              }
                            />

                            <Button
                              variant="destructive"
                              size="xs"
                              onClick={() => handleRemoveEvaluation(index, evalObj.id)}
                            >
                              <Trash size={16} />
                            </Button>
                          </div>
                        ))}

                        <Button variant="outline" size="xs" onClick={() => handleAddEvaluation(index)}>
                          + Avaliação
                        </Button>
                      </div>
                    </TableCell>

                    {/* Média Ponderada */}
                    <TableCell>
                      {weightedAvg.toFixed(1)}
                    </TableCell>

                    <TableCell />
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
