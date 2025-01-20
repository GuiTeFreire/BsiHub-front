import { useEffect, useMemo, useState } from "react"
import { Atividade, Column } from "@/types/types"
import { ColumnContainer } from "./column-container"
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove, SortableContext } from '@dnd-kit/sortable'
import { createPortal } from "react-dom"
import { TaskCard } from "./task-card"
import { toast } from "sonner"
import { useMutation } from "@tanstack/react-query"
import { z } from "zod"
import { createTask, deleteTask, getTasks, updateTask } from "@/api/task"

const columns: Column[] = [
    {
        id: 1,
        title: "Pendente",
        color: "#224dab"
    },
    {
        id: 2,
        title: "Em Progresso",
        color: "#FBA94C"
    },
    {
        id: 3,
        title: "Concluída",
        color: "#00875F"
    }
]

interface UpdateTaskBody {
    alunoId: number;
    disciplinaId: number;
    notaId: number;
    nome: string;
    descricao: string;
    dataEntrega: string;
    status: string;
  }

export const createTaskForm = z.object({
    nome: z.string(),
    descricao: z.string(),
    dataEntrega: z.string(),
    status: z.string(),
    alunoId: z.number(),
    disciplinaId: z.number()
})

export type CreateTaskForm = z.infer<typeof createTaskForm>

export function Board() {
    const columnsId = useMemo(() => columns.map(columns => columns.id), [columns])

    const [tasks, setTasks] = useState<Atividade[]>([])
    const [activeColumn, setActiveColumn] = useState<Column | null >(null)
    const [activeTask, setActiveTask] = useState<Atividade | null>(null)

    const storedUser = localStorage.getItem("alunoLogado")
    const user = storedUser ? JSON.parse(storedUser) : null
    const alunoId = user?.id

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const fetchedTasks = await getTasks(alunoId)
                setTasks(fetchedTasks)
                console.log("Tarefas:", tasks)
            } catch (error) {
                toast.error("Erro ao carregar as tarefas")
            }
        }
    
        if (alunoId) {
            fetchTasks()
        }
    }, [alunoId])
    
    const { mutateAsync: createTaskFn } = useMutation({
        mutationFn: createTask
    })

    async function handleCreateTask(taskDetails: CreateTaskForm) {
        try {
            await createTaskFn({
                nome: taskDetails.nome,
                descricao: taskDetails.descricao,
                dataEntrega: taskDetails.dataEntrega,
                status: taskDetails.status,
                alunoId: taskDetails.alunoId,
                disciplinaId: taskDetails.disciplinaId
            })
            toast.success('Tarefa criada com sucesso!');
        } catch (error) {
            toast.error('Erro ao criar a tarefa');
        }
    }

    const sensors = useSensors(useSensor(PointerSensor, {
        activationConstraint: {
            distance: 3,
        }
    }))

    function onDragStart(event: DragStartEvent) {
        if (event.active.data.current?.type === "Column") {
            setActiveColumn(event.active.data.current.column)

            return
        }

        if (event.active.data.current?.type === "Task") {
            setActiveTask(event.active.data.current.task)
            return
        }
    }

    function onDragEnd(event: DragEndEvent) {
        setActiveColumn(null)
        setActiveTask(null)

        const {active, over} = event
        if (!over) return

        const activeColumnId = active.id
        const overColumnId = over.id

        if (activeColumnId === overColumnId) return
    }

    async function onDragOver(event: DragEndEvent) {
        const { active, over } = event;
        if (!over) return;
    
        const activeId = active.id;
        const overId = over.id;
    
        if (activeId === overId) return;
    
        const isActiveATask = active.data.current?.type === "Task";
        const isOverAColumn = over.data.current?.type === "Column";
    
        if (isActiveATask && isOverAColumn) {
            const updatedStatus =
                over.id === 1
                    ? "pendente"
                    : over.id === 2
                    ? "em progresso"
                    : "concluida";
    
            setTasks((tasks) =>
                tasks.map((task) =>
                    task.id === active.id
                        ? { ...task, status: updatedStatus }
                        : task
                )
            );
    
            try {
                const taskId = Number(active.id); // Certifique-se de que é um número
                const taskToUpdate = tasks.find((task) => task.id === taskId);
    
                if (!taskToUpdate) {
                    console.error("Tarefa não encontrada para o ID:", taskId);
                    toast.error("Tarefa não encontrada!");
                    return;
                }
    
                // Adicione verificações para os objetos aninhados
                const alunoId = taskToUpdate.aluno?.id || 0; // Valor padrão caso esteja ausente
                const disciplinaId = taskToUpdate.disciplina?.id || 0;
                const notaId = taskToUpdate.nota?.id || 0;
    
                // Preencher o corpo da requisição com os valores existentes
                const updateBody = {
                    alunoId,
                    disciplinaId,
                    notaId,
                    nome: taskToUpdate.nome,
                    descricao: taskToUpdate.descricao,
                    dataEntrega: taskToUpdate.dataEntrega,
                    status: updatedStatus,
                };
    
                console.log("Dados enviados para atualização:", updateBody);
    
                await updateTask(taskId, updateBody);
    
                toast.success("Tarefa atualizada com sucesso!");
            } catch (error) {
                console.error("Erro na atualização:", error);
                toast.error("Erro ao atualizar o status da tarefa");
            }
        }
    }
    
    
    

    async function handleDeleteTask(id: number) {
        try {
          await deleteTask(id);
          toast.success("Tarefa deletada com sucesso!");
          const fetchedTasks = await getTasks(alunoId);
          setTasks(fetchedTasks);
        } catch (error) {
          toast.error("Erro ao deletar tarefa");
        }
      }
      

      async function handleUpdateTask(id: number, partial: Partial<UpdateTaskBody>) {
        try {
          await updateTask(id, partial as UpdateTaskBody);
          toast.success("Tarefa atualizada com sucesso!");
          const fetchedTasks = await getTasks(alunoId);
          setTasks(fetchedTasks);
        } catch (error) {
          toast.error("Erro ao atualizar tarefa");
        }
      }
      
      
    return (
        <div className="flex flex-col gap-4 justify-center items-center">
            <div className="m-auto flex w-full items-center overflow-x-auto overflow-y-hidden px-[40px]">  
                <DndContext 
                    sensors={sensors} 
                    onDragStart={onDragStart} 
                    onDragEnd={onDragEnd}
                    onDragOver={onDragOver} >
                    <div className="m-auto flex gap-4">
                        <div className="flex gap-4">
                            <SortableContext items={columnsId}>
                            {columns.map((column) => (
                                <ColumnContainer 
                                    key={column.id} 
                                    column={column}
                                    createTask={handleCreateTask}
                                    deleteTask={handleDeleteTask}
                                    updateTask={handleUpdateTask}
                                    tasks={tasks.filter(task => {
                                        if (column.id === 1) return task.status === "pendente"
                                        if (column.id === 2) return task.status === "em progresso"
                                        if (column.id === 3) return task.status === "concluida"
                                        return false
                                    })}/>
                            ))}
                            </SortableContext>
                        </div>
                    </div>

                    {createPortal(
                    <DragOverlay>
                        {activeColumn && (
                            <ColumnContainer 
                                column={activeColumn}
                                createTask={handleCreateTask}
                                deleteTask={deleteTask}
                                updateTask={handleUpdateTask}
                                tasks={tasks.filter(task => {
                                    if (activeColumn.id === 1) return task.status === "pendente"
                                    if (activeColumn.id === 2) return task.status === "em progresso"
                                    if (activeColumn.id === 3) return task.status === "concluida"
                                    return false
                                })} />
                        )}
                        {
                            activeTask && (
                                <TaskCard 
                                    task={activeTask} 
                                    updateTask={handleUpdateTask} 
                                    deleteTask={deleteTask} />
                            )
                        }
                    </DragOverlay>, document.body
                    )}
                </DndContext>
            </div>
        </div>
    )
}