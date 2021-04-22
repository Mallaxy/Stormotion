type State = {
    state: Array<string | undefined>,
    myState: Array<string | any>,
    botState: Array<string | any>,
    myTurn: boolean
}
type Action =
    | { type: 'BOT_ACTION', number: number }
    | { type: 'MY_ACTION', number: number }
    | { type: 'RESET_STATE', initialState: State }
    | { type: 'SELECT_MODE', mode: boolean }

export const gameReducer = (state: State, action: Action) => {
    let stateCopy = {...state, state: [...state.state]}
    switch (action.type) {
        case 'BOT_ACTION':
            return {
                ...stateCopy,
                botState: [...stateCopy.botState, ...stateCopy.state.splice(0, action.number)],
                myTurn: true
            }
        case 'MY_ACTION':
            return {
                ...stateCopy,
                myState: [...stateCopy.myState, ...stateCopy.state.splice(0, action.number)],
                myTurn: false
            }
        case 'RESET_STATE':
            return {...action.initialState}
        case 'SELECT_MODE':
            return {...stateCopy, myTurn: action.mode}
        default:
            return state
    }
}
