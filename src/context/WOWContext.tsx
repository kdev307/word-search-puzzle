import { createContext, useEffect, useReducer } from 'react';
import type { ReactNode, Dispatch } from 'react';
import { ACTIONS, type ActionType } from '../constants/actions';
import { clearSession, loadSession, saveSession } from '../utils/storage';
import { generateColorPalette } from '../utils/generateColours';
import { getDirection } from '../utils/cellSelection';

interface WOWState {
    grid: string[][];
    words: string[];
    selectedCells: { row: number; col: number }[];
    currentWord: string;
    score: number;
    wordsFound: { word: string; cells: { row: number; col: number }[]; color: string }[];
    status: ActionType;
    loading: boolean;
    colors: string[];
}

interface LoadingAction {
    type: typeof ACTIONS.LOADING;
    payload: boolean;
}

interface NewGameAction {
    type: typeof ACTIONS.NEW_GAME;
    payload: { grid: string[][]; words: string[] };
}

interface SelectCellAction {
    type: typeof ACTIONS.SELECT_CELL;
    payload: { row: number; col: number };
}

interface ClearSelectionAction {
    type: typeof ACTIONS.CLEAR_SELECTION;
}

interface StartSelectionAction {
    type: typeof ACTIONS.START_SELECTION;
    payload: { row: number; col: number };
}

interface ExtendSelectionAction {
    type: typeof ACTIONS.EXTEND_SELECTION;
    payload: { row: number; col: number };
}

interface EndSelectionAction {
    type: typeof ACTIONS.END_SELECTION;
}

interface ValidateWordAction {
    type: typeof ACTIONS.VALIDATE_WORD;
}

interface ResetGameAction {
    type: typeof ACTIONS.RESET_GAME;
}

interface ReadyGameAction {
    type: typeof ACTIONS.READY_GAME;
}

interface FinishGameAction {
    type: typeof ACTIONS.FINISH_GAME;
}

interface NeedHelpAction {
    type: typeof ACTIONS.NEED_HELP;
}

type WOWAction =
    | LoadingAction
    | SelectCellAction
    | ClearSelectionAction
    | StartSelectionAction
    | ExtendSelectionAction
    | EndSelectionAction
    | ValidateWordAction
    | NewGameAction
    | ResetGameAction
    | ReadyGameAction
    | FinishGameAction
    | NeedHelpAction;

interface WOWContextType extends WOWState {
    dispatch: Dispatch<WOWAction>;
}

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
            };

        case ACTIONS.FINISH_GAME:
            return {
                ...state,
                status: ACTIONS.FINISH_GAME,
            };

        case ACTIONS.NEED_HELP:
            return {
                ...state,
                status: ACTIONS.NEED_HELP,
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
            const isFound = state.words.includes(state.currentWord);
            const isNewWord =
                isFound && !state.wordsFound.some((fw) => fw.word === state.currentWord);

            if (!isFound) {
                return { ...state, currentWord: '', selectedCells: [] };
            }

            const foundedWordData = {
                word: state.currentWord,
                cells: state.selectedCells,
                color: state.colors[state.wordsFound.length % state.colors.length],
                direction: getDirection(
                    state.selectedCells[0],
                    state.selectedCells[state.selectedCells.length - 1],
                ),
            };
            return {
                ...state,
                wordsFound: isNewWord ? [...state.wordsFound, foundedWordData] : state.wordsFound,
                currentWord: '',
                selectedCells: [],
            };
        }
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
    const { grid, words, currentWord, selectedCells, score, wordsFound, status, loading, colors } =
        state;

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
                dispatch,
            }}
        >
            {children}
        </WOWContext.Provider>
    );
}

export { WOWContext, WOWProvider };
