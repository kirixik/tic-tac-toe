import { nextPlayer, isTerminal, heuristic, isAiTurn, isPlayerTurn, nextAvailableBoards } from '../gamehelpers'
const MiniMax = (board, player) => {
    if (isTerminal(board))
        return heuristic(board, player)
    let score = -Infinity;
    nextAvailableBoards(board, player).forEach(function (child, i, arr) {
        let s = -MiniMax(child.board, nextPlayer(player));
        if (s > score) {
            score = s;
        }
    });
    return score;
}

const evaluateNextPositions = (state, player) => {
    if (!isPlayerTurn(state, player) || isTerminal(state.board)) {
        return;
    }
    if (state.stepNumber === 0)
        return state.board.map((value, index) => ({
            position: index,
            score: 5
        }));
    const result = nextAvailableBoards(state.board, player).map((availableBoard) => {
        return {
            score: -MiniMax(availableBoard.board, nextPlayer(player)),
            position: availableBoard.position
        }
    });
    return result;
}

const ai = {
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
        const bestPositions = positionsScores.filter((item)=>{
            return item.score===maxScore;
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