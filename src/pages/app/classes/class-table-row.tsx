import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { ArrowRight } from "lucide-react";

interface ClassData {
    code: string;
    name: string;
    period: string;
    mandatory: string;
}

interface ClassTableRowProps {
    classData: ClassData;
    onInclude: (classData: ClassData) => void;
}

export function ClassTableRow({ classData, onInclude }: ClassTableRowProps) {
    return (
        <TableRow>
            <TableCell>{classData.code}</TableCell>
            <TableCell>{classData.name}</TableCell>
            <TableCell>{classData.period}</TableCell>
            <TableCell>{classData.mandatory}</TableCell>
            <TableCell>
                <Button variant='outline' size='xs' onClick={() => onInclude(classData)}>
                    <ArrowRight className="mr-2 h-3 w-3" />Incluir
                </Button>
            </TableCell>
        </TableRow>
    );
}
