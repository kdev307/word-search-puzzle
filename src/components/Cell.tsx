import React, { useEffect } from 'react';

type CellProps = {
    children?: React.ReactNode;
    selected?: boolean;
    found?: boolean;
    color?: string;
    rounded?: string;
};

function Cell({ children, selected, found, color, rounded, ...props }: CellProps) {
    useEffect(() => {
        document.body.style.cursor = selected ? 'grabbing' : '';
        return () => {
            document.body.style.cursor = '';
        };
    }, [selected]);
    return (
        <div
            className={`relative flex aspect-square min-w-14 cursor-pointer items-center justify-center overflow-clip text-center text-xl font-bold transition-all duration-150 select-none ${rounded || ''} ${
                selected ? 'cursor-grab bg-gray-800 text-white' : 'text-gray-900 hover:bg-gray-300'
            } ${found && 'text-white'} `}
            {...props}
            style={found ? { backgroundColor: color } : {}}
        >
            {children}
        </div>
    );
}

export default Cell;
