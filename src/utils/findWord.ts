import { rows, columns, DIRECTIONS } from '../constants/game';

import type { Cell, Direction, Grid, WordPath } from '../types';

const isValid = (r: number, c: number) =>
    r >= 0 && r < rows && c >= 0 && c < columns;

function helper(
    grid: Grid,
    word: string,
    r: number,
    c: number,
    idx: number,
    path: Cell[],
    dir: Direction | null,
    visited: boolean[][],
): WordPath | null {
    if (idx === word.length) {
        return {
            path: [...path],
            direction: dir ?? { dx: 0, dy: 0 },
        };
    }

    if (
        !isValid(r, c) ||
        visited[r][c] ||
        grid[r][c] !== word[idx]
    ) {
        return null;
    }

    visited[r][c] = true;
    path.push({ row: r, col: c });

    let found: WordPath | null = null;

    if (idx === 0) {
        // Finding first match (searching in all directions)
        for (const [dx, dy] of DIRECTIONS) {
            const res = helper(
                grid,
                word,
                r + dx,
                c + dy,
                idx + 1,
                path,
                { dx, dy },
                visited,
            );

            if (res) {
                found = res;
                break;
            }
        }
    } else {
        // Finding in a straight line only after characters are matched
        if (!dir) return null;

        found = helper(
            grid,
            word,
            r + dir.dx,
            c + dir.dy,
            idx + 1,
            path,
            dir,
            visited,
        );
    }

    path.pop();
    visited[r][c] = false;

    return found;
}

export function findWord(
    grid: Grid,
    word: string,
): WordPath | null {
    if (!word || !grid || grid.length === 0) {
        return null;
    }

    const visited = Array(rows)
        .fill(false)
        .map(() => Array(columns).fill(false));

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            const res = helper(
                grid,
                word,
                r,
                c,
                0,
                [],
                null,
                visited,
            );

            if (res) {
                return res;
            }
        }
    }

    return null;
}