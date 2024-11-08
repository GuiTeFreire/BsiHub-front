import { Id, Task } from "@/types/types"
import { Button } from "./ui/button"
import { Trash } from "lucide-react"
import { useState } from "react"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"

interface Props {
    task: Task
    deleteTask: (id: Id) => void
    updateTask: (id: Id, content: string) => void
}

export function TaskCard({task, deleteTask, updateTask}: Props) {
    const [mouseIsOver, setMouseIsOver] = useState(false)
    const [editMode, setEditMode] = useState(false)

    const { setNodeRef, attributes, listeners, transform, transition, isDragging} = useSortable({
        id: task.id,
        data: {
            type: "Task",
            task,
        },
        disabled: editMode
    })

    const style = {
        transition,
        transform: CSS.Transform.toString(transform)
    }

    if (isDragging) {
        return <div ref={setNodeRef} style={style} className="relative cursor-grab bg-background p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl border-2 border-muted-foreground opacity-30" />
    }

    const toggleEditMode = () => {
        setEditMode(prev => !prev)
        setMouseIsOver(false)
    }

    if (editMode) {
        return (
            <div 
                ref={setNodeRef} 
                style={style}
                {...attributes}
                {...listeners} 
                className="relative cursor-grab bg-background p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl hover:ring-2 hover:ring-inset hover:ring-ring">
                
                <textarea 
                    className="h-[90%] w-full resize-none border-none bg-transparent focus:outline-none"
                    value={task.content}
                    autoFocus
                    placeholder="Digite o conteúdo da tarefa..."
                    onBlur={toggleEditMode}
                    onKeyDown={e => {
                        if (e.key === "Enter" && e.shiftKey) toggleEditMode()
                    }}
                    onChange={e => updateTask(task.id, e.target.value)}
                >
                </textarea>
            </div>
        )
    }

    return (
        <div
            ref={setNodeRef} 
            style={style}
            {...attributes}
            {...listeners} 
            onClick={toggleEditMode} 
            className="relative cursor-grab bg-background p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl hover:ring-2 hover:ring-inset hover:ring-ring"
            onMouseEnter={() => {
                setMouseIsOver(true)
            }}
            onMouseLeave={() => {
                setMouseIsOver(false)
            }}>

            <p className="my-auto h-[90%] w-full overflow-x-hidden overflow-y-auto whitespace-pre-wrap">{task.content}</p>

            {mouseIsOver && (
                <Button onClick={() => deleteTask(task.id)} className="absolute right-6 p-3" variant='destructive'><Trash /></Button>
            )}
        </div>
    )
}