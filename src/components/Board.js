import React from 'react'
import { connect } from 'react-redux'
import { getHighlightedCells } from '../gamehelpers'

const Board = ({ board, stepNumber, gameState, selectCell}) => {
    const highlightedCells = getHighlightedCells(board);
    const getButtonClass = (index) => {
        return 'cell ' + (highlightedCells[index] ? 'active' : '');
    }
    const cells = board.map((symbol, index) =>
        <button disabled={!gameState.isGameActive || symbol != null} className={getButtonClass(index)} key={index} onClick={(e) => {
            if (symbol === null)
                selectCell(index, stepNumber)
        } }>
            {symbol}
        </button>
    );
    return (
        <div className="board">
            {cells}
        </div>
    )
}

const mapStateToProps = (state, ownProps) => ({
    board: state.board,
    stepNumber: state.stepNumber,
    gameState: ownProps.gameState
});
const mapDispatchToProps = (dispatch) => {
    return {
        selectCell: (cellnumber, stepNumber, ) => {
            dispatch({
                type: "SELECT_CELL",
                position: cellnumber,
                symbol: (stepNumber % 2) ? "O" : "X"
            });
        }
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Board)
