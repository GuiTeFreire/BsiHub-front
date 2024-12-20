import { useMemo, useState } from "react";
import { Column, Id, Task } from "@/types/types";
import { ColumnContainer } from "./column-container";
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove, SortableContext } from '@dnd-kit/sortable'
import { createPortal } from "react-dom";
import { TaskCard } from "./task-card";

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
    const columnsId = useMemo(() => columns.map(columns => columns.id), [columns])

    const [tasks, setTasks] = useState<Task[]>([])

    const [activeColumn, setActiveColumn] = useState<Column | null >(null)

    const [activeTask, setActiveTask] = useState<Task | null>(null)

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
            content: `Tarefa ${tasks.length + 1}`
        }

        setTasks([...tasks, newTask])
    }

    function deleteTask(id: Id) {
        setTasks(tasks.filter(task => task.id !== id))
    }

    function updateTask(id: Id, content: string) {
        const newTasks = tasks.map(task => {
            if (task.id !== id) return task
            return {...task, content}
        })

        setTasks(newTasks)
    }

    return (
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
    )
}