import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { X } from "lucide-react";

interface IncludedClassData {
    code: string;
    name: string;
    period: string;
    mandatory: string;
}

interface IncludedClassDataProps {
    classData: IncludedClassData;
    onRemove: (classData: IncludedClassData) => void;
}

export function IncludedClass({ classData, onRemove }: IncludedClassDataProps) {
    return (
        <TableRow>
            <TableCell>{classData.code}</TableCell>
            <TableCell>{classData.name}</TableCell>
            <TableCell>
                <Button variant='ghost' size='xs' onClick={() => onRemove(classData)}>
                    <X className="mr-2 h-3 w-3" />Remover
                </Button>
            </TableCell>
        </TableRow>
    );
}
