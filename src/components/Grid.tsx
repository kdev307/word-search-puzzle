import Cell from './Cell';

interface GridProps {
    grid: string[][];
}

function Grid({ grid }: GridProps) {
    return (
        <div
            className="grid gap-2 rounded-2xl border-2 bg-gray-400 p-4"
            style={{ gridTemplateColumns: `repeat(${grid?.[0]?.length ?? 0}, 1fr)` }}
        >
            {grid?.map((row, rowIdx) =>
                row?.map((letter, colIdx) => <Cell key={`${rowIdx}-${colIdx}`}>{letter}</Cell>),
            )}
        </div>
    );
}

export default Grid;
