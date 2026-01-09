import { useState } from 'react';
import { ACTIONS } from '../constants/actions';
import useWOW from '../hooks/useWOW';
import Cell from './Cell';

interface GridProps {
    grid: string[][];
}

function Grid({ grid }: GridProps) {
    const { dispatch, selectedCells } = useWOW();
    const [isSelecting, setIsSelecting] = useState<boolean>(false);

    const handleMouseDown = (row: number, col: number) => {
        setIsSelecting(true);
        dispatch({ type: ACTIONS.START_SELECTION, payload: { row, col } });
    };

    const handleMouseEnter = (row: number, col: number) => {
        if (!isSelecting) return;
        dispatch({ type: ACTIONS.EXTEND_SELECTION, payload: { row, col } });
    };

    const handleMouseUp = () => {
        if (isSelecting) {
            setIsSelecting(false);
            dispatch({ type: ACTIONS.END_SELECTION });
        }
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
