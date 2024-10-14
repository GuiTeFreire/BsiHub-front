import { Dashboard, HomeContainer, Metrics, Timetable } from "./styles";

export function Home() {
    return(
        <>
        <HomeContainer>
            <Dashboard>Dashboard</Dashboard>
            <Metrics>Métricas</Metrics>
            
            <Timetable>Grade horária</Timetable>
        </HomeContainer>
        </>
        
    )
}