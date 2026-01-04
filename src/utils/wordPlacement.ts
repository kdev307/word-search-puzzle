type Grid = string[][];

export function canPlaceWord(
    word: string,
    row: number,
    col: number,
    dx: number,
    dy: number,
    grid: Grid,
    rows: number,
    columns: number
): boolean {
    for (let i = 0; i < word.length; i++) {
        const x = row + dx * i;
        const y = col + dy * i;

        if (
            x < 0 ||
            y < 0 ||
            x >= rows ||
            y >= columns ||
            (grid[x][y] !== "" && grid[x][y] !== word[i])
        ) {
            return false;
        }
    }
    return true;
}

export function placeWord(
    word: string,
    row: number,
    col: number,
    dx: number,
    dy: number,
    grid: Grid
): void {
    for (let i = 0; i < word.length; i++) {
        grid[row + dx * i][col + dy * i] = word[i];
    }
}
