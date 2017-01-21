import React from 'react'
import { connect } from 'react-redux'

const App = ({ board, stepNumber, playerSymbol, gameState, selectCell, selectSymbol, restartGame}) => {
    const listItems = board.map((symbol, index) =>
        <button disabled={!gameState.isGameActive} className="cell" key={index} onClick={(e) => {
            if (symbol === null)
                selectCell(index, stepNumber)
        } }>
            {symbol}
        </button>
    );
    return (
        <div>
            <h2>Tic Tac Toe</h2>
            <span>step: {stepNumber}</span>
            {
                (!gameState.isGameActive) ?
                    (<div>
                        <div>{gameState.information}</div>
                        <button onClick={(e) => restartGame()}> Restart </button>

                    </div>) : null
            }
            {playerSymbol === null ?
                (<section>
                    <button onClick={(e) => selectSymbol('X')}> select X </button>
                    <button onClick={(e) => selectSymbol('O')}> select O </button>
                </section>)
                :
                <div>
                    <div>Your symbol is {playerSymbol}</div>
                    <div className="board">
                        {listItems}
                    </div>
                </div>}
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
