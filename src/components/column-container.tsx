import { Atividade, Column } from "@/types/types"
import { Button } from "./ui/button"
import { Plus } from "lucide-react"
import { SortableContext, useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { useEffect, useState } from "react"
import { TaskCard } from "./task-card"
import { CreateTaskForm } from "./kanban-board"
import { Input } from "./ui/input"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { getStudentGrade } from "@/api/get-student-class"
import { toast } from "sonner"
import { Label } from "./ui/label"

interface Props {
    column: Column
    createTask: (taskDetails: CreateTaskForm) => void
    deleteTask: (id: number) => void
    updateTask: (id: number, partial: Partial<UpdateTaskBody>) => void
    tasks: Atividade[]
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
  }

  interface UpdateTaskBody {
    alunoId: number;
    disciplinaId: number;
    notaId: number;
    nome: string;
    descricao: string;
    dataEntrega: string;
    status: string;
  }

  export function ColumnContainer(props: Props) {
    const { column, createTask, deleteTask, updateTask, tasks } = props;

    const [editMode, setEditMode] = useState(false);

    const [nome, setNome] = useState("");
    const [descricao, setDescricao] = useState("");
    const [dataEntrega, setDataEntrega] = useState("");
    const [status, setStatus] = useState("pendente");
    const [disciplinaId, setDisciplinaId] = useState(0);

    const storedUser = localStorage.getItem("alunoLogado");
    const user = storedUser ? JSON.parse(storedUser) : null;
    const alunoId = user?.id;

    const [mySchedule, setMySchedule] = useState<ScheduledClass[]>([]);

    useEffect(() => {
        const fetchStudentGrade = async () => {
            try {
                const studentGrade = await getStudentGrade(alunoId);
                setMySchedule(studentGrade);
            } catch (error) {
                toast.error("Erro ao carregar disciplinas");
            }
        };

        fetchStudentGrade();
    }, [alunoId]);

    const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
        id: column.id,
        data: {
            type: "Column",
            column,
        },
        disabled: editMode,
    });

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    };

    if (isDragging) {
        return (
            <div
                ref={setNodeRef}
                style={style}
                className="flex flex-col gap-4 w-[550px] min-w-[550px] h-[750px] max-h-[750px] bg-secondary rounded-md border-2 border-muted-foreground opacity-30"
            ></div>
        )
    }

    const handleSubmit = () => {
        const taskDetails = {
            id: Math.random().toString(36).substr(2, 9),
            nome,
            descricao,
            dataEntrega,
            status,
            alunoId: alunoId,
            disciplinaId,
        }
        createTask(taskDetails)
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="flex flex-col gap-4 w-[550px] min-w-[550px] h-[750px] max-h-[750px] bg-secondary rounded-md border-2 border-muted-foreground"
        >
            <div
                {...attributes}
                {...listeners}
                onClick={() => setEditMode(true)}
                className="flex items-center justify-between text-md font-bold h-[60px] cursor-grab rounded-md rounded-b-none p-3 border-4 bg-popover"
            >
                <div className="flex gap-2">
                    <div
                        className="flex justify-center items-center px-3 py-1 text-sm rounded-full"
                        style={{ backgroundColor: column.color }}
                    ></div>
                    {column.title}
                </div>
            </div>

            <div className="flex flex-grow flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto h-full">
                <SortableContext items={tasks.map((task) => task.id)}>
                    {tasks.map((task) => (
                        <TaskCard
                            deleteTask={deleteTask}
                            updateTask={updateTask}
                            key={task.id}
                            task={task}
                        />
                    ))}
                </SortableContext>
            </div>

            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="secondary" className="cursor-pointer rounded-lg hover:bg-muted-foreground">
                        <Plus /> Adicionar Tarefa
                    </Button>
                </DialogTrigger>

                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Adicionar Nova Tarefa</DialogTitle>
                    </DialogHeader>
                    <DialogDescription>
                        <Label className="block mb-2">
                            Nome:
                            <Input
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                                placeholder="Nome da Tarefa"
                            />
                        </Label>
                        <Label className="block mb-2">
                            Descrição:
                            <Input
                                value={descricao}
                                onChange={(e) => setDescricao(e.target.value)}
                                placeholder="Descrição da Tarefa"
                            />
                        </Label>
                        <Label className="block mb-2">
                            Data de Entrega:
                            <Input
                                type="date"
                                value={dataEntrega}
                                onChange={(e) => setDataEntrega(e.target.value)}
                            />
                        </Label>
                        <Label className="block mb-2">
                            Status:
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded"
                            >
                                <option value="pendente">Pendente</option>
                                <option value="em progresso">Em Progresso</option>
                                <option value="concluída">Concluída</option>
                            </select>
                        </Label>
                        <Label className="block mb-2">
                            Disciplina:
                            <select
                                value={disciplinaId}
                                onChange={(e) => setDisciplinaId(Number(e.target.value))}
                                className="mt-1 block w-full p-2 border border-gray-300 rounded"
                            >
                                <option value="">Selecione a Disciplina</option>
                                {mySchedule.map((disciplina) => (
                                    <option key={disciplina.id} value={disciplina.id}>
                                        {disciplina.nome}
                                    </option>
                                ))}
                            </select>
                        </Label>
                        <DialogTrigger asChild>
                            <Button
                                onClick={handleSubmit}
                                className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white rounded p-2"
                            >
                                Salvar Tarefa
                            </Button>
                        </DialogTrigger>
                    </DialogDescription>
                </DialogContent>
            </Dialog>
        </div>
    );
}
