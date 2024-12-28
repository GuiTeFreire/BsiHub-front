import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { ArrowRight, X } from "lucide-react";

export function ClassTableRow() {
    return (
        <TableRow>
            <TableCell>TIN0222</TableCell>
            <TableCell>Algoritmos e Programação</TableCell>
            <TableCell>1º</TableCell>
            <TableCell>Desenvolvimento de Software para SI - Programação e Algoritmos</TableCell>
            <TableCell>60h</TableCell>
            <TableCell>2 teóricos + 1 prático</TableCell>
            <TableCell>Obrigatória</TableCell>
            <TableCell>
                <Button variant='outline' size='xs'>
                    <ArrowRight className="mr-2 h-3 w-3" />Incluir
                </Button>
            </TableCell>
            <TableCell>
                <Button variant='ghost' size='xs'>
                    <X className="mr-2 h-3 w-3" />Remover
                </Button>
            </TableCell>
        </TableRow>
    )
}