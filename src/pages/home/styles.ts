import styled from "styled-components";

export const HomeContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`

export const Dashboard = styled.h1`
    font-size: 1.875rem;
    line-height: 2.25rem;

    font-weight: 700;

    letter-spacing: -0.025em;
`

export const Metrics = styled.div`
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 1rem;
`

export const Timetable = styled.div`
    display: grid;
    grid-template-columns: repeat(9, minmax(0, 1fr));
    gap: 1rem;
`