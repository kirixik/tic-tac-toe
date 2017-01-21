import { nextPlayer, isTerminal, heuristic, isAiTurn } from './index'
describe('gamehelpers tests', () => {
    const initialState = {
        board: ["X", null, null, "X", null, "O", null, null, "O"],
        stepNumber: 4,
        playerSymbol: "O"
    }
    it('should return next player', () => {
        expect(nextPlayer("X")).toEqual("O");
        expect(nextPlayer("O")).toEqual("X");
    })

    it('should return true if now AI turn', () => {
        const aiTurnState = initialState;
        expect(isAiTurn(aiTurnState)).toEqual(true);
        const playerTurnState = {
            board: ["X", null, null, "X", null, "O", null, null, "O"],
            stepNumber: 4,
            playerSymbol: "X"
        }
        expect(isAiTurn(playerTurnState)).toEqual(false);
    })

    it('should return true if state is terminal', () => {
        const noTerminalState = initialState;
        expect(isTerminal(noTerminalState.board)).toEqual(false);
        const terminalState = {
            board: ["X", "X", "X", null, null, "O", null, null, "O"],
            stepNumber: 5,
            playerSymbol: "X"
        }
        expect(isTerminal(terminalState.board)).toEqual(true);
    })

    it('should return heuristic evaluation of state', () => {
        const noWinConditionState = initialState;
        expect(heuristic(noWinConditionState.board, "X", 0)).toEqual(50);
        const winConditionState = {
            board: ["X", "X", "X", null, null, "O", null, null, "O"],
            stepNumber: 5,
            playerSymbol: "X"
        }
        expect(heuristic(winConditionState.board, "X", 0)).toEqual(100);
    })

})


