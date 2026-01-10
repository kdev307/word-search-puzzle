import { GAME_SESSION_KEY } from '../constants/game';

interface GameState {
    grid: string[][];
    words: string[];
    wordsFound: { word: string; cells: { row: number; col: number }[] }[];
    score: number;
}

export function saveSession(state: GameState) {
    try {
        const { grid, words, wordsFound, score } = state;
        sessionStorage.setItem(
            GAME_SESSION_KEY,
            JSON.stringify({ grid, words, wordsFound, score }),
        );
    } catch (err) {
        console.error('Error saving session data:', err);
    }
}

export function loadSession() {
    try {
        const data = sessionStorage.getItem(GAME_SESSION_KEY);
        if (!data) return null;

        const parsed = JSON.parse(data);
        return {
            ...parsed,
            wordsFound: parsed.wordsFound ?? [],
        };
    } catch (err) {
        console.error('Error loading session data:', err);
        return null;
    }
}

export function clearSession() {
    try {
        sessionStorage.removeItem(GAME_SESSION_KEY);
    } catch (err) {
        console.error('Error clearing game session:', err);
    }
}
