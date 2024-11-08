import { Board } from "@/components/kanban-board";
import { Helmet } from "react-helmet-async";

export function ToDoList() {
    return (
        <>
            <Helmet title="Atividades" />
            <Board />
        </>
    )
}