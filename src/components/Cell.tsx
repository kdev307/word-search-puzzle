import React, { useEffect } from 'react';

type CellProps = {
    children?: React.ReactNode;
    selected?: boolean;
    found?: boolean;
};

function Cell({ children, selected, found, ...props }: CellProps) {
    const highlighted = selected || found;
    useEffect(() => {
        document.body.style.cursor = selected ? 'grabbing' : '';
        return () => {
            document.body.style.cursor = '';
        };
    }, [selected]);
    return (
        <div
            className={`relative flex aspect-square min-w-14 cursor-pointer items-center justify-center overflow-clip text-center text-xl font-bold transition-all duration-150 select-none ${highlighted ? 'text-white' : 'rounded-xl text-gray-900 hover:bg-gray-300'}`}
            {...props}
        >
            {children}
        </div>
    );
}

export default Cell;
