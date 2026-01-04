import React from "react";

type CellProps = {
    children?: React.ReactNode;
};

function Cell({ children }: CellProps) {
    return (
        <div className="p-5 min-w-18 border-2 rounded-2xl text-center text-2xl font-bold bg-gray-200 text-gray-900">
            {children}
        </div>
    );
}

export default Cell;
