import {useReducer} from 'react';

export type State = {
    state: number;
    myState: number;
    botState: number;
    myTurn: boolean;
    maxPick: number;
    startState: StartState;
};

export type ValuesState = {
    maxPick: number;
    beginner: string;
    count: number;
};

export type StartState = {
    state: number;
    myTurn: boolean;
    maxPick: number;
};

export type Action =
    | { type: 'BOT_ACTION'; number: number }
    | { type: 'MY_ACTION'; number: number }
    | { type: 'RESET_STATE'; initialState: StartState }
    | { type: 'SELECT_MODE'; mode: boolean }
    | { type: 'SET_STATE'; values: ValuesState };

const initialState: State = {
    state: 25,
    myState: 0,
    botState: 0,
    myTurn: true,
    maxPick: 3,
    startState: {
        state: 25,
        myTurn: true,
        maxPick: 3,
    },
};

export const gameReducer = (state: State, action: Action): State => {
    switch (action.type) {
        case 'BOT_ACTION':
            return {
                ...state,
                state: state.state - action.number,
                botState: state.botState + action.number,
                myTurn: true,
            };
        case 'MY_ACTION':
            return {
                ...state,
                state: state.state - action.number,
                myState: state.myState + action.number,
                myTurn: false,
            };
        case 'RESET_STATE':
            return {
                ...action.initialState,
                myState: 0,
                botState: 0,
                startState: action.initialState,
            };
        case 'SET_STATE':
            const startState = {
                ...state,
                state: action.values.count * 2 + 1,
                myTurn: action.values.beginner === 'player',
                maxPick: action.values.maxPick,
            };
            return {...startState, botState: 0, myState: 0, startState: startState};
        default:
            return state;
    }
};

export const useGameReducer = () => {
    const [state, dispatch] = useReducer(gameReducer, initialState);
    return {
        state,
        dispatch,
    };
};
