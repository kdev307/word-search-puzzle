import type { Dispatch } from "react";
import { ACTIONS, type ActionType } from '../src/constants/actions';

export type Cell = {
    row: number;
    col: number;
};

export type Grid = string[][];


export type Direction = {
    readonly dx: number;
    readonly dy: number;
};


// export type Word = {
//     word: string;
//     startingCoord: [number, number]
//     direction: Direction;
// };

// export type FoundWord = {
//     word: string;
//     cells: Cell[];
//     color?: string;
//     direction: Direction;
//     revealed?: boolean
// };

export type Word = {
    word: string;
    cells: Cell[];
    startingCoord: Cell;
    direction: Direction;
};

export type FoundWord = Word & {
    color?: string;
    revealed?: boolean;
};

export type WordPath = {
    path: Cell[];
    direction: Direction;
} | null;


export type Pill = {
    midX: number;
    midY: number;
    length: number;
    thickness: number;
    angle: number;
    color?: string;
    key?: string;
};

/////////////////////////////


export interface WOWState {
    grid: Grid;
    words: Word[];
    selectedCells: Cell[];
    currentWord: string;
    score: number;
    wordsFound: FoundWord[];
    hintsUsed: number;
    solutionsRevealed: number;
    status: ActionType;
    loading: boolean;
    colors: string[];
    startTime: number | null;
    timeTaken: number;
}

export interface GameState {
    grid: Grid;
    words: Word[];
    wordsFound: FoundWord[];
    score: number;
    hintsUsed: number,
    solutionsRevealed: number
}

export interface LoadingAction {
    type: typeof ACTIONS.LOADING;
    payload: boolean;
}

export interface NewGameAction {
    type: typeof ACTIONS.NEW_GAME;
    payload: {
        grid: Grid;
        words: Word[];
    };
}

export interface SelectCellAction {
    type: typeof ACTIONS.SELECT_CELL;
    payload: Cell;
}

export interface ClearSelectionAction {
    type: typeof ACTIONS.CLEAR_SELECTION;
}

export interface StartSelectionAction {
    type: typeof ACTIONS.START_SELECTION;
    payload: Cell;
}

export interface ExtendSelectionAction {
    type: typeof ACTIONS.EXTEND_SELECTION;
    payload: Cell;
}

export interface EndSelectionAction {
    type: typeof ACTIONS.END_SELECTION;
}

export interface ValidateWordAction {
    type: typeof ACTIONS.VALIDATE_WORD;
}

export interface ResetGameAction {
    type: typeof ACTIONS.RESET_GAME;
}

export interface ReadyGameAction {
    type: typeof ACTIONS.READY_GAME;
}

export interface FinishGameAction {
    type: typeof ACTIONS.FINISH_GAME;
}

export interface NeedHelpAction {
    type: typeof ACTIONS.NEED_HELP;
    payload: Word;
}

export interface RevealSolution {
    type: typeof ACTIONS.REVEAL_SOLUTION;
    payload: Word
}

export interface StartTimerAction {
    type: typeof ACTIONS.START_TIMER;
}

export interface TickAction {
    type: typeof ACTIONS.TICK;
    payload: number;
}

export type WOWAction =
    | LoadingAction
    | NewGameAction
    | SelectCellAction
    | ClearSelectionAction
    | StartSelectionAction
    | ExtendSelectionAction
    | EndSelectionAction
    | ValidateWordAction
    | ResetGameAction
    | ReadyGameAction
    | FinishGameAction
    | NeedHelpAction
    | RevealSolution
    | StartTimerAction
    | TickAction;

export interface WOWContextType extends WOWState {
    dispatch: Dispatch<WOWAction>;
}