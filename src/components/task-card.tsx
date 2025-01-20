import { Button } from "./ui/button"
import { Trash } from "lucide-react"
import { useState } from "react"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Input } from "./ui/input"
import { Atividade } from "@/types/types"

interface Props {
  task: Atividade
  deleteTask: (id: number) => void
  updateTask: (id: number, partial: Partial<Atividade>) => void
}

export function TaskCard({ task, deleteTask, updateTask }: Props) {
  const [mouseIsOver, setMouseIsOver] = useState(false)
  const [editMode, setEditMode] = useState(false)

  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    },
    disabled: editMode,
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

  function toggleEditMode() {
    setEditMode((prev) => !prev)
    setMouseIsOver(false)
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

  if (editMode) {
    const isOverdueSoon = checkIfOverdueSoon(task.dataEntrega)

    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="relative cursor-grab bg-background p-2.5 min-h-[140px] flex flex-col text-left rounded-xl hover:ring-2 hover:ring-inset hover:ring-ring gap-2"
      >
        <textarea
          className="border-none bg-transparent focus:outline-none resize-none h-[60px]"
          value={task.descricao}
          autoFocus
          placeholder="Digite o conteúdo da tarefa..."
          onChange={(e) => updateTask(task.id, { descricao: e.target.value })}
        />

        <Input
          type="date"
          className="border px-2 py-1 rounded focus:outline-none"
          style={{ color: isOverdueSoon ? "red" : "inherit" }}
          value={task.dataEntrega ?? ""}
          onChange={(e) => updateTask(task.id, { dataEntrega: e.target.value })}
        />

        <Button
          size="sm"
          variant="outline"
          onClick={() => {
            toggleEditMode()
          }}
        >
          Fechar
        </Button>
      </div>
    )
  }

  const isOverdueSoon = checkIfOverdueSoon(task.dataEntrega)

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={toggleEditMode}
      className="relative cursor-grab bg-background p-2.5 min-h-[100px] flex flex-col text-left rounded-xl hover:ring-2 hover:ring-inset hover:ring-ring"
      onMouseEnter={() => setMouseIsOver(true)}
      onMouseLeave={() => setMouseIsOver(false)}
    >
      <p className="mb-1 overflow-x-hidden overflow-y-auto whitespace-pre-wrap">
        {task.descricao}
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
          Prazo: {task.dataEntrega}
        </p>
      )}

      {mouseIsOver && (
        <Button
          onClick={(e) => {
            e.stopPropagation()
            deleteTask(task.id)
          }}
          className="absolute right-6 top-2"
          variant="destructive"
          size="sm"
        >
          <Trash />
        </Button>
      )}
    </div>
  )
}
