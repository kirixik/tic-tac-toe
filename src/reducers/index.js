const initialState = { // initial state of application
  board: Array(9).fill(null),
  stepNumber: 0,
  playerSymbol: null,
}
/*
    * public: main reducer of the application, return next state 
    * @param state [State]:  state of application
    * @param action [Action]:  action
    * @returns [State]: next State of application
*/
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "USER_SELECT_SYMBOL": { // when user click select first or select second
      return { ...state, playerSymbol: action.selectedSymbol }
    }
    case "SELECT_CELL": { // when user click at cell
      return {
        ...state,
        board: [
          ...state.board.slice(0, action.position),
          action.symbol,
          ...state.board.slice(action.position + 1),
        ],
        playerSymbol: (state.playerSymbol === null && state.stepNumber === 0) ? "X" : state.playerSymbol,
        stepNumber: state.stepNumber + 1
      };
    }
    case "RESTART_GAME": { // when user click restart
      return { ...initialState };
    }
    default:
      return state;
  }
}
export default reducer;
