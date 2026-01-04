import { generateGridLetters } from "./generateGridLetter";

export function generateGrid(rows: number, columns: number) {
    return Array.from({ length: rows }, () =>
        Array.from({ length: columns }, () => generateGridLetters())
    );
}
