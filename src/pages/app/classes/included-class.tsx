import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { X } from "lucide-react";

export interface IncludedClassData {
    id: number;
    nome: string;
    codigo: string;
    descricao: string;
    sala: string;
    totalHoras: number;
    professor: string;
    periodo: number;
    obrigatoria: boolean;
}

interface IncludedClassDataProps {
    classData: IncludedClassData;
    onRemove: (classData: IncludedClassData) => void;
}

export function IncludedClass({ classData, onRemove }: IncludedClassDataProps) {
    return (
        <TableRow>
            <TableCell>{classData.codigo}</TableCell>
            <TableCell>{classData.nome}</TableCell>
            <TableCell>
                <Button variant='ghost' size='xs' onClick={() => onRemove(classData)}>
                    <X className="mr-2 h-3 w-3" />Remover
                </Button>
            </TableCell>
        </TableRow>
    );
}
