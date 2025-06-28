import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    type: 'button' | 'submit' | 'reset';
    children?: React.ReactNode;
    disabled?: boolean;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({
    children,
    type = 'button',
    className = "w-[60%] mx-auto block py-2.5 rounded-full font-bold text-sm mt-8 blue-deep-gradient",
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