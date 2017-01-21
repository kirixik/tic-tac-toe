const winLines = [ // cells that make up a winning line
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];
/*
    * public: function that return next player
    * @param currentPlayer [String]: current Player's symbol
    * @returns [String]: the next Player's symbol
*/
const nextPlayer = (currentPlayer) =>
    (currentPlayer === "X" ? "O" : "X");

/*
    * public: checks if the state match player symbol
    * @param state [State]: current state of game
    * @param player [String]: Player's symbol
    * @returns [Boolean]: true if state match player symbol else false
*/
const isPlayerTurn = (state, player) => { 
    return ((player === "X" && state.stepNumber % 2 === 0) || (player === "O" && state.stepNumber % 2 === 1));
}
/*
    * public: checks if the state match AI turn
    * @param state [State]: current state of game
    * @returns [Boolean]: true if state match ai turn else false
*/
const isAiTurn = (state) => {
    if (state.playerSymbol === null)
        return false;
    const aiSymbol = nextPlayer(state.playerSymbol);
    return isPlayerTurn(state, aiSymbol);
}
/*
    * public: checks if there is state where player has last turn
    * @param stepNumber [Number]: current step number
    * @param playerSymbol [String]: Player's symbol
    * @returns [Boolean]: true if state where player has last turn else false
*/
const isLastPlayerTurn = (stepNumber, playerSymbol)=>{
    return (stepNumber === 8 && playerSymbol === 'X');
}
/*
    * public: return all available position for next turn 
    * @param board [Array]:  board
    * @returns [Array of Numbers]: Array of next available positions
*/
const availableTurns = (board) => {
    const availableTurns = board.reduce(function (previousValue, currentValue, index, array) {
        if (currentValue === null)
            previousValue.push(index);
        return previousValue;
    }, []);
    return availableTurns;
}
/*
    * public: checks if game's state is terminal
    * @param board [Array]:  board
    * @returns [Boolean]: return true if state is terminal (win or draw) else false
*/
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
/*
    * public: return heuristic evaluation if board
    * @param board [Array]:  board
    * @param player [String]:  Player's symbol
    * @param depth [Number]:  Recursion depth
    * @returns [Number]: return positive number is state is win, negative if losing, 0 if draw
*/
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
/*
    * public: return next available boards from current board and position
    * @param board [Array]:  board
    * @param player [String]:  Player's symbol
    * @returns [AvailableBoard]: available boards from current board and position
*/
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
/*
    * public: evaluate current game state (win, draw, game running)
    * @param board [Array]:  board
    * @returns [AvailableBoard]: available boards from current board and position
*/
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
/*
    * public: compute if there are cells which should be highlighted
    * @param board [Array]:  board
    * @returns [AvailableBoard]: available boards from current board and position
*/
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

export { nextPlayer, isAiTurn, availableTurns, isTerminal, heuristic, nextAvailableBoards, isPlayerTurn, evaluateGameState, getHighlightedCells, isLastPlayerTurn }