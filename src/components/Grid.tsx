import { useRef, useState } from 'react';
import { ACTIONS } from '../constants/actions';
import useWOW from '../hooks/useWOW';
import Cell from './Cell';
import { getCellFromPointerEvent, getDirection, isStraightLine } from '../utils/cellSelection';
import { getWordPillGeometry } from '../utils/selectionRounding';
import type { Pill } from '../types';

function Grid({ grid }: { grid: string[][] }) {
    const { dispatch, selectedCells, wordsFound } = useWOW();
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

    const getFoundWordCell = (row: number, col: number) =>
        wordsFound.find((fw) => fw.cells.some((cell) => cell.row === row && cell.col === col));

    const rows = grid?.length ?? 0;
    const cols = grid?.[0]?.length ?? 0;

    const pills: Pill[] = [];

    wordsFound.forEach((fw, idx) => {
        const geo = getWordPillGeometry(fw.cells, rows, cols);

        if (geo) pills.push({ ...geo, color: fw.color, key: `found-${idx}` });
    });

    if (selectedCells.length > 0) {
        const geo = getWordPillGeometry(selectedCells, rows, cols);

        if (geo) pills.push({ ...geo, color: '#1e2939', key: 'selection' });
    }

    return (
        <div
            className="relative grid w-full rounded-2xl bg-gray-200"
            style={{
                gridTemplateColumns: `repeat(${cols}, 1fr)`,
                userSelect: 'none',
                touchAction: 'none',
            }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={endSelection}
        >
            {/* Higlighted overlay layer: pill drwan along each word */}
            <div className="pointer-events-none absolute inset-0 z-0">
                {pills.map((pill) => {
                    return (
                        <div
                            key={pill.key}
                            className="absolute rounded-full"
                            style={{
                                left: `${pill.midX}%`,
                                top: `${pill.midY}%`,
                                width: `${pill.length}%`,
                                height: `${pill.thickness}%`,
                                background: `${pill.color}`,
                                opacity: 0.75,
                                transform: `translate(-50%, -50%) rotate(${pill.angle}deg)`,
                                transformOrigin: 'center',
                            }}
                        ></div>
                    );
                })}
            </div>
            {grid.flatMap((row, rowIdx) =>
                row.map((letter, colIdx) => (
                    <Cell
                        key={`${rowIdx}-${colIdx}`}
                        data-row={rowIdx}
                        data-col={colIdx}
                        selected={isSelected(rowIdx, colIdx)}
                        found={!!getFoundWordCell(rowIdx, colIdx)}
                    >
                        {letter}
                    </Cell>
                )),
            )}
        </div>
    );
}

export default Grid;
