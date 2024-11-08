import { Column, Id, Task } from "@/types/types"
import { Button } from "./ui/button"
import { Plus } from "lucide-react"
import { SortableContext, useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { useMemo, useState } from "react"
import { TaskCard } from "./task-card"

interface Props {
    column: Column

    createTask: (columnId: Id) => void
    deleteTask: (id: Id) => void
    updateTask: (id: Id, content: string) => void
    tasks: Task[]
}

export function ColumnContainer(props: Props) {
    const { column, createTask, tasks, deleteTask, updateTask } = props

    const [editMode, setEditMode] = useState(false)

    const tasksIds = useMemo(() => {
        return tasks.map(task => task.id)
    }, [tasks])

    const { setNodeRef, attributes, listeners, transform, transition, isDragging} = useSortable({
        id: column.id,
        data: {
            type: "Column",
            column
        },
        disabled: editMode
    })

    const style = {
        transition,
        transform: CSS.Transform.toString(transform)
    }

    if (isDragging) {
        return <div ref={setNodeRef} style={style} className="flex flex-col gap-4 w-[550px] min-w-[550px] h-[750px] max-h-[750px] bg-secondary rounded-md border-2 border-muted-foreground opacity-30"></div>
    }

    return (
        <div ref={setNodeRef} style={style} className="flex flex-col gap-4 w-[550px] min-w-[550px] h-[750px] max-h-[750px] bg-secondary rounded-md border-2 border-muted-foreground">
            <div 
            {...attributes} 
            {...listeners} 
            onClick={() => setEditMode(true)} 
            className="flex items-center justify-between text-md font-bold h-[60px] cursor-grab rounded-md rounded-b-none p-3 border-4 bg-popover">
                <div className="flex gap-2">
                    <div className="flex justify-center items-center px-3 py-1 text-sm rounded-full" style={{ backgroundColor: column.color }}></div>
                    {column.title}                    
                </div>
            </div>

            <div className="flex flex-grow flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto h-full">       
                <SortableContext items={tasksIds}>
                    {tasks.map(task => (
                        <TaskCard updateTask={updateTask} deleteTask={deleteTask} key={task.id} task={task} />
                    ))}
                </SortableContext>
            </div>

            <Button onClick={() => createTask(column.id)} variant="secondary" className="cursor-pointer rounded-lg hover:bg-muted-foreground">
                <Plus />Adicionar Tarefa
            </Button>
        </div>
    )
}