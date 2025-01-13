import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, X } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "react-router-dom";

const classFilterSchema = z.object({
  codigo: z.string().optional(),
  nome: z.string().optional(),
  periodo: z.string().optional(),
});

type ClassFilterSchema = z.infer<typeof classFilterSchema>;

export function ClassTableFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  const codigo = searchParams.get("codigo");
  const nome = searchParams.get("nome");
  const periodo = searchParams.get("periodo");

  const { register, handleSubmit, control, reset } = useForm<ClassFilterSchema>({
    resolver: zodResolver(classFilterSchema),
    defaultValues: {
      codigo: codigo ?? "",
      nome: nome ?? "",
      periodo: periodo ?? "all",
    },
  });

  function handleFilter({ codigo, nome, periodo }: ClassFilterSchema) {
    setSearchParams((state) => {
      if (codigo) {
        state.set("codigo", codigo);
      } else {
        state.delete("codigo");
      }

      if (nome) {
        state.set("nome", nome);
      } else {
        state.delete("nome");
      }

      if (periodo && periodo !== "all") {
        state.set("periodo", periodo);
      } else {
        state.delete("periodo");
      }

      state.set("page", "1")

      return state
    });
  }

  function handleClearFilters() {
    reset({
      codigo: "",
      nome: "",
      periodo: "all",
    })

    setSearchParams({})
  }

  return (
    <form onSubmit={handleSubmit(handleFilter)} className="flex items-center gap-2">
      <span className="text-sm font-semibold">Filtros:</span>

      <Input
        placeholder="Código da disciplina"
        className="h-8 w-auto"
        {...register("codigo")}
      />

      <Input
        placeholder="Nome da disciplina"
        className="h-8 w-[320px]"
        {...register("nome")}
      />

      <Controller
        name="periodo"
        control={control}
        defaultValue="all"
        render={({ field: { name, onChange, value, disabled } }) => {
          return (
            <Select
              defaultValue="all"
              name={name}
              onValueChange={onChange}
              value={value}
              disabled={disabled}
            >
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
          );
        }}
      />

      <Button type="submit" variant="secondary" size="xs">
        <Search className="mr-2 h-4 w-4" />
        Filtrar resultados
      </Button>

      {/* Botão comum (não submit!) para remover filtros */}
      <Button type="button" variant="outline" size="xs" onClick={handleClearFilters}>
        <X className="mr-2 h-4 w-4" />
        Remover filtros
      </Button>
    </form>
  );
}
