const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const availableTurns = (board) => {
    const availableTurns = board.reduce(function (previousValue, currentValue, index, array) {
        if (currentValue === null)
            previousValue.push(index);
        return previousValue;
    }, []);
    return availableTurns;
}
const children = (board, player) => {
    const turns = availableTurns(board);
    return turns.map((item) => {
        return {
            board: [
                ...board.slice(0, item),
                player,
                ...board.slice(item + 1),
            ],
            position: item
        };
    });
};
export const isAiTurn = function (state) {
    if (state.playerSymbol != null) {
        return ((state.playerSymbol === "X" && state.stepNumber % 2) || (state.playerSymbol === "O" && state.stepNumber % 2 === 0))
    }
    return false;
}
export const nextPlayer = (currentPlayer) =>
    (currentPlayer === "X" ? "O" : "X");

export const isTerminal = (board) => {
    if (availableTurns(board).length === 0)
        return true;

    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return true;
        }
    }
    return false;
};
export const heuristic = (board, player) => {
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            if (board[a] === player)
                return 10;
            else
                return -10;
        }
    }
    return 5;
}
const MiniMax = (board, player) => {
    if (isTerminal(board))
        return -heuristic(board, player)
    let score = Infinity;
    children(board, player).forEach(function (child, i, arr) {
        let s = -MiniMax(child.board, nextPlayer(player));
        if (s < score) {
            score = s;
        }
    });
    return score;
}
const ai = {
    getAction: (state) => {
        if (!isAiTurn(state) || isTerminal(state.board)) {
            return;
        }
        const aiSymbol = nextPlayer(state.playerSymbol);
        if (state.stepNumber === 0)
            return {
                type: "SELECT_CELL",
                position: Math.floor(Math.random() * 9),
                symbol: aiSymbol,
            }
        let bestScore = Infinity;
        let position = -1;
        children(state.board, aiSymbol).forEach((child) => {
            const score = -MiniMax(child.board, state.playerSymbol);
            if (bestScore > score) {
                bestScore = score;
                position = child.position
            }
        });
        if (position === -1)
            return;
        return {
            type: "SELECT_CELL",
            position: position,
            symbol: aiSymbol,
        }
    }
}
export default ai;