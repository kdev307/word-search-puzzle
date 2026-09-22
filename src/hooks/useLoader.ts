import { useState, useEffect } from 'react';
import { letters } from '../constants/game';
import { initializeGrid } from '../utils/generateGrid';

export function useLoader(rows: number, columns: number, intervalTime: number = 200): string[][] {
    const [grid, setGrid] = useState<string[][]>(() => initializeGrid(rows, columns));

    useEffect(() => {
        const interval = window.setInterval(() => {
            setGrid((prevGrid) =>
                prevGrid.map((row) =>
                    row.map(() => letters.charAt(Math.floor(Math.random() * letters.length))),
                ),
            );
        }, intervalTime);

        return () => window.clearInterval(interval);
    }, [rows, columns, intervalTime]);

    return grid;
}
