import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { ArrowRight } from "lucide-react";

export interface ClassData {
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

interface ClassTableRowProps {
    classData: ClassData;
    onInclude: (classData: ClassData) => void;
}

export function ClassTableRow({ classData, onInclude }: ClassTableRowProps) {
    return (
        <TableRow>
            <TableCell>{classData.codigo}</TableCell>
            <TableCell>{classData.nome}</TableCell>
            <TableCell>{classData.periodo}</TableCell>
            <TableCell>{classData.obrigatoria ? "Obrigatória" : "Optativa"}</TableCell>
            <TableCell>
                <Button variant='outline' size='xs' onClick={() => onInclude(classData)}>
                    <ArrowRight className="mr-2 h-3 w-3" />Incluir
                </Button>
            </TableCell>
        </TableRow>
    );
}
