import { Book, Home, Tally1, Upload } from "lucide-react";
import { Divider, Head, HeaderContainer, NavBar, NavBarLink, TopLeft } from "./styles";
import { Button } from "../ui/button";

export function Header() {
    return (
        <Head>
            <HeaderContainer>
                <Book />BSIHub
                <Tally1 />
                <NavBar>
                    <NavBarLink to='/' title="Início">
                        <Home color="hsl(221.2, 83.2%, 53.3%)" />Início
                    </NavBarLink>
                    <NavBarLink to='/board' title="Quadro de Atividades">
                        <Home color="hsl(221.2, 83.2%, 53.3%)" />Quadro de Atividades
                    </NavBarLink>
                </NavBar>
                <TopLeft>Upload Histórico
                    <Button size="icon" variant="link" title="Upload PDF">
                        <Upload color="hsl(221.2, 83.2%, 53.3%)" />
                    </Button>
                    <div>
                        <div>Guilherme Freire</div>
                        <div>CR: 8.00</div>
                    </div>
                </TopLeft>
            </HeaderContainer>
            <Divider />
        </Head>
    )
}