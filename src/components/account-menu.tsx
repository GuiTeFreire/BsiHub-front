import { ChevronDown, LogOut, User } from "lucide-react";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "@/api/get-profile";
import { Skeleton } from "./ui/skeleton";
import { Dialog,  } from "./ui/dialog";
import { useNavigate } from "react-router-dom";

export function AccountMenu() {
    const navigate = useNavigate()
    const storedUser = localStorage.getItem("alunoLogado");
    const user = storedUser ? JSON.parse(storedUser) : null;
    const userId = user?.id;


    const { data: profile, isLoading: isLoadingProfile } = useQuery({
        queryKey: ["profile", userId],
        queryFn: () => getProfile(userId),
        enabled: !!userId,
    })

    function handleLogout() {
        localStorage.removeItem("alunoLogado");
        localStorage.removeItem("sessionExpiresAt");
        navigate("/sign-in");
    }

    return (
        <Dialog>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button className="flex items-center gap-2 select-none" variant="outline">
                        <User />
                        Meu perfil
                        <ChevronDown className="h-4 w-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                    <DropdownMenuLabel className="flex flex-col">
                        {isLoadingProfile ? (
                            <div className="space-y-1.5">
                                <Skeleton className="h-4 w-16" />
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-4 w-20" />
                            </div>
                        ) : (
                            <>
                                <span>{profile?.nome}</span>
                                <span className="text-xs font-normal text-muted-foreground">
                                    {profile?.email}
                                </span>
                                <span className="text-xs font-normal text-muted-foreground">
                                    {profile?.matricula}
                                </span>
                            </>
                        )}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />                    
                    <DropdownMenuItem asChild className="text-rose-500 dark:text-rose-400">
                        <button className="w-full" onClick={handleLogout}>
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Sair</span>
                        </button>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </Dialog>
    )
}