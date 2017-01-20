import reducer from './index'
describe('reducer tests', () => {
    const initialState = {
        board: Array(9).fill(null),
        stepNumber: 0,
        playerSymbol: null
    }
    it('should provide the initial state', () => {
        expect(reducer(undefined, {})).toEqual(initialState)
    })

    it('should return state with selected player symbol', () => {
        expect(reducer(undefined, { type: 'USER_SELECT_SYMBOL', selectedSymbol: "X" })).toEqual({ ...initialState, playerSymbol: "X" })
    })

    it('should return state with celected cell and increase stepNumber counter', () => {
        const stateBefore = initialState;
        const expectedStateAfter = {
            ...stateBefore,
            board: [
                ...stateBefore.board.slice(0, 5),
                "X",
                ...stateBefore.board.slice(6),
            ],
            stepNumber: stateBefore.stepNumber + 1
        }
        expect(reducer(stateBefore, { type: 'SELECT_CELL', position: 5, symbol: "X" })).toEqual(expectedStateAfter)
    })
    it('should return the same state if action type is undesfined', () => {
        expect(reducer(initialState, {})).toEqual(initialState)
    })
})


