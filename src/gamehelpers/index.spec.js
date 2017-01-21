import { nextPlayer, isTerminal, heuristic, isAiTurn, availableTurns, getHighlightedCells } from './index'
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

    it('should return array of available turn position', () => {
        const testBoard = ["X", null, "X", "X", null, "O", null, null, "O"];
        expect(availableTurns(testBoard)).toEqual([1, 4, 6, 7]);
        const testBoardWithouAvailableTurns = ["X", "O", "X", "X", "O", "O", "X", "O", "O"];
        expect(availableTurns(testBoardWithouAvailableTurns)).toEqual([]);
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
        const drawState = {
            board: ["X", "X", "O", "O", "O", "X", "X", "X", null],
            stepNumber: 9,
            playerSymbol: "X"
        }
        expect(heuristic(drawState.board, "X", 0)).toEqual(50);
        const looseState = {
            board: ["X", "X", "X", "O", "O", null, null, null, null],
            stepNumber: 5,
            playerSymbol: "O"
        }
        expect(heuristic(looseState.board, "0", 0)).toEqual(-100);
    })

    it('should return highlighted cells array', () => {
        const board = ["X", "X", "X", null, null, "O", null, null, "O"];
        expect(getHighlightedCells(board)).toEqual([...Array(3).fill(true), ...Array(6).fill(false)]);
        const boardWithoutHighlights = ["X", "X", "O", null, "O", null, null, null, "O"];
        expect(getHighlightedCells(boardWithoutHighlights)).toEqual(Array(9).fill(false));
    })

})


