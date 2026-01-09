import React from 'react';

type CellProps = {
    children?: React.ReactNode;
    selected?: boolean;
    onMouseDown?: React.MouseEventHandler<HTMLDivElement>;
    onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
};

function Cell({ children, selected, onMouseDown, onMouseEnter }: CellProps) {
    return (
        <div
            className={`min-w-18 rounded-2xl border-2 p-5 text-center text-2xl font-bold ${
                selected ? 'bg-gray-900 text-gray-200' : 'bg-gray-200 text-gray-900'
            }`}
            onMouseDown={onMouseDown}
            onMouseEnter={onMouseEnter}
        >
            {' '}
            {children}
        </div>
    );
}

export default Cell;
