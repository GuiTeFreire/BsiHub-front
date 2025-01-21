import { Button } from "./ui/button"
import { Expand, Trash } from "lucide-react"
import { useState } from "react"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Atividade } from "@/types/types"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Label } from "./ui/label"

interface Props {
  task: Atividade
  deleteTask: (id: number) => void
  updateTask: (id: number, partial: Partial<Atividade>) => void
}

export function TaskCard({ task, deleteTask }: Props) {
  const [mouseIsOver, setMouseIsOver] = useState(false)

  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: task.id ?? "unknown",
    data: {
      type: "Task",
      task,
    }
  })

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  }

  function checkIfOverdueSoon(deadline?: string) {
    if (!deadline) return false
    const now = new Date()
    const deadlineDate = new Date(deadline)

    const diffMs = deadlineDate.getTime() - now.getTime()
    const diffDays = diffMs / (1000 * 60 * 60 * 24)

    return diffDays < 7
  }

  const handleDeleteTask = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    if (task.id) {
      deleteTask(task.id)
    } else {
      console.error("Tarefa sem ID não pode ser deletada")
    }
  }

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="relative cursor-grab bg-background p-2.5 h-[100px] min-h-[100px] flex rounded-xl border-2 border-muted-foreground opacity-30"
      />
    )
  }

  const isOverdueSoon = checkIfOverdueSoon(task.dataEntrega)

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="relative cursor-grab bg-background p-2.5 min-h-[100px] flex flex-col text-left rounded-xl hover:ring-2 hover:ring-inset hover:ring-ring"
      onMouseEnter={() => setMouseIsOver(true)}
      onMouseLeave={() => setMouseIsOver(false)}
    >
      <p className="mb-1 overflow-x-hidden overflow-y-auto whitespace-pre-wrap">
        {task.descricao || "Sem descrição"}
      </p>

      {task.disciplina && (
        <p className="text-sm text-muted-foreground">
          Disciplina: {task.disciplina.nome}
        </p>
      )}

      {task.dataEntrega && (
        <p
          className="text-sm"
          style={{ color: isOverdueSoon ? "red" : "inherit" }}
        >
          Prazo: {task.dataEntrega.split("T")[0]}
        </p>
      )}

      {mouseIsOver && (
        <><Button onClick={handleDeleteTask} className="absolute right-6 top-14"variant="destructive" size="sm">
            <Trash />
        </Button>

        <Dialog>
            <DialogTrigger asChild>
                <Button variant="secondary" className="absolute right-6 top-2" size="sm">
                    <Expand />
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Detalhes da tarefa</DialogTitle>
                </DialogHeader>

                <DialogDescription>
                    <div className="flex flex-col gap-4 py-4">
                        <div className="flex flex-row items-center gap-4">
                            <Label htmlFor="nome" className="text-right">Nome</Label>
                            {task.nome}
                        </div>
                        <div className="flex flex-row items-center gap-4">
                            <Label htmlFor="decricao" className="text-right">Descrição</Label>
                            {task.descricao}
                        </div>
                        <div className="flex flex-row items-center gap-4">
                            <Label htmlFor="dataEntrega" className="text-right">Data de Entrega</Label>
                            {task.dataEntrega.split("T")[0]}
                        </div>
                        <div className="flex flex-row items-center gap-4">
                            <Label htmlFor="disciplina" className="text-right">Disciplina</Label>
                            {task.disciplina.nome}
                        </div>
                    </div>
                </DialogDescription>
            </DialogContent>
        </Dialog>
        </>
      )}
    </div>
  )
}
