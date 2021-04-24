import React, {useReducer} from 'react';
import {Redirect, Route} from 'react-router-dom';
import './App.css';
import {MainPage} from './components/MainPage/MainPage'
import Navbar from './components/Navbar/Navbar'
import {HomePage} from './components/HomePage/HomePage'
import {gameReducer, State} from './redusers/gameReducer'

export const App: React.FC = () => {
    const initialState: State = {
        state: Array(25).fill(''),
        myState: [],
        botState: [],
        myTurn: true,
        maxPick: 3,
        startState: {
            state: Array(25).fill(''),
            myState: [],
            botState: [],
            myTurn: true,
            maxPick: 3,
        }
    }
    const [state, dispatch] = useReducer(gameReducer, initialState)

    return (
        <div className="wrapper">
            <div className="container">
                <Navbar/>
                <div className="page">
                    <Route exact path="/">
                        <Redirect to="/home"/>
                    </Route>
                    <Route path="/home" render={() => <HomePage dispatch={dispatch}/>}/>
                    <Route path="/classic" render={() => <MainPage state={state} dispatch={dispatch}/>}/>
                </div>
            </div>
        </div>
    );
}

