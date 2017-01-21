import React from 'react'
const GameInfo = ({gameState}) => {
    return (
        (!gameState.isGameActive) ?
            (<div className={`game-info ${gameState.class}`}>
                {gameState.information}
            </div>) : null
    )
}
export default GameInfo;