import { Book, Home, Kanban } from "lucide-react";
import { Separator } from "./ui/separator";
import { NavLink } from "./nav-link";

export function Header() {
    return (
        <div className="border-b">
            <div className="flex h-16 items-center gap-6 px-6">
                <Book className="h-6 w-6" />

                <Separator className="h-6" orientation="vertical" />

                <nav className="flex items-center space-x-4 lg:space-x-6">
                    <NavLink to='/'>
                        <Home className="h-4 w-4" />Início
                    </NavLink>
                    <NavLink to='/board'>
                        <Kanban className="h-4 w-4" />Atividades
                    </NavLink>
                </nav>
            </div>
        </div>
    )
}