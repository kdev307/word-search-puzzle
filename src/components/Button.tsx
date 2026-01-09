import React from 'react';

interface ButtonProps {
    style?: string;
    text?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
    icon?: React.ReactNode;
}

function Button({
    style = '',
    text = '',
    onClick = () => {},
    disabled = false,
    type = 'button',
    icon = null,
}: ButtonProps) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`flex w-full cursor-pointer items-center justify-center gap-6 rounded-full border-2 px-6 py-4 text-xl font-medium whitespace-nowrap transition-colors duration-300 ease-in-out hover:bg-gray-100 hover:text-gray-800 ${style} `}
        >
            {text}
            {icon && <span className="mr-2">{icon}</span>}
        </button>
    );
}

export default Button;
