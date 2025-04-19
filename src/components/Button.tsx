import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    type: 'button' | 'submit' | 'reset';
    children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
    children,
    type = 'button',
    className = '',
    onClick = () => {},
    disabled = false,
}) => {
    return (
        <button
            type={type}
            className={className}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default Button;