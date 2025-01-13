import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";

export function Home() {
    const navigate = useNavigate()

    const handleNavigateToClasses = () => {
        navigate('/classes');
    };

    function handleLogout() {
        localStorage.removeItem("alunoLogado");
        localStorage.removeItem("sessionExpiresAt");
        navigate("/sign-in");
    }

    return (
        <>
            <Helmet title="Home" />
            <div className="flex flex-col items-center justify-center gap-8">
                <h1 className="text-6xl font-bold">Bem-vind@!</h1>
                <div className="text-accent-foreground flex flex-col justify-center gap-8">
                    <Button className="w-full" size={"lg"} onClick={handleNavigateToClasses}>Montar grade horária</Button>
                    <Button className="w-full" size={"lg"}>Gerenciar disciplinas</Button>
                    <Button className="w-full" size={"lg"} variant="destructive" onClick={handleLogout}>
                        Sair
                    </Button>
                </div>
            </div>
        </>
    )
}