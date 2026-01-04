import { columns, rows } from "../constants/game";
import { generateGrid } from "../utils/generateGrid";
import Cell from "./Cell";

function Grid() {
    const grid = generateGrid(rows, columns);

    return (
        <div
            className="border-2 rounded-2xl p-4 bg-gray-400 grid gap-2"
            style={{ gridTemplateColumns: `repeat(${columns}, 1fr)` }}
        >
            {grid.map((row, rowIdx) =>
                row.map((letter, colIdx) => <Cell key={`${rowIdx}-${colIdx}`}>{letter}</Cell>)
            )}
        </div>
    );
}

export default Grid;
