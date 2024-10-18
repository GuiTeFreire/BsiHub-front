import styled from "styled-components";
import { Button } from "../ui/button";

export const Dialog = styled.div``;

export const DropdownMenu = styled.div`
  position: relative;
`;

export const DropdownMenuTrigger = styled.div`
  display: inline-block;
`;

export const DropdownButton = styled(Button)`
    display: flex;
    user-select: none;
    align-items: center;
    gap: 0.5rem;
    text-decoration: none;
`

export const DropdownMenuContent = styled.div<{ isOpen: boolean }>`
    display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
    position: absolute;
    right: -14px;

    z-index: 50;
    min-width: 8rem;
    overflow: hidden;
    border-radius: 0.375rem;
    border: 1px solid ${props => props.theme.primary};
    background-color: ${props => props.theme.popoverForeground}; 
    padding: 0.25rem;
    text-align: left;
    color: ${props => props.theme.popover};
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 14rem;

    &[data-state='open'] {
        animation: fadeIn 0.3s ease-in-out;
    }

    &[data-state='closed'] {
        animation: fadeOut 0.3s ease-in-out;
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: scale(0.95);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }

    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: scale(1);
        }
        to {
            opacity: 0;
            transform: scale(0.95);
        }
    }
`;

export const DropdownMenuLabel = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem 0.375rem;

  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.25rem

  span secondary {
    font-size: 0.75rem;
    font-weight: 400;
    line-height: 1rem;
  }
`;

export const DropdownMenuSeparator = styled.hr`
  width: 100%;
  height: 1px; 
  background-color: hsl(221.2, 83.2%, 53.3%);
  margin: 10px 0;   
`;

export const DialogTrigger = styled.div``;

export const DropdownMenuItem = styled.div`
    position: relative;
    display: flex;

    cursor: default;
    user-select: none;
    align-items: center;

    border-radius: calc(var(--radius) - 4px);

    padding-left: 0.5rem;
    padding-right: 0.5rem;
    padding-top: 0.375rem;
    padding-bottom: 0.375rem;

    font-size: 0.875rem;
    line-height: 1.25rem;

    outline: 2px solid transparent;
    outline-offset: 2px;

    transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;

    :focus {
        background-color: hsl(var(--accent));
        color: hsl(var(--accent-foreground));
    }

    :pointer-events-none[data-disabled] {
        pointer-events: none;
    }

    :opacity-50[data-disabled] {
        opacity: 0.5;
    }

    button {
        width: 100%;
        text-align: left;
    }
`