import React, { Dispatch, useEffect, useState } from "react";
import s from "./MainPage.module.css";
import { ButtonBlock } from "./ButtonBlock/ButtonBlock";
import Preloader from "../../common/Preloaders/RadialPreloader/Preloader";
import { GameField } from "./GameField/GameField";
import { Modal } from "../ModalWinner/Modal";
import MenuIcon from "@material-ui/icons/Menu";
import Button from "@material-ui/core/Button";
import { Action, State } from "../../redusers/gameReducer";
import { gameRules } from "../../common/constants";

type MainPageProps = {
  dispatch: Dispatch<Action>;
  state: State;
};

export const MainPage: React.FC<MainPageProps> = ({ dispatch, state }) => {
  const [modalActive, setModalActive] = useState(false);
  const botAction = (number: number): void => {
    dispatch({ type: "BOT_ACTION", number });
  };

  const botLogic = (): number => {
    let [stateLength, maxPick] = [state.state.length, state.maxPick];
    const oddLogic = () => {
      for (let i = 1; i <= maxPick; ++i)
        if (
          (stateLength - i) % (maxPick + 1) === 0 ||
          (stateLength - i) % 4 === 1
        ) {
          return i;
        }
      return 1;
    };
    const evenLogic = () => {
      for (let i = 1; i <= maxPick; ++i)
        if (
          (stateLength - i) % (maxPick / 2 + 1) === 0 ||
          (stateLength - i) % 4 === 1
        ) {
          return i;
        }
      return 1;
    };

    if (maxPick % 2 !== 0) return oddLogic();
    if (maxPick % 2 === 0) return evenLogic();

    return 1;
  };

  const handleClick = (number: number): void => {
    dispatch({ type: "MY_ACTION", number });
  };
  useEffect(() => {
    setTimeout(() => {
      if (!state.myTurn) {
        botAction(botLogic());
      }
    }, 500);
  }, [state.myTurn]);

  const calcWinner = () => {
    if (state.state.length === 0) {
      if (state.botState.length % 2 === 0) return "Bot is a winner!";
      if (state.myState.length % 2 === 0) return "You are the winner!";
    }
  };
  if (state.state.length === 0 && !modalActive) setModalActive(true);
  return (
    <div className={s.mainPage}>
      <div className={s.topBlock}>
        <MenuIcon onClick={() => setModalActive(true)} fontSize="large" />
        {!state.myTurn ? <Preloader /> : null}
      </div>
      <GameField state={state.botState} />
      {state.state.length ? <GameField state={state.state} /> : null}
      <GameField state={state.myState} />
      <ButtonBlock
        {...{
          handleClick,
          stateLength: state.state.length,
          myTurn: state.myTurn,
          maxPick: state.maxPick,
        }}
      />
      <Modal active={modalActive} setActive={setModalActive}>
        <div className={s.winner}>
          {state.state.length === 0 ? calcWinner() : "Hello my Master!"}
        </div>
        <div className={s.rules}>
          <h1>Rules</h1>
          {gameRules}
        </div>
        <Button
          variant="contained"
          size="large"
          onClick={() => {
            setModalActive(false);
            dispatch({ type: "RESET_STATE", initialState: state.startState });
          }}
          color="primary"
        >
          New Game
        </Button>
      </Modal>
    </div>
  );
};
