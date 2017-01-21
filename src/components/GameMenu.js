import React from 'react'
import { connect } from 'react-redux'

const GameMenu = ({ playerSymbol, selectSymbol, restartGame}) => {
    return (
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
        </div>)
}

const mapStateToProps = (state, ownProps) => ({
    playerSymbol: state.playerSymbol,
});
const mapDispatchToProps = (dispatch) => {
    return {
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
)(GameMenu)
