import { createContext, useReducer } from "react";
import type { ReactNode, Dispatch } from "react";
import { ACTIONS } from "../constants/actions";

interface WOWState {
    grid: string[][];
    currentWord: string;
    score: number;
    foundWords: string[];
    status: string;
    loading: boolean;
}

interface LoadingAction {
    type: typeof ACTIONS.LOADING;
    payload: boolean;
}

interface InitGridAction {
    type: typeof ACTIONS.INIT_GRID;
    payload: string[][];
}

type WOWAction = LoadingAction | InitGridAction;

interface WOWContextType extends WOWState {
    dispatch: Dispatch<WOWAction>;
}

const initialState: WOWState = {
    grid: [],
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
            return { ...state, grid: action.payload, loading: false };
        default:
            throw new Error("Unknown Action");
    }
}

// ✅ FIXED LINE
const WOWContext = createContext(undefined as WOWContextType | undefined);

interface WOWProviderProps {
    children: ReactNode;
}

function WOWProvider({ children }: WOWProviderProps) {
    const [{ grid, currentWord, score, foundWords, status, loading }, dispatch] = useReducer(
        wowReducer,
        initialState
    );

    return (
        <WOWContext.Provider
            value={{
                grid,
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
