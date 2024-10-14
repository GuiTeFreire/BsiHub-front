import styled, { css } from 'styled-components';

interface ButtonStyledProps {
  variant: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size: 'default' | 'sm' | 'xs' | 'lg' | 'icon';
}

export const ButtonStyled = styled.button<ButtonStyledProps>`
  /* Estilos base */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  border-radius: 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  transition: background-color 0.2s ease, color 0.2s ease;
  outline: none;
  cursor: pointer;

  /* Foco visível */
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.ring};
    outline-offset: 2px;
  }

  /* Desabilitado */
  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }

  /* Variantes de cor */
  ${({ variant, theme }) => {
    switch (variant) {
      case 'destructive':
        return css`
          background-color: ${theme.destructive};
          color: ${theme.destructiveForeground};
          &:hover {
            background-color: ${theme.destructiveHover};
          }
        `;
      case 'outline':
        return css`
          border: 1px solid ${theme.input};
          background-color: ${theme.background};
          &:hover {
            background-color: ${theme.accent};
            color: ${theme.accentForeground};
          }
        `;
      case 'secondary':
        return css`
          background-color: ${theme.secondary};
          color: ${theme.secondaryForeground};
          &:hover {
            background-color: ${theme.secondaryHover};
          }
        `;
      case 'ghost':
        return css`
          background-color: transparent;
          &:hover {
            background-color: ${theme.accent};
            color: ${theme.accentForeground};
          }
        `;
      case 'link':
        return css`
          background-color: transparent;
          color: ${theme.primary};
          text-decoration: underline;
          &:hover {
            text-decoration: underline;
          }
        `;
      default:
        return css`
          background-color: ${theme.primary};
          color: ${theme.primaryForeground};
          &:hover {
            background-color: ${theme.primaryHover};
          }
        `;
    }
  }}

  /* Variantes de tamanho */
  ${({ size }) => {
    switch (size) {
      case 'sm':
        return css`
          height: 2.25rem;
          padding: 0 0.75rem;
          font-size: 0.875rem;
        `;
      case 'xs':
        return css`
          height: 2rem;
          padding: 0 0.625rem;
          font-size: 0.75rem;
        `;
      case 'lg':
        return css`
          height: 2.75rem;
          padding: 0 1.5rem;
          font-size: 1rem;
        `;
      case 'icon':
        return css`
          height: 2.5rem;
          width: 2.5rem;
          padding: 0;
        `;
      default:
        return css`
          height: 2.5rem;
          padding: 0 1rem;
        `;
    }
  }}
`;
