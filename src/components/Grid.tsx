import Cell from "./Cell";

interface GridProps {
    grid: string[][];
}

function Grid({ grid }: GridProps) {
    return (
        <div
            className="border-2 rounded-2xl p-4 bg-gray-400 grid gap-2"
            style={{ gridTemplateColumns: `repeat(${grid?.[0]?.length ?? 0}, 1fr)` }}
        >
            {grid?.map((row, rowIdx) =>
                row?.map((letter, colIdx) => <Cell key={`${rowIdx}-${colIdx}`}>{letter}</Cell>)
            )}
        </div>
    );
}

export default Grid;
