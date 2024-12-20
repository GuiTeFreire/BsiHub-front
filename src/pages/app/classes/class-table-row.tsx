import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { Search } from "lucide-react";

export function ClassTableRow() {
    return (
        <TableRow>
            <TableCell>
                <Button variant='outline' size='xs'>
                    <Search className="h-3 w-3" />
                    <span className="sr-only">Detalhes da disciplina</span>
                </Button>
            </TableCell>
            <TableCell>TIN0222</TableCell>
            <TableCell>Algoritmos e Programação</TableCell>
            <TableCell>1º</TableCell>
            <TableCell>Desenvolvimento de Software para SI - Programação e Algoritmos</TableCell>
            <TableCell>60h</TableCell>
            <TableCell>2 teóricos + 1 prático</TableCell>
            <TableCell>Obrigatória</TableCell>
        </TableRow>
    )
}