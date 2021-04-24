export type State = {
  state: Array<string | undefined>;
  myState: Array<string | undefined>;
  botState: Array<string | undefined>;
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
  state: Array<string | undefined>;
  myState: Array<string | undefined>;
  botState: Array<string | undefined>;
  myTurn: boolean;
  maxPick: number;
};

export type Action =
  | { type: "BOT_ACTION"; number: number }
  | { type: "MY_ACTION"; number: number }
  | { type: "RESET_STATE"; initialState: StartState }
  | { type: "SELECT_MODE"; mode: boolean }
  | { type: "SET_STATE"; values: ValuesState };

const initialState: State = {
  state: Array(25).fill(""),
  myState: [],
  botState: [],
  myTurn: true,
  maxPick: 3,
  startState: {
    state: Array(25).fill(""),
    myState: [],
    botState: [],
    myTurn: true,
    maxPick: 3,
  },
};

export const gameReducer = (
  state: State = initialState,
  action: Action
): State => {
  let stateCopy = { ...state, state: [...state.state] };
  switch (action.type) {
    case "BOT_ACTION":
      return {
        ...stateCopy,
        botState: [
          ...stateCopy.botState,
          ...stateCopy.state.splice(0, action.number),
        ],
        myTurn: true,
      };
    case "MY_ACTION":
      return {
        ...stateCopy,
        myState: [
          ...stateCopy.myState,
          ...stateCopy.state.splice(0, action.number),
        ],
        myTurn: false,
      };
    case "RESET_STATE":
      return { ...action.initialState, startState: { ...action.initialState } };
    case "SET_STATE":
      let startState = {
        ...stateCopy,
        state: Array(action.values.count * 2 + 1).fill(""),
        myTurn: action.values.beginner === "player",
        maxPick: action.values.maxPick,
        botState: [],
        myState: [],
      };
      return { ...startState, startState: { ...startState } };
    default:
      return state;
  }
};
