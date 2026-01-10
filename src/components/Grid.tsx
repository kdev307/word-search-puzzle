import { useRef, useState } from 'react';
import { ACTIONS } from '../constants/actions';
import useWOW from '../hooks/useWOW';
import Cell from './Cell';
import { getCellFromPointerEvent, getDirection, isStraightLine } from '../utils/cellSelection';

function Grid() {
    const { grid, dispatch, selectedCells } = useWOW();
    const [isSelecting, setIsSelecting] = useState<boolean>(false);
    const [startCell, setStartCell] = useState<{ row: number; col: number } | null>(null);
    const [direction, setDirection] = useState<{ dx: number; dy: number } | null>(null);
    const lastCell = useRef<{ row: number; col: number } | null>(null);

    const startSelection = (cell: { row: number; col: number }) => {
        setIsSelecting(true);
        setStartCell(cell);
        setDirection(null);
        lastCell.current = cell;

        dispatch({ type: ACTIONS.START_SELECTION, payload: cell });
    };

    const extendSelection = (cell: { row: number; col: number }) => {
        if (!startCell) return;

        if (
            !direction &&
            Math.max(Math.abs(cell.row - startCell.row), Math.abs(cell.col - startCell.col)) === 1
        ) {
            const dir = getDirection(startCell, cell);
            setDirection(dir);
            dispatch({ type: ACTIONS.EXTEND_SELECTION, payload: cell });
            lastCell.current = cell;
            return;
        }

        if (direction && lastCell.current && isStraightLine(startCell, direction, cell)) {
            const nextCell = {
                row: lastCell.current.row + direction.dx,
                col: lastCell.current.col + direction.dy,
            };

            if (nextCell.row === cell.row && nextCell.col === cell.col) {
                dispatch({ type: ACTIONS.EXTEND_SELECTION, payload: cell });
                lastCell.current = cell;
            }
        }
    };

    const endSelection = () => {
        if (!isSelecting) return;
        setIsSelecting(false);
        setStartCell(null);
        setDirection(null);
        dispatch({ type: ACTIONS.END_SELECTION });
    };

    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.currentTarget.setPointerCapture(e.pointerId);

        const cell = getCellFromPointerEvent(e);
        if (!cell) return;

        startSelection(cell);
    };

    const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        if (!isSelecting) return;
        e.preventDefault();

        const cell = getCellFromPointerEvent(e);
        if (!cell) return;

        extendSelection(cell);
    };

    const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
        e.currentTarget.releasePointerCapture(e.pointerId);
        endSelection();
    };

    const isSelected = (row: number, col: number) =>
        selectedCells.some((c) => c.row === row && c.col === col);

    return (
        <div
            className="grid gap-2 rounded-2xl border-2 bg-gray-400 p-4"
            style={{
                gridTemplateColumns: `repeat(${grid[0]?.length ?? 0}, 1fr)`,
                userSelect: 'none',
                touchAction: 'none',
            }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={endSelection}
        >
            {grid.map((row, rowIdx) =>
                row.map((letter, colIdx) => (
                    <Cell
                        key={`${rowIdx}-${colIdx}`}
                        data-row={rowIdx}
                        data-col={colIdx}
                        selected={isSelected(rowIdx, colIdx)}
                    >
                        {letter}
                    </Cell>
                )),
            )}
        </div>
    );
}

export default Grid;
