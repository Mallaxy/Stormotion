import React, {Dispatch, ReactNode, useContext} from 'react';
import {Action, State, useGameReducer} from '../hooks/useGameReducer';
import {raise} from '../utils/utils';

type ReducerValues = {
    dispatch: Dispatch<Action>;
    state: State;
};

const GameContext = React.createContext<ReducerValues | undefined>(undefined);

export const useGame = () =>
    useContext(GameContext) ?? raise(new Error('No game context.'));

interface GameProviderProps {
    children: ReactNode;
}

export const GameProvider = ({children}: GameProviderProps) => {
    const {dispatch, state} = useGameReducer();

    return (
        <GameContext.Provider value={{dispatch, state}}>
            {children}
        </GameContext.Provider>
    );
};
