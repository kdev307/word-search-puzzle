import React from 'react';

type CellProps = {
    children?: React.ReactNode;
    selected?: boolean;
};

function Cell({ children, selected, ...props }: CellProps) {
    return (
        <div
            {...props}
            className={`min-w-18 rounded-2xl border-2 p-5 text-center text-2xl font-bold ${
                selected ? 'bg-gray-900 text-gray-200' : 'bg-gray-200 text-gray-900'
            }`}
        >
            {children}
        </div>
    );
}

export default Cell;
