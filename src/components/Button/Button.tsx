import React, { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode,
    className: string,
  }

const Button = ({ children, className, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      onClick={props.onClick}
      className={className}
    >
      {children}
    </button>
  )
}

export default Button
