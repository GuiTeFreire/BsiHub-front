import { ChevronDown, Edit, LogOut } from "lucide-react";
import { Dialog, DialogTrigger, DropdownButton, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./styles";
import { useState } from "react";

export function AccountMenu() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => setIsOpen(!isOpen);

    return (
        <Dialog>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <DropdownButton onClick={toggleDropdown} variant="link">
                        Primeiro Nome
                        <ChevronDown height='1rem' width='1rem' />
                    </DropdownButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent isOpen={isOpen}>
                    <DropdownMenuLabel>
                        <span>Nome Sobrenome</span>
                        <span id="secondary">Email</span>
                        <span id="secondary">Matrícula</span>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DialogTrigger>
                        <DropdownMenuItem>
                            <button>
                                <Edit height='0.9rem' width='1.5rem' />
                                <span>Editar perfil</span>
                            </button>
                        </DropdownMenuItem>
                    </DialogTrigger>
                    <DropdownMenuItem>
                        <button>
                            <LogOut height='0.9rem' width='1.5rem' />
                            <span>Sair</span>
                        </button>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </Dialog>

    )
}