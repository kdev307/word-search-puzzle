import React from 'react';

type CellProps = {
    children?: React.ReactNode;
};

function Cell({ children }: CellProps) {
    return (
        <div className="min-w-18 rounded-2xl border-2 bg-gray-200 p-5 text-center text-2xl font-bold text-gray-900">
            {children}
        </div>
    );
}

export default Cell;
