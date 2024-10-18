import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const Head = styled.div`
    border-bottom-width: 1px;
`;

export const HeaderContainer = styled.div`
    display: flex;
    height: 4rem;
    align-items: center;
    gap: 1.5rem;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
`;

export const Divider = styled.div`
  width: 100%;
  height: 1px; 
  background-color: hsl(221.2, 83.2%, 53.3%);
  margin: 10px 0;
`;

export const NavBar = styled.nav`
    display: flex;
    align-items: center;
    gap: 1.5rem;

    .space-x-4 > :not([hidden]) ~ :not([hidden]) {
        --tw-space-x-reverse: 0;
        margin-right: calc(1rem /* 16px */ * var(--tw-space-x-reverse));
        margin-left: calc(1rem /* 16px */ * calc(1 - var(--tw-space-x-reverse)));
    }

    @media (min-width: 1024px) {
        .lg\:space-x-6 > :not([hidden]) ~ :not([hidden]) {
            --tw-space-x-reverse: 0;
            margin-right: calc(1.5rem /* 24px */ * var(--tw-space-x-reverse));
            margin-left: calc(1.5rem /* 24px */ * calc(1 - var(--tw-space-x-reverse)));
        }
}
`
export const TopLeft = styled.div`
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: ${props => props.theme.secondary};
`

export const NavBarLink = styled(NavLink)`
    display: flex;
    align-items: center;
    gap: .375rem;
    color: ${props => props.theme.secondary};
    text-decoration: none;

    .text-sm {
        font-size: 0.875rem;
        line-height: 1.25rem;
    }

    .font-medium {
        font-weight: 500;
    }

    .text-muted-foreground {
        color: ${props => props.theme.mutedForeground};
    }

    .hover\:text-foreground:hover {
        color: ${props => props.theme.foreground};
    }

    .data-\[current\=true\]\:text-foreground[data-current=true] {
        color: ${props => props.theme.foreground};
    }
`