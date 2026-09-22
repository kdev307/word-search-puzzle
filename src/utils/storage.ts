import { GAME_SESSION_KEY } from '../constants/game';
import type { GameState } from '../types';



export function saveSession(state: GameState) {
    try {
        const { grid, words, wordsFound, score, hintsUsed, solutionsRevealed } =
            state;
        sessionStorage.setItem(
            GAME_SESSION_KEY,
            JSON.stringify({
                grid,
                words,
                wordsFound,
                score,
                hintsUsed,
                solutionsRevealed,
            })
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
