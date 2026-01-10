export const GAME_SESSION_KEY = 'wowGameSession';

export const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
export const rows = 6;
export const columns = 6;

export const DIRECTIONS = [
    [0, 1], // → right
    [0, -1], // ← left
    [1, 0], // ↓ down
    [-1, 0], // ↑ up
    [1, 1], // ↘ diagonal down-right
    [-1, -1], // ↖ diagonal up-left
    [1, -1], // ↙ diagonal down-left
    [-1, 1], // ↗ diagonal up-right
];
