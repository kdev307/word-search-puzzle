export function getDirection(
    start: { row: number; col: number },
    end: { row: number; col: number },
) {
    const dx = Math.sign(end.row - start.row);
    const dy = Math.sign(end.col - start.col);
    return { dx, dy };
}

export function isStraightLine(
    start: { row: number; col: number },
    direction: { dx: number; dy: number },
    current: { row: number; col: number },
) {
    if (!direction) return false;

    const dx = current.row - start.row;
    const dy = current.col - start.col;

    if (direction.dy === 0 && dy !== 0) return false;
    if (direction.dx === 0 && dx !== 0) return false;

    if (direction.dx !== 0 && direction.dy !== 0 && Math.abs(dx) !== Math.abs(dy)) return false;

    return true;
}
