import { useRef, useState } from 'react';
import { ACTIONS } from '../constants/actions';
import useWOW from '../hooks/useWOW';
import Cell from './Cell';
import { getDirection, isStraightLine } from '../utils/cellSelection';

interface GridProps {
    grid: string[][];
}

function Grid({ grid }: GridProps) {
    const { dispatch, selectedCells } = useWOW();
    const [isSelecting, setIsSelecting] = useState<boolean>(false);
    const [startCell, setStartCell] = useState<{ row: number; col: number } | null>(null);
    const [direction, setDirection] = useState<{ dx: number; dy: number } | null>(null);
    const lastCell = useRef<{ row: number; col: number } | null>(null);

    const handleMouseDown = (row: number, col: number) => {
        const cell = { row, col };
        setIsSelecting(true);
        setStartCell(cell);
        setDirection(null);
        lastCell.current = cell;

        dispatch({ type: ACTIONS.START_SELECTION, payload: cell });
    };

    const handleMouseEnter = (row: number, col: number) => {
        if (!isSelecting || !startCell) return;
        const currentCell = { row, col };

        if (
            !direction &&
            Math.max(
                Math.abs(currentCell.row - startCell.row),
                Math.abs(currentCell.col - startCell.col),
            ) === 1
        ) {
            const dir = getDirection(startCell, currentCell);
            setDirection(dir);
            dispatch({ type: ACTIONS.EXTEND_SELECTION, payload: { row, col } });
            lastCell.current = currentCell;
            return;
        }
        if (direction && lastCell.current && isStraightLine(startCell, direction, currentCell)) {
            const nextCell = {
                row: lastCell.current.row + direction.dx,
                col: lastCell.current.col + direction.dy,
            };

            if (nextCell.row === currentCell.row && nextCell.col === currentCell.col) {
                dispatch({ type: ACTIONS.EXTEND_SELECTION, payload: currentCell });
                lastCell.current = currentCell;
            }
        }
    };

    const handleMouseUp = () => {
        if (!isSelecting) return;
        setIsSelecting(false);
        setStartCell(null);
        setDirection(null);
        dispatch({ type: ACTIONS.END_SELECTION });
    };

    const isSelected = (row: number, col: number) =>
        selectedCells.some(
            (cell: { row: number; col: number }) => cell.row === row && cell.col === col,
        );
    return (
        <div
            className="grid gap-2 rounded-2xl border-2 bg-gray-400 p-4"
            style={{
                gridTemplateColumns: `repeat(${grid[0]?.length}, 1fr)`,
                userSelect: 'none',
            }}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
        >
            {grid?.map((row, rowIdx) =>
                row?.map((letter, colIdx) => (
                    <Cell
                        key={`${rowIdx}-${colIdx}`}
                        selected={isSelected(rowIdx, colIdx)}
                        onMouseDown={() => handleMouseDown(rowIdx, colIdx)}
                        onMouseEnter={() => handleMouseEnter(rowIdx, colIdx)}
                    >
                        {letter}
                    </Cell>
                )),
            )}
        </div>
    );
}

export default Grid;
