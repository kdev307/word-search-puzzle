import { createContext, useEffect, useReducer } from 'react';
import type { ReactNode } from 'react';
import { ACTIONS } from '../constants/actions';
import { clearSession, loadSession, saveSession } from '../utils/storage';
import { generateColorPalette } from '../utils/generateColours';
import { getDirection } from '../utils/cellSelection';
// import type { Cell, FoundWord, Grid, Word } from '../types';

import type { WOWAction, WOWContextType, WOWState } from '../types';

const gameSession = loadSession();

const initialState: WOWState = {
    grid: gameSession?.grid ?? [],
    words: gameSession?.words ?? [],
    currentWord: '',
    selectedCells: [],
    score: gameSession?.score ?? 0,
    wordsFound: gameSession?.wordsFound ?? [],
    status: ACTIONS.READY_GAME,
    loading: false,
    colors: gameSession?.colors ?? [],
    startTime: null,
    timeTaken: 0,
};

function wowReducer(state: WOWState, action: WOWAction): WOWState {
    switch (action.type) {
        case ACTIONS.LOADING:
            return { ...state, loading: action.payload };
        case ACTIONS.NEW_GAME:
            clearSession();
            return {
                ...initialState,
                grid: action.payload.grid,
                words: action.payload.words,
                loading: false,
                status: ACTIONS.READY_GAME,
                colors: generateColorPalette(action.payload.words.length),
                startTime: Date.now(),
                timeTaken: 0,
            };

        case ACTIONS.RESET_GAME:
            return {
                ...state,
                wordsFound: [],
                score: 0,
                currentWord: '',
                selectedCells: [],
                loading: false,
                status: ACTIONS.READY_GAME,
                startTime: Date.now(),
                timeTaken: 0,
            };

        case ACTIONS.FINISH_GAME:
            return {
                ...state,
                status: ACTIONS.FINISH_GAME,
                timeTaken: state.startTime ? Math.floor((Date.now() - state.startTime) / 1000) : 0,
            };

        case ACTIONS.NEED_HELP:
            return {
                ...state,
                score: state.score - 5,
                // wordsFound: [...state.wordsFound, action.payload],
            };

        case ACTIONS.START_SELECTION:
            return {
                ...state,
                selectedCells: [action.payload],
                currentWord: state.grid[action.payload.row][action.payload.col],
            };

        case ACTIONS.EXTEND_SELECTION: {
            const alreadySelected = state.selectedCells.some(
                (cell) => cell.row === action.payload.row && cell.col === action.payload.col,
            );

            return alreadySelected
                ? state
                : {
                      ...state,
                      selectedCells: [...state.selectedCells, action.payload],
                      currentWord:
                          state.currentWord + state.grid[action.payload.row][action.payload.col],
                  };
        }

        case ACTIONS.END_SELECTION: {
            const isFound = state.words.some((word) => word.word === state.currentWord);
            const isNewWord =
                isFound && !state.wordsFound.some((fw) => fw.word === state.currentWord);

            if (!isFound) {
                return { ...state, currentWord: '', selectedCells: [] };
            }

            const foundedWordData = {
                word: state.currentWord,
                cells: state.selectedCells,
                color: state.colors[Math.floor(Math.random() * state.colors.length)],
                direction: getDirection(
                    state.selectedCells[0],
                    state.selectedCells[state.selectedCells.length - 1],
                ),
            };
            return {
                ...state,
                wordsFound: isNewWord ? [...state.wordsFound, foundedWordData] : state.wordsFound,
                score: isNewWord ? state.score + 10 : state.score,
                currentWord: '',
                selectedCells: [],
            };
        }
        case ACTIONS.START_TIMER:
            return { ...state, startTime: Date.now(), timeTaken: 0 };

        case ACTIONS.TICK:
            return { ...state, timeTaken: action.payload };

        default:
            throw new Error('Unknown Action');
    }
}

const WOWContext = createContext(undefined as WOWContextType | undefined);

interface WOWProviderProps {
    children: ReactNode;
}

function WOWProvider({ children }: WOWProviderProps) {
    const [state, dispatch] = useReducer(wowReducer, initialState);
    const {
        grid,
        words,
        currentWord,
        selectedCells,
        score,
        wordsFound,
        status,
        loading,
        colors,
        timeTaken,
    } = state;

    useEffect(() => {
        if (!state.loading) {
            saveSession({
                grid: state.grid,
                words: state.words,
                wordsFound: state.wordsFound,
                score: state.score,
            });
        }
    }, [state.grid, state.words, state.wordsFound, state.score, state.loading]);

    useEffect(() => {
        if (!state.startTime || status === ACTIONS.FINISH_GAME) return;

        const interval = setInterval(() => {
            dispatch({
                type: ACTIONS.TICK,
                payload: state.startTime ? Math.floor((Date.now() - state.startTime) / 1000) : 0,
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [status, state.startTime, dispatch]);

    return (
        <WOWContext.Provider
            value={{
                grid,
                words,
                currentWord,
                selectedCells,
                score,
                wordsFound,
                status,
                loading,
                colors,
                timeTaken,
                startTime: state.startTime,
                dispatch,
            }}
        >
            {children}
        </WOWContext.Provider>
    );
}

export { WOWContext, WOWProvider };
