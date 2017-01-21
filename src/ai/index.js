import { nextPlayer, isTerminal, heuristic, isAiTurn, isPlayerTurn, nextAvailableBoards } from '../gamehelpers'

/*
    * private: function that recursively computes the minimax value of the state
    * @param board [Array of strings]: the state to calculate its minimax value
    * @param player [String]: player symbol 'X' or 'O'
    * @param depth [Number]:  analysis depth
    * @returns [Number]: the minimax value of the state
*/

const MiniMax = (board, player, depth) => {
    if (isTerminal(board))
        return heuristic(board, player, depth)
    let score = -Infinity;
    nextAvailableBoards(board, player).forEach(function (child, i, arr) {
        let s = -MiniMax(child.board, nextPlayer(player), depth + 1);
        if (s > score) {
            score = s;
        }
    });
    return score;
}

/*
    * private: function that evaluate all position for the state
    * @param state [State]: the state of game
    * @param player [String]: player symbol 'X' or 'O'
    * @returns [Array of Scores]: the array of positions and scores
*/

const evaluateNextPositions = (state, player) => {
    if (!isPlayerTurn(state, player) || isTerminal(state.board)) {
        return;
    }
    if (state.stepNumber === 0)
        return state.board.map((value, index) => ({
            position: index,
            score: 50
        }));
    const result = nextAvailableBoards(state.board, player).map((availableBoard) => {
        return {
            score: -MiniMax(availableBoard.board, nextPlayer(player), 0),
            position: availableBoard.position
        }
    });
    return result;
}

const ai = {
    /*
        * public: function that computes AI action if necessary
        * @param state [State]: the state of game
        * @returns [Action]: the action which should be dispatched or undefined
    */
    getAction: (state) => {
        if (!isAiTurn(state) || isTerminal(state.board)) {
            return;
        }
        const aiSymbol = nextPlayer(state.playerSymbol);
        const positionsScores = evaluateNextPositions(state, aiSymbol)
        positionsScores.sort((item1, item2) => {
            return item1.score < item2.score;
        });
        const maxScore = positionsScores[0].score;
        const bestPositions = positionsScores.filter((item) => {
            return item.score === maxScore;
        });
        const resultPosition = bestPositions[Math.floor(Math.random() * bestPositions.length)].position;
        return {
            type: "SELECT_CELL",
            position: resultPosition,
            symbol: aiSymbol,
        }
    }
}
export default ai;