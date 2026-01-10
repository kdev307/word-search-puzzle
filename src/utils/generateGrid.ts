import { DIRECTIONS } from '../constants/game';
import { generateGridLetters } from './generateGridLetter';
import { canPlaceWord, placeWord } from './wordPlacement';

export function generateGrid(rows: number, columns: number, words: string[] = []) {
    const grid = Array.from({ length: rows }, () => Array.from({ length: columns }, () => ''));

    const wordsInGrid = [];

    for (const word of words) {
        let placed = false;
        let attempts = 0;

        while (!placed && attempts < 100) {
            const [dx, dy] = DIRECTIONS[Math.floor(Math.random() * DIRECTIONS.length)];
            const row = Math.floor(Math.random() * rows);
            const col = Math.floor(Math.random() * columns);

            if (canPlaceWord(word, row, col, dx, dy, grid, rows, columns)) {
                placeWord(word, row, col, dx, dy, grid);
                placed = true;
                wordsInGrid.push(word);
                console.log(`✅ Placed word: ${word} at (${row},${col}) dir [${dx},${dy}]`);
            }

            attempts++;
        }

        if (!placed) {
            console.warn(`❌ Could not place word: ${word}`);
        }
    }

    const wordGrid = grid.map((row) =>
        row.map((cell) => (cell === '' ? generateGridLetters().toUpperCase() : cell)),
    );
    return { grid: wordGrid, words: wordsInGrid };
}
