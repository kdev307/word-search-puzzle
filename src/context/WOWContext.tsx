import { createContext, useReducer } from "react";
import type { ReactNode, Dispatch } from "react";
import { ACTIONS, type ActionType } from "../constants/actions";

interface WOWState {
    grid: string[][];
    words: string[];
    currentWord: string;
    score: number;
    foundWords: string[];
    status: ActionType;
    loading: boolean;
}

interface LoadingAction {
    type: typeof ACTIONS.LOADING;
    payload: boolean;
}

interface InitGridAction {
    type: typeof ACTIONS.INIT_GRID;
    payload: { grid: string[][]; words: string[] };
}

interface ResetGameAction {
    type: typeof ACTIONS.RESET_GAME;
}

interface FinishGameAction {
    type: typeof ACTIONS.FINISH_GAME;
}

interface NeedHelpAction {
    type: typeof ACTIONS.NEED_HELP;
}

type WOWAction =
    | LoadingAction
    | InitGridAction
    | ResetGameAction
    | FinishGameAction
    | NeedHelpAction;

interface WOWContextType extends WOWState {
    dispatch: Dispatch<WOWAction>;
}

const initialState: WOWState = {
    grid: [],
    words: [],
    currentWord: "",
    score: 0,
    foundWords: [],
    status: ACTIONS.READY_GAME,
    loading: true,
};

function wowReducer(state: WOWState, action: WOWAction): WOWState {
    switch (action.type) {
        case ACTIONS.LOADING:
            return { ...state, loading: action.payload };
        case ACTIONS.INIT_GRID:
            return {
                ...state,
                grid: action.payload.grid,
                words: action.payload.words,
                loading: false,
                status: ACTIONS.READY_GAME,
            };

        case ACTIONS.RESET_GAME:
            return {
                ...initialState,
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
        default:
            throw new Error("Unknown Action");
    }
}

const WOWContext = createContext(undefined as WOWContextType | undefined);

interface WOWProviderProps {
    children: ReactNode;
}

function WOWProvider({ children }: WOWProviderProps) {
    const [{ grid, words, currentWord, score, foundWords, status, loading }, dispatch] = useReducer(
        wowReducer,
        initialState
    );

    return (
        <WOWContext.Provider
            value={{
                grid,
                words,
                currentWord,
                score,
                foundWords,
                status,
                loading,
                dispatch,
            }}
        >
            {children}
        </WOWContext.Provider>
    );
}

export { WOWContext, WOWProvider };
