import { useEffect, useMemo, useState } from "react";
import { Column, Id, Task } from "@/types/types";
import { ColumnContainer } from "./column-container";
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove, SortableContext } from '@dnd-kit/sortable'
import { createPortal } from "react-dom";
import { TaskCard } from "./task-card";
import { Button } from "./ui/button";
import { toast } from "sonner";

const columns: Column[] = [
    {
        id: "1",
        title: "A Fazer",
        color: "#224dab"
    },
    {
        id: "2",
        title: "Em Andamento",
        color: "#FBA94C"
    },
    {
        id: "3",
        title: "Feito",
        color: "#00875F"
    }
]

export function Board() {
    const userId = localStorage.getItem("alunoLogadoId")
    const columnsId = useMemo(() => columns.map(columns => columns.id), [columns])

    const [tasks, setTasks] = useState<Task[]>([])
    const [activeColumn, setActiveColumn] = useState<Column | null >(null)
    const [activeTask, setActiveTask] = useState<Task | null>(null)

    useEffect(() => {
        const stored = localStorage.getItem(`board:${userId}`);
        if (stored) {
        setTasks(JSON.parse(stored));
        }
    }, [userId]);
    
    useEffect(() => {
        const storedTasks = localStorage.getItem(`tasks-${userId}`);
        if (storedTasks) {
          setTasks(JSON.parse(storedTasks));
        }
    }, [userId]);

    const sensors = useSensors(useSensor(PointerSensor, {
        activationConstraint: {
            distance: 3,
        }
    }))

    function generateId() {
        return Math.random().toString(36).substr(2, 9)
    }

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

    function onDragOver(event: DragEndEvent) {
        const {active, over} = event
        if (!over) return

        const activeId = active.id
        const overId = over.id

        if (activeId === overId) return

        const isActiveATask = active.data.current?.type === "Task"
        const isOverATask = over.data.current?.type === "Task"
        const isOverAColumn = over.data.current?.type === "Column"

        if (isActiveATask && isOverATask) {
            setTasks(tasks => {
                const activeIndex = tasks.findIndex(t => t.id === activeId)
                const overIndex = tasks.findIndex(t => t.id === overId)

                tasks[activeIndex].columnId = tasks[overIndex].columnId

                return arrayMove(tasks, activeIndex, overIndex)
            })
        }
        

        if (isActiveATask && isOverAColumn) {
            setTasks(tasks => {
                const activeIndex = tasks.findIndex(t => t.id === activeId)
                
                tasks[activeIndex].columnId = overId

                return arrayMove(tasks, activeIndex, activeIndex)
            })
        }
    }

    function createTask(columnId: Id) {
        const newTask: Task = {
            id: generateId(),
            columnId,
            content: `Tarefa ${tasks.length + 1}`,
            discipline: "",
            deadline: "",
        }

        setTasks([...tasks, newTask])
    }

    function deleteTask(id: Id) {
        setTasks(tasks.filter(task => task.id !== id))
    }

    function updateTask(id: Id, partial: Partial<Task>) {
        setTasks(prev => prev.map(task => {
          if (task.id !== id) return task
          return { ...task, ...partial }
        }))
    }

    const saveTasks = () => {
        localStorage.setItem(`tasks-${userId}`, JSON.stringify(tasks));
        toast.success('Alterações salvas com sucesso!');
    };
      
    return (
        <div className="flex flex-col gap-4 justify-center items-center">
            <Button onClick={saveTasks} className="mb-2 w-3/5">Salvar Alterações</Button>
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
                                    createTask={createTask}
                                    deleteTask={deleteTask}
                                    updateTask={updateTask}
                                    tasks={tasks.filter(task => task.columnId === column.id)}/>
                            ))}
                            </SortableContext>
                        </div>
                    </div>

                    {createPortal(
                    <DragOverlay>
                        {activeColumn && (
                            <ColumnContainer 
                                column={activeColumn}
                                createTask={createTask}
                                deleteTask={deleteTask}
                                updateTask={updateTask}
                                tasks={tasks.filter(task => task.columnId === activeColumn.id)} />
                        )}
                        {
                            activeTask && (
                                <TaskCard 
                                    task={activeTask} 
                                    updateTask={updateTask} 
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