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

`
export const TopLeft = styled.div`
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: 1rem;
    color: ${props => props.theme.secondary};
`

export const NavBarLink = styled(NavLink)`
    display: flex;
    align-items: center;
    gap: .375rem;
    text-decoration: none;

    font-size: 0.875rem;
    line-height: 1.25rem;
    
    font-weight: 500;
    

   color: ${props => props.theme.mutedForeground};
    

    :hover {
        color: ${props => props.theme.foreground};
    }
`