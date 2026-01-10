import React from 'react';

type CellProps = {
    children?: React.ReactNode;
    selected?: boolean;
    found?: boolean;
};

function Cell({ children, selected, found, ...props }: CellProps) {
    return (
        <div
            className={`min-w-18 rounded-2xl border-2 p-5 text-center text-2xl font-bold ${
                found
                    ? 'border-gray-50 bg-gray-950 text-gray-50'
                    : selected
                      ? 'bg-gray-900 text-gray-200'
                      : 'bg-gray-200 text-gray-900'
            }`}
            {...props}
        >
            {children}
        </div>
    );
}

export default Cell;
