import React from 'react';
import {Redirect, Route } from 'react-router-dom';
import './App.css';
import { CustomPage } from './components/CustomPage/CustomPage';
import {MainPage} from './components/MainPage/MainPage'
import Navbar from './components/Navbar/Navbar'

export const App:React.FC = () => {
  return (
    <div className="wrapper">
        <div className="container">
            <Navbar />
            <div className="page">
                <Route exact path='/'>
                    <Redirect to="/classic" />
                </Route>
                <Route path="/classic" render={() => <MainPage />} />
                <Route path='/custom' render={() => <CustomPage />}/>
            </div>
        </div>
    </div>
  );
}

