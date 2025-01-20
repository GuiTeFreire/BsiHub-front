import { useEffect, useState } from "react";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Helmet } from "react-helmet-async";
import { ClassTableRow } from "./class-table-row";
import { ClassTableFilters } from "./class-table-filters";
import { Pagination } from "@/components/pagination";
import { IncludedClass } from "./included-class";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { api } from "@/lib/axios";
import { getStudentGrade } from "@/api/get-student-class";

export interface ClassData {
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

export function Classes() {
    const [classes, setClasses] = useState<ClassData[]>([])
    const [selectedClasses, setSelectedClasses] = useState<ClassData[]>([])

    const [searchParams] = useSearchParams()
    const filterCodigo = searchParams.get("codigo") ?? ""
    const filterNome = searchParams.get("nome") ?? ""
    const filterPeriodo = searchParams.get("periodo") ?? ""

    const storedUser = localStorage.getItem("alunoLogado")
    const user = storedUser ? JSON.parse(storedUser) : null
    const alunoId = user?.id

    useEffect(() => {
        const fetchClassList = async () => {
            try {
                const response = await api.get<ClassData[]>('/api/Disciplina')
                setClasses(response.data)
            } catch (error) {
                toast.error("Erro ao carregar disciplinas")
                console.error("Erro ao carregar disciplinas", error)
            }
        }

        fetchClassList()
    }, [])

    useEffect(() => {
      const fetchStudentGrade = async () => {
          try {
              const studentGrade = await getStudentGrade(alunoId)
              setSelectedClasses(studentGrade)
          } catch (error) {
              toast.error("Erro ao carregar disciplinas")
              console.error("Erro ao carregar disciplinas", error)
          }
      }

      fetchStudentGrade()
  }, [])

    const handleIncludeClass = (classData: ClassData) => {
        if (!selectedClasses.some(c => c.codigo === classData.codigo)) {
            setSelectedClasses(prev => [...prev, classData])
        }
    }

    const handleRemoveClass = async (classData: ClassData) => {
      try {

          const idsDisciplinas = [classData.id]
  
          await api.delete(`/api/Aluno/${alunoId}/Disciplina`, { data: idsDisciplinas })

          setSelectedClasses(prev => prev.filter(c => c.codigo !== classData.codigo))
  
          toast.success("Disciplina removida com sucesso!")
      } catch (error) {
          toast.error("Erro ao remover a disciplina")
      }
  }

    const filteredClasses = classes.filter(c =>
        (filterCodigo ? c.codigo.toLowerCase().includes(filterCodigo.toLowerCase()) : true) &&
        (filterNome ? c.nome.toLowerCase().includes(filterNome.toLowerCase()) : true) &&
        (filterPeriodo ? c.periodo.toString() === filterPeriodo : true)
    )

    const [pageIndex, setPageIndex] = useState(0)
    const perPage = 10
    const startIndex = pageIndex * perPage
    const endIndex = startIndex + perPage
    const currentPageData = filteredClasses.slice(startIndex, endIndex)

    function handlePageChange(newPageIndex: number) {
        setPageIndex(newPageIndex)
    }

    const handleSaveGrade = async () => {
      try {
          const idsDisciplina = selectedClasses.map(classData => classData.id)

          await api.post(`/api/Aluno/${alunoId}/Disciplina`, idsDisciplina)

          toast.success("Grade salva com sucesso!")
      } catch (error) {
          toast.error("Erro ao salvar a grade")
      }
  }

    return (
        <>
            <Helmet title="Classes" />
            <div className="flex flex-row gap-4">
                <div className="flex flex-col gap-4 w-3/4">
                    <h1 className="text-3xl font-bold tracking-tight">
                        Monte sua grade horária
                    </h1>

                    <ClassTableFilters />
                    <div className="border rounded-md">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Código</TableHead>
                                    <TableHead>Nome</TableHead>
                                    <TableHead>Período</TableHead>
                                    <TableHead>Obrigatória/Optativa</TableHead>
                                    <TableHead></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {currentPageData.map((classData, i) => (
                                    <ClassTableRow
                                        key={i}
                                        classData={classData}
                                        onInclude={handleIncludeClass}
                                    />
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    <Pagination
                        pageIndex={pageIndex}
                        totalCount={filteredClasses.length}
                        perPage={perPage}
                        onPageChange={handlePageChange}
                    />
                </div>

                <div className="flex flex-col gap-4 w-1/2">
                    <h2 className="text-3xl font-bold tracking-tight">
                        Grade Selecionada
                    </h2>
                    <div className="border rounded-md mt-11">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Código</TableHead>
                                    <TableHead>Nome</TableHead>
                                    <TableHead></TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {selectedClasses.map((classData, i) => (
                                    <IncludedClass key={i} classData={classData} onRemove={handleRemoveClass} />
                                ))}
                            </TableBody>
                        </Table>
                    </div>

                    <Button variant="default" onClick={handleSaveGrade}>
                        Salvar grade
                    </Button>
                </div>
            </div>
        </>
    )
}
