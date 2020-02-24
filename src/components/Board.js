import React, { useState } from 'react'
import PropTypes from 'prop-types'
import '../assets/css/Board.css'
import BoardRow from './BoardRow'
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
 * Return an array representing the inital state of the board
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

  const handleClick = ({ target }) => {
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

  const checkWinner = (x, y) => {
    const columnWin = board.every(row => row[y] === playerRound)
    const rowWin = board[x].every(box => box === playerRound)
    const backSlashWin = x === y && transposedBoard[backSlashIndex].every(box => box === playerRound)
    const slashWin = x + y === size - 1 && transposedBoard[slashIndex].every(box => box === playerRound)

    return columnWin || rowWin || backSlashWin || slashWin
  }

  const checkEquality = () => {
    return transposedBoard.every(row => row.some(box => box === playerOne) && row.some(box => box === playerTwo))
  }

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

  const nextRound = () => {
    setPlayerRound(playerRound === playerOne ? playerTwo : playerOne)
    setRound(round + 1)
  }

  const getBoxSize = () => {
    return `${height > width ? width / 2 / size : height / 2 / size}px`
  }

  if (size) {
    const rows = board.map((row, x) => <BoardRow key={x} row={row} x={x} />)
    // The board will always fit in the screen and take the half of the
    const boardStyle = {
      '--box-size': getBoxSize()
    }

    return (
      <div>
        <canvas id="confetti" />
        <div className={`board ${winner ? 'game-over' : ''}`} style={boardStyle} onClick={handleClick}>
          {rows}
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
