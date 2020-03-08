import React, { useState, useContext } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBorderAll, faUndoAlt, faRetweet } from '@fortawesome/free-solid-svg-icons'
import Modal from './Modal'
import { BoardContext } from '../context/BoardContext'
import '../assets/css/NavBar.scss'

function NavBar() {
  const [showNewGameModal, setShowNewGameModal] = useState(false)
  const [showReplayModal, setShowReplayModal] = useState(false)
  const [newGameBoardSize, setNewGameBoardSize] = useState(3)
  const { dispatch } = useContext(BoardContext)

  /**
   * Toggle the new game modal display value
   */
  const toggleNewGameModal = () => {
    setShowNewGameModal(!showNewGameModal)
  }

  /**
   * Init a new game board with the specified size
   */
  const initNewGame = () => {
    dispatch({ type: 'new-game', size: newGameBoardSize })
    toggleNewGameModal()
  }

  /**
   * Toggle the replay modal display value
   */
  const toggleReplayModal = () => {
    setShowReplayModal(!showReplayModal)
  }

  /**
   * Init a new game board with actual size
   */
  const initReplay = () => {
    dispatch({ type: 'replay' })
    toggleReplayModal()
  }

  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        <li className="nav-logo">
          <a className="nav-link">
            <span className="link-text">Tic Tac Toe</span>
            <FontAwesomeIcon icon={faRetweet} className="link-icon" />
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" onClick={toggleNewGameModal}>
            <FontAwesomeIcon icon={faBorderAll} className="link-icon" />
            <span className="link-text">New game</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" onClick={toggleReplayModal}>
            <FontAwesomeIcon icon={faUndoAlt} className="link-icon" />
            <span className="link-text">Replay</span>
          </a>
        </li>
      </ul>
      {showNewGameModal ? (
        <Modal>
          <label htmlFor="select-new-game-size">
            <h3>How big will the new game board be ?</h3>
            <select
              id="select-new-game-size"
              value={newGameBoardSize}
              onChange={event => setNewGameBoardSize(parseInt(event.target.value))}
            >
              {[3, 4, 5, 6].map((size, index) => (
                <option value={size} key={index}>
                  {size}
                </option>
              ))}
            </select>
          </label>
          <div className="modal-button-container">
            <button className="modal-button button-accept" onClick={initNewGame}>
              New game
            </button>
            <button className="modal-button button-decline" onClick={toggleNewGameModal}>
              Close
            </button>
          </div>
        </Modal>
      ) : null}
      {showReplayModal ? (
        <Modal>
          <h3>Do you want to replay the last game ?</h3>
          <br />
          <div className="modal-button-container">
            <button className="modal-button button-accept" onClick={initReplay}>
              Replay
            </button>
            <button className="modal-button button-decline" onClick={toggleReplayModal}>
              Close
            </button>
          </div>
        </Modal>
      ) : null}
    </nav>
  )
}

export default NavBar
