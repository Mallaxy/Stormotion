import React, {useEffect, useState} from 'react';
import s from './MainPage.module.css'
import {ButtonBlock} from './ButtonBlock/ButtonBlock'
import Preloader from '../../preloader/Preloader'
import {GameField} from './GameField/GameField'
import {Modal} from '../ModalWinner/Modal';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import {State} from '../../redusers/gameReducer'
import {gameRules} from '../../common/constants';


type MainPageProps = {
    dispatch: any,
    state: State
}

export const MainPage: React.FC<MainPageProps> = ({dispatch, state}) => {
    const [modalActive, setModalActive] = useState(false)
    const botAction = (number: number): void => {
        dispatch({type: 'BOT_ACTION', number})
    }

    const botLogic = (): number => {
        if (state.botState.length % 2 === 0 && (state.state.length - state.maxPick) === 0) return state.maxPick
        if (state.botState.length % 2 !== 0 && state.state.length === 1) return 1
        if (state.botState.length % 2 === 0 && state.state.length >= 2) return 2
        if (state.botState.length % 2 !== 0 && state.state.length >= 3) return 3
        return 1
    }
    const handleClick = (number: number): void => {
        dispatch({type: 'MY_ACTION', number})
    }
    useEffect(() => {
        setTimeout(() => {
            if (!state.myTurn) {
                botAction(botLogic())
            }
        }, 500);
    }, [state])

    const calcWinner = () => {
        if (state.state.length === 0) {
            if (state.botState.length % 2 === 0) return 'Bot is a winner!'
            if (state.myState.length % 2 === 0) return 'You are the winner!'
        }
    }
    if (state.state.length === 0 && !modalActive) setModalActive(true)
    return (
        <div className={s.mainPage}>
            <MenuIcon onClick={() => setModalActive(true)}/>
            <GameField state={state.botState}/>
            {!state.myTurn ? <Preloader/> : null}
            {state.state.length ? <GameField state={state.state}/> : null}
            <GameField state={state.myState}/>
            <ButtonBlock {...{
                handleClick,
                stateLength: state.state.length,
                myTurn: state.myTurn,
                maxPick: state.maxPick
            }}/>
            <Modal active={modalActive} setActive={setModalActive}>
                <div className={s.winner}>{state.state.length === 0 ? calcWinner() : 'Hello my Master!'}</div>
                <div className={s.rules}>
                    <h1>Rules</h1>
                    {gameRules}
                </div>
                <Button variant="contained" size="large" onClick={() => {
                    setModalActive(false)
                    dispatch({type: 'RESET_STATE', initialState: state.startState})
                }} color="primary">New Game</Button>
            </Modal>
        </div>
    );
}