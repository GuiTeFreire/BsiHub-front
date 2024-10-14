import styled from 'styled-components'

export const LayoutContainer = styled.div`
    display: flex;
    min-height: 100vh;
    flex-direction: column;
    background: ${(props) => props.theme.foreground};

    .antialiased {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

`

export const OutletContainer = styled.div`
    display: flex;
    flex: 1 1 0%;
    flex-direction: column;
    gap: 1rem;
    padding: 2rem;
    padding-top: 1.5rem;

`