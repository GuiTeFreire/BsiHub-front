import { Id, Task } from "@/types/types"
import { Button } from "./ui/button"
import { Trash } from "lucide-react"
import { useState } from "react"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Input } from "./ui/input"

interface Props {
  task: Task
  deleteTask: (id: Id) => void
  // Agora, updateTask aceita um objeto parcial (partial: Partial<Task>)
  updateTask: (id: Id, partial: Partial<Task>) => void
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

  // Estilo da animação DnD
  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  }

  // Função que verifica se faltam menos de 7 dias para deadline
  function checkIfOverdueSoon(deadline?: string) {
    if (!deadline) return false
    const now = new Date()
    const deadlineDate = new Date(deadline)

    const diffMs = deadlineDate.getTime() - now.getTime()
    const diffDays = diffMs / (1000 * 60 * 60 * 24)

    return diffDays < 7
  }

  // Toggle de edição
  function toggleEditMode() {
    setEditMode((prev) => !prev)
    setMouseIsOver(false)
  }

  // Se estiver arrastando, exibe placeholder "fantasma"
  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="relative cursor-grab bg-background p-2.5 h-[100px] min-h-[100px] flex rounded-xl border-2 border-muted-foreground opacity-30"
      />
    )
  }

  // --- MODO EDIÇÃO ---
  if (editMode) {
    // Verifica se a deadline atual está a menos de 7 dias
    const isOverdueSoon = checkIfOverdueSoon(task.deadline)

    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="relative cursor-grab bg-background p-2.5 min-h-[140px] flex flex-col text-left rounded-xl hover:ring-2 hover:ring-inset hover:ring-ring gap-2"
      >
        {/* Campo de Conteúdo (descrição da tarefa) */}
        <textarea
          className="border-none bg-transparent focus:outline-none resize-none h-[60px]"
          value={task.content}
          autoFocus
          placeholder="Digite o conteúdo da tarefa..."
          onChange={(e) => updateTask(task.id, { content: e.target.value })}
        />

        {/* Campo de Disciplina */}
        <Input
          className="border px-2 py-1 rounded focus:outline-none"
          placeholder="Disciplina"
          value={task.discipline ?? ""}
          onChange={(e) => updateTask(task.id, { discipline: e.target.value })}
        />

        {/* Campo de Prazo (deadline) */}
        <Input
          type="date"
          className="border px-2 py-1 rounded focus:outline-none"
          style={{ color: isOverdueSoon ? "red" : "inherit" }}
          value={task.deadline ?? ""}
          onChange={(e) => updateTask(task.id, { deadline: e.target.value })}
        />

        <Button
          size="sm"
          variant="outline"
          onClick={() => {
            toggleEditMode() // sai do modo edição
          }}
        >
          Fechar
        </Button>
      </div>
    )
  }

  // --- MODO VISUALIZAÇÃO ---
  const isOverdueSoon = checkIfOverdueSoon(task.deadline)

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
      {/* Conteúdo da tarefa */}
      <p className="mb-1 overflow-x-hidden overflow-y-auto whitespace-pre-wrap">
        {task.content}
      </p>

      {/* Disciplina se existir */}
      {task.discipline && (
        <p className="text-sm text-muted-foreground">
          Disciplina: {task.discipline}
        </p>
      )}

      {/* Deadline (prazo) se existir */}
      {task.deadline && (
        <p
          className="text-sm"
          style={{ color: isOverdueSoon ? "red" : "inherit" }}
        >
          Prazo: {task.deadline}
        </p>
      )}

      {/* Botão de excluir aparece ao passar mouse */}
      {mouseIsOver && (
        <Button
          onClick={(e) => {
            e.stopPropagation() // não entrar no modo edição
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
