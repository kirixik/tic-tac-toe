const initialState = {
  board: Array(9).fill(null),
  stepNumber: 0,
  playerSymbol: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "USER_SELECT_SYMBOL": {
      return { ...state, playerSymbol: action.selectedSymbol }
    }
    case "SELECT_CELL": {
      return {
        ...state,
        board: [
          ...state.board.slice(0, action.position),
          action.symbol,
          ...state.board.slice(action.position + 1),
        ],
        stepNumber: state.stepNumber + 1
      }
    }
    default:
      return state;
  }
}
export default reducer;
