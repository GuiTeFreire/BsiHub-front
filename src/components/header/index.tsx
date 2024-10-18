import { Book, Home, Tally1, Upload } from "lucide-react";
import { Divider, Head, HeaderContainer, NavBar, NavBarLink, TopLeft } from "./styles";
import { Button } from "../ui/button";
import { AccountMenu } from "../account-menu";

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
                <TopLeft>
                    <Button size="icon" variant="link" title="Upload Histórico">
                        <Upload color="hsl(221.2, 83.2%, 53.3%)" />
                    </Button>
                    <div>
                        <AccountMenu />
                    </div>
                </TopLeft>
            </HeaderContainer>
            <Divider />
        </Head>
    )
}