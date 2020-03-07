import React, { useState } from 'react'
import PropTypes from 'prop-types'
import '../assets/css/Board.css'
import GameResult from './GameResult'
import useWindowSize from './../hooks/useWindowSize'
import ConfettiGenerator from 'confetti-js'

/**
 * Return an array representing the inital state of the board
 * @param {number} size
 */
function initBoard(size) {
  const board = []
  for (let x = 0; x < size; x++) {
    const row = []
    for (let y = 0; y < size; y++) {
      row.push(null)
    }
    board.push(row)
  }
  return board
}

/**
 * Return an array representing the inital state of the board transposed to easily determine win and equality
 * @param {number} size
 */
function initTransposedBoard(size) {
  const transposedBoard = []
  const transposedBoardSize = size * 2 + 2
  for (let x = 0; x < transposedBoardSize; x++) {
    const row = []
    for (let y = 0; y < size; y++) {
      row.push(null)
    }
    transposedBoard.push(row)
  }
  return transposedBoard
}

/**
 * Render the game board
 * @param {Object} props
 * @param {number} props.size
 */
function Board({ size }) {
  const minRoundBeforeWin = size * 2 - 1
  const backSlashIndex = size * 2
  const slashIndex = size * 2 + 1
  const playerOne = 'playerOne'
  const playerTwo = 'playerTwo'

  const [round, setRound] = useState(1)
  const [playerRound, setPlayerRound] = useState(playerOne)
  const [winner, setWinner] = useState(null)
  const [board, setBoard] = useState(initBoard(size))
  const [transposedBoard, setTransposedBoard] = useState(initTransposedBoard(size))
  const [width, height] = useWindowSize()

  /**
   * Handle click on a board box, play a valid move
   * @param {Event} event
   */
  const handleBoxClick = ({ target }) => {
    if (target.classList.contains('board-box')) {
      const x = parseInt(target.dataset.x)
      const y = parseInt(target.dataset.y)

      const validMove = board[x][y] === null
      const gameInProgress = !winner
      if (validMove && gameInProgress) {
        playRound(x, y)
      }
    }
  }

  /**
   * Play a round and check if it end the game
   * @param {string} x
   * @param {string} y
   */
  const playRound = (x, y) => {
    board[x][y] = playerRound
    setBoard(board)

    fillTransposedBoard(x, y)

    const canGameEnd = round >= minRoundBeforeWin
    const isWin = canGameEnd && checkWinner(x, y)
    const isEquality = canGameEnd && checkEquality()

    if (isWin || isEquality) {
      endGame(isWin)
    } else {
      nextRound()
    }
  }

  /**
   * Fills the transposed board with player move
   * @param {string} x
   * @param {string} y
   */
  const fillTransposedBoard = (x, y) => {
    transposedBoard[x][y] = playerRound
    transposedBoard[y + size][x] = playerRound
    if (y === x) {
      transposedBoard[backSlashIndex][x] = playerRound
    }
    if (x + y === size - 1) {
      transposedBoard[slashIndex][x] = playerRound
    }
    setTransposedBoard(transposedBoard)
  }

  /**
   * Check if the player move make a win
   * @param {string} x
   * @param {string} y
   * @returns {boolean}
   */
  const checkWinner = (x, y) => {
    const columnWin = board.every(row => row[y] === playerRound)
    const rowWin = board[x].every(box => box === playerRound)
    const backSlashWin = x === y && transposedBoard[backSlashIndex].every(box => box === playerRound)
    const slashWin = x + y === size - 1 && transposedBoard[slashIndex].every(box => box === playerRound)

    return columnWin || rowWin || backSlashWin || slashWin
  }

  /**
   * Check if the game is blocked
   * @returns {boolean}
   */
  const checkEquality = () => {
    return transposedBoard.every(row => row.some(box => box === playerOne) && row.some(box => box === playerTwo))
  }

  /**
   * Manage the end game and displays the information about the winner
   * @param {boolean} isWin
   */
  const endGame = isWin => {
    if (isWin) {
      setWinner(playerRound)

      const confettiSettings = { target: 'confetti' }
      const confetti = new ConfettiGenerator(confettiSettings)
      confetti.render()
    } else {
      setWinner('equality')
    }
  }

  /**
   * Changes the active player and adds a round
   */
  const nextRound = () => {
    setPlayerRound(playerRound === playerOne ? playerTwo : playerOne)
    setRound(round + 1)
  }

  /**
   * Calculate the size of the boxes to fill the right space
   */
  const getBoxSize = () => {
    if (innerWidth < 768) {
      return `${height > width ? width / 1.5 / size : height / 1.5 / size}px`
    }
    return `${height > width ? width / 2 / size : height / 2 / size}px`
  }

  if (size) {
    // The board will always fit in the screen and take the half of the
    const boardStyle = {
      '--box-size': getBoxSize()
    }

    return (
      <div className="board-container">
        <canvas id="confetti" />
        <div className={`board ${winner ? 'game-over' : ''}`} style={boardStyle} onClick={handleBoxClick}>
          {board.map((row, x) => (
            <div key={x} className="board-row">
              {row.map((box, y) =>
                !box ? (
                  <div key={y} className="board-box" data-x={x} data-y={y}></div>
                ) : (
                  <div key={y} className={`board-box box-${box}`} data-x={x} data-y={y}></div>
                )
              )}
            </div>
          ))}
        </div>
        <GameResult winner={winner} />
      </div>
    )
  }
}

Board.propTypes = {
  size: PropTypes.number
}

export default Board
