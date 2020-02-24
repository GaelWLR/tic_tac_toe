import React, { useState } from 'react'
import PropTypes from 'prop-types'
import '../assets/css/Board.css'
import ConfettiGenerator from 'confetti-js'
import useWindowSize from './../hooks/useWindowSize'
import BoardRow from './BoardRow'
import GameResult from './GameResult'

/**
 * Return an array representing the inital state of the board
 * @param {number} size
 */
function setInitialBoard(size) {
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

const playerOne = 'playerOne'
const playerTwo = 'playerTwo'

/**
 * Render the game board
 * @param {Object} props
 * @param {number} props.size
 */
function Board({ size }) {
  const minRoundBeforeWin = size * 2 - 1
  const maxRound = size * size

  const [round, setRound] = useState(1)
  const [playerRound, setPlayerRound] = useState('playerOne')
  const [winner, setWinner] = useState(null)
  const [board, setBoard] = useState(setInitialBoard(size))
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

    const canGameEnd = round >= minRoundBeforeWin
    const isWin = canGameEnd && checkWinner(x, y)
    const isEven = canGameEnd && checkEven()

    if (isWin || isEven || round === maxRound) {
      endGame(isWin)
    } else {
      nextRound()
    }
  }

  const checkWinner = (x, y) => {
    const columnWin = board.every(row => row[y] === playerRound)
    const rowWin = board[x].every(box => box === playerRound)
    const backSlashWin = x === y && checkBackSlashWin()
    const slashWin = x + y === size - 1 && checkSlashWin()

    return columnWin || rowWin || backSlashWin || slashWin
  }

  const checkEven = () => {
    const transposedBoard = transposeBoard()

    const columnsEven = checkRowEven(transposedBoard)
    const rowsEven = checkRowEven(board)
    const backSlashEven = checkDiagonalEven(board)
    const slashEven = checkDiagonalEven(transposedBoard)

    return columnsEven && rowsEven && backSlashEven && slashEven
  }

  const checkBackSlashWin = () => {
    const affectedBoxes = []
    for (let i = 0; i < size; i++) {
      affectedBoxes.push(board[i][i])
    }
    return affectedBoxes.every(box => box === playerRound)
  }

  const checkSlashWin = () => {
    const affectedBoxes = []
    for (let x = 0; x < size; x++) {
      const y = size - x - 1
      affectedBoxes.push(board[x][y])
    }
    return affectedBoxes.every(box => box === playerRound)
  }

  const transposeBoard = () => {
    const transposedBoard = []
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length; j++) {
        if (!Array.isArray(transposedBoard[j])) {
          transposedBoard[j] = []
        }
        transposedBoard[j][i] = board[i][j]
      }
    }
    return transposedBoard
  }

  const checkRowEven = rows => {
    return (
      rows.every(row => row.some(box => box === playerOne)) &&
      rows.every(row => row.some(box => box === playerTwo))
    )
  }

  const checkDiagonalEven = rows => {
    const diagonal = rows.map((_, i) => rows[i][i])
    return (
      diagonal.some(box => box === playerOne) &&
      diagonal.some(box => box === playerTwo)
    )
  }

  const endGame = isWin => {
    if (isWin) {
      setWinner(playerRound)

      const confettiSettings = { target: 'confetti' }
      const confetti = new ConfettiGenerator(confettiSettings)
      confetti.render()
    } else {
      setWinner('even')
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
        <div className="board" style={boardStyle} onClick={handleClick}>
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
