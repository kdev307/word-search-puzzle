import React from "react";

interface ButtonProps {
    style?: string;
    text?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
    icon?: React.ReactNode;
}

function Button({
    style = "",
    text = "",
    onClick = () => {},
    disabled = false,
    type = "button",
    icon = null,
}: ButtonProps) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={`
        text-xl py-4 px-6 font-medium rounded-full border-2 hover:bg-gray-100 hover:text-gray-800 
        cursor-pointer w-full transition-colors duration-300 ease-in-out flex items-center justify-center gap-8
        whitespace-nowrap ${style}
      `}
        >
            {text}
            {icon && <span className="mr-2 ">{icon}</span>}
        </button>
    );
}

export default Button;
