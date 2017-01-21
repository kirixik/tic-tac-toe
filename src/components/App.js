import React from 'react'
import { connect } from 'react-redux'
import { evaluateGameState } from '../gamehelpers'
import Board from './Board'
import GameMenu from './GameMenu'
import GameInfo from './GameInfo'

const App = ({board, playerSymbol, selectSymbol, restartGame}) => {
    const gameState = evaluateGameState(board);
    return (
        <div>
            <h2>Tic Tac Toe</h2>
            <Board gameState={gameState} />
            <GameMenu />
            <GameInfo gameState={gameState} />
        </div>)
}

export default connect(
    (state) => (state)
)(App)
