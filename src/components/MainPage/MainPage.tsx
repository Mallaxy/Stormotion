import React, {useReducer, useState} from 'react';
import s from './MainPage.module.css'
import {ButtonBlock} from './ButtonBlock/ButtonBlock'
import Preloader from '../../preloader/Preloader'
import {GameField} from './GameField/GameField'
import {gameReducer} from '../../redusers/gameReducer'
import { Modal } from '../ModalWinner/Modal';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';


const gameRules = 'Двое играют в игру. Из кучки, где имеется 25 спичек, каждый берёт себе по очереди одну, две или три спички. Выигрывает тот, у кого в конце игры – после того, как все спички будут разобраны, – окажется четное число спичек.'

export const MainPage:React.FC = () => {
    const initialState = {
        state: Array(25).fill(''),
        myState: [],
        botState: [],
        myTurn: true
    }
    const [{state, myState, botState, myTurn}, dispatch] = useReducer(gameReducer, initialState)
    const [modalActive, setModalActive] = useState(false)
    const botAction = (number: number): void => {
        dispatch({type: 'BOT_ACTION', number})
    }
    const botLogic = (): number => {
        if (botState.length % 2 !== 0 && state.length === 1) return 1
        if (botState.length % 2 === 0 && state.length >= 2) return 2
        if (botState.length % 2 !== 0 && state.length >= 3) return 3
        return 1
    }
    const handleClick = (number: number): void => {
        dispatch({type: 'MY_ACTION', number})
    }
    if (!myTurn) {
        botAction(botLogic())
    }
    const calcWinner = () => {
        if (state.length === 0) {
            if (botState.length % 2 === 0) return 'Bot is a winner!'
            if (myState.length % 2 === 0) return 'You are the winner!'
        }
    }
    if ( state.length === 0 && !modalActive) setModalActive(true)
    return (
        <div className={s.mainPage}>
            <div className={s.select}>
                Who will start?
                <Button variant="contained" color="primary" onClick={() => dispatch({type: "SELECT_MODE", mode: true})}>
                    Player
                </Button>
                <Button variant="contained" color="secondary" onClick={() => dispatch({type: "SELECT_MODE", mode: false})}>
                    Bot
                </Button>
            </div>
            <MenuIcon onClick={() => setModalActive(true)}/>
            <GameField state={botState}/>
            {!myTurn ? <Preloader/> : null}
            {state.length ? <GameField state={state}/> : null}
            <GameField state={myState}/>
            <ButtonBlock {...{handleClick, stateLength: state.length, myTurn: myTurn}}/>
            <Modal active={modalActive} setActive={setModalActive}>
                <div className={s.winner}>{state.length === 0 ? calcWinner() : "Hello my Master!" }</div>
                <div className={s.rules}>{gameRules}</div>
                <Button variant="contained" size="large" onClick={() => {
                    setModalActive(false)
                    dispatch({type: "RESET_STATE", initialState})}} color='primary'>New Game</Button>
            </Modal>
        </div>
    );
}