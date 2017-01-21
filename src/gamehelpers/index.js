const winLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];
const nextPlayer = (currentPlayer) =>
    (currentPlayer === "X" ? "O" : "X");

const isPlayerTurn = (state, player) => {
    return ((player === "X" && state.stepNumber % 2 === 0) || (player === "O" && state.stepNumber % 2 === 1));
}

const isAiTurn = (state) => {
    if (state.playerSymbol === null)
        return false;
    const aiSymbol = nextPlayer(state.playerSymbol);
    return isPlayerTurn(state, aiSymbol);
}

const availableTurns = (board) => {
    const availableTurns = board.reduce(function (previousValue, currentValue, index, array) {
        if (currentValue === null)
            previousValue.push(index);
        return previousValue;
    }, []);
    return availableTurns;
}
const isTerminal = (board) => {
    if (availableTurns(board).length === 0)
        return true;
    for (let i = 0; i < winLines.length; i++) {
        const [a, b, c] = winLines[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return true;
        }
    }
    return false;
};
const heuristic = (board, player, depth) => {
    for (let i = 0; i < winLines.length; i++) {
        const [a, b, c] = winLines[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            if (board[a] === player) {
                return 100 - depth;
            }
            else
                return -100 + depth;
        }
    }
    return 0;
}

const nextAvailableBoards = (board, player) => {
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

const evaluateGameState = (board) => {
    if (isTerminal(board)) {
        for (let i = 0; i < winLines.length; i++) {
            const [a, b, c] = winLines[i];
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return {
                    isGameActive: false,
                    information: board[a] + " is Winner",
                    class: 'active'
                }
            }
        }
        return {
            isGameActive: false,
            information: "Draw",
            class: 'draw'
        }
    }
    return {
        isGameActive: true,
    }
};
const getHighlightedCells = (board) => {
    const highlightedCells = Array(9).fill(false);
    for (let i = 0; i < winLines.length; i++) {
        const [a, b, c] = winLines[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            highlightedCells[a] = highlightedCells[b] = highlightedCells[c] = true;
        }
    }
    return highlightedCells;
};

export { nextPlayer, isAiTurn, availableTurns, isTerminal, heuristic, nextAvailableBoards, isPlayerTurn, evaluateGameState, getHighlightedCells }