import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, X } from "lucide-react";

export function ClassTableFilters() {
    return (
        <form className="flex items-center gap-2">
            <span className="text-sm font-semibold">Filtros:</span>
            <Input placeholder="ID da disciplina" className="h-8 w-auto" />
            <Input placeholder="Nome da disciplina" className="h-8 w-[320px]" />
            <Select defaultValue="all">
                <SelectTrigger className="h-8 w-[180px]">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">Todos os Períodos</SelectItem>
                    <SelectItem value="1">1º</SelectItem>
                    <SelectItem value="2">2º</SelectItem>
                    <SelectItem value="3">3º</SelectItem>
                    <SelectItem value="4">4º</SelectItem>
                    <SelectItem value="5">5º</SelectItem>
                    <SelectItem value="6">6º</SelectItem>
                    <SelectItem value="7">7º</SelectItem>
                    <SelectItem value="8">8º</SelectItem>
                </SelectContent>
            </Select>

            <Button type="submit" variant='secondary' size='xs'>
                <Search className="mr-2 h-4 w-4" />
                Filtrar resultados
            </Button>

            <Button type="submit" variant='outline' size='xs'>
                <X className="mr-2 h-4 w-4" />
                Remover filtros
            </Button>
        </form>
    )
}