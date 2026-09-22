/*
    Computes gerometry for a single rounded "pill" overlay that spans an ordered sequence of cells (word) in 8 directions
*/

import type { Cell, Pill } from "../types";



export function getWordPillGeometry(cells: Cell[], rows: number, cols: number): Pill | null {
    if (!cells || cells.length === 0 || !rows || !cols) return null;

    const first = cells[0];
    const last = cells[cells.length - 1]

    const cellW = 100 / cols;
    const cellH = 100 / rows

    const x1 = (first.col + 0.5) * cellW;
    const y1 = (first.row + 0.5) * cellH;
    const x2 = (last.col + 0.5) * cellW;
    const y2 = (last.row + 0.5) * cellH;

    const thickness = Math.min(cellH, cellW)

    const dx = x2 - x1;
    const dy = y2 - y1
    const dist = Math.hypot(dx, dy)
    const length = dist + thickness

    const angle = (Math.atan2(dy, dx) * 180) / Math.PI

    const midX = (x1 + x2) / 2
    const midY = (y1 + y2) / 2

    return {
        midX, midY, length, thickness, angle
    }
}