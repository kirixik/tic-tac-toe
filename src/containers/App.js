import React from 'react'
import { connect } from 'react-redux'
import { getHighlightedCells, evaluateGameState } from '../gamehelpers'

const App = ({ board, stepNumber, playerSymbol, selectCell, selectSymbol, restartGame}) => {
    const gameState = evaluateGameState(board);
    const highlightedCells = getHighlightedCells(board);
    const getButtonClass = (index) => {
        return 'cell ' + (highlightedCells[index] ? 'active' : '');
    }
    const listItems = board.map((symbol, index) =>
        <button disabled={!gameState.isGameActive || symbol != null || playerSymbol === null} className={getButtonClass(index)} key={index} onClick={(e) => {
            if (symbol === null)
                selectCell(index, stepNumber)
        } }>
            {symbol}
        </button>
    );
    return (
        <div>
            <h2>Tic Tac Toe</h2>
            <div className="board">
                {listItems}
            </div>
            <div className="game-menu">
                {
                    (playerSymbol != null) ?
                        (<button className="btn restart-btn" onClick={(e) => restartGame()}> Restart </button>) : null
                }

                {playerSymbol === null ?
                    (<div className="btn-container">
                        <button className="btn select-symbol-btn" onClick={(e) => selectSymbol('X')}> select X </button>
                        <button className="btn select-symbol-btn" onClick={(e) => selectSymbol('O')}> select O </button>
                    </div>)
                    : null}
            </div>
            {
                (!gameState.isGameActive) ?
                    (<div className="game-info">
                        {gameState.information}
                    </div>) : null
            }

        </div>)
}

const mapStateToProps = (state) => (state)

function mapDispatchToProps(dispatch) {
    return {
        selectCell: (cellnumber, stepNumber, ) => {
            dispatch({
                type: "SELECT_CELL",
                position: cellnumber,
                symbol: (stepNumber % 2) ? "O" : "X"
            });
        },
        selectSymbol: (symbol) => {
            dispatch({
                type: "USER_SELECT_SYMBOL",
                selectedSymbol: symbol
            });
        },
        restartGame: () => {
            dispatch({
                type: "RESTART_GAME",
            });
        }

    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
