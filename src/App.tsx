import React from 'react';
import {Redirect, Route} from 'react-router-dom';
import './App.css';
import {MainPage} from './components/MainPage/MainPage';
import Navbar from './components/Navbar/Navbar';
import {HomePage} from './components/HomePage/HomePage';
import {GameProvider} from './Context/GameProvider'

export const App: React.FC = () => {
    return (
        <GameProvider>
            <div className="wrapper">
                <div className="container">
                    <Navbar/>
                    <div className="page">
                        <Route exact path="/">
                            <Redirect to="/home"/>
                        </Route>
                        <Route path="/home" render={() => <HomePage />}/>
                        <Route
                            path="/classic"
                            render={() => <MainPage />}
                        />
                    </div>
                </div>
            </div>
        </GameProvider>
    );
};
