import React from 'react'
import PropTypes from 'prop-types'

/**
 * Display the game result
 * @param {Object} props
 * @param {string} props.winner
 */
function GameResult({ winner }) {
  switch (winner) {
    case 'even':
      return <p className="game-result-text">Égalité !</p>
    case 'playerOne':
      return <p className="game-result-text">Joueur 1 a gagné !</p>
    case 'playerTwo':
      return <p className="game-result-text">Joueur 2 a gagné !</p>
    default:
      return <></>
  }
}

GameResult.propTypes = {
  winner: PropTypes.string
}

export default GameResult
