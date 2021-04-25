import React, {Dispatch, useContext} from 'react'
import {Action, State, useGameReducer} from '../hooks/useGameReducer'

type ReduserValues = {
    dispatch: Dispatch<Action>;
    state: State;
};

const GameContext = React.createContext<ReduserValues | undefined>(undefined)

export const useGame = () => {
    return useContext(GameContext)
}

export const GameProvider: React.FC<React.ReactNode> = ({ children}) => {

    const {dispatch,state} = useGameReducer()

    return (
        <GameContext.Provider value={{dispatch, state}}>
            { children }
        </GameContext.Provider>
    )
}

