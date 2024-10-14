import React from 'react';
import { ButtonStyled } from './styles'; // Importa os estilos do botão

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'xs' | 'lg' | 'icon';
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'default',
  size = 'default',
  children,
  ...props
}) => {
  return (
    <ButtonStyled variant={variant} size={size} {...props}>
      {children}
    </ButtonStyled>
  );
};
