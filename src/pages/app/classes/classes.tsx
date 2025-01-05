import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { Helmet } from "react-helmet-async";
import { ClassTableRow } from "./class-table-row";
import { ClassTableFilters } from "./class-table-filters";
import { Pagination } from "@/components/pagination";

export function Classes() {
    return (
        <>
            <Helmet title="Disciplinas" />
            <div className="flex flex-col gap-4">
                <h1 className="text-3xl font-bold tracking-tight">Disciplinas</h1>
            
                <div className="space-y-2.5">
                    <ClassTableFilters />

                    <div className="border rounded-md">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Código</TableHead>
                                    <TableHead>Nome</TableHead>
                                    <TableHead>Período</TableHead>
                                    <TableHead>Eixo</TableHead>
                                    <TableHead>Carga Horaria</TableHead>
                                    <TableHead>Créditos</TableHead>
                                    <TableHead>Obrigatoriedade</TableHead>
                                    <TableHead></TableHead>
                                    <TableHead></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {Array.from({ length: 10 }).map((_, i) =>{
                                    return <ClassTableRow key={i} />
                                })}
                            </TableBody>
                        </Table>
                    </div>
                    <Pagination pageIndex={0} totalCount={50} perPage={10} />
                </div>
            </div>
        </>
    )
}

// disciplina { codigo, nome, periodo, categoria, cargaHoraria, creditos, obrigatoriedade(?) }