import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBorderAll, faUndoAlt, faRetweet } from '@fortawesome/free-solid-svg-icons'
import Modal from './Modal'
import '../assets/css/NavBar.scss'

function NavBar() {
  const [showNewGameModal, setShowNewGameModal] = useState(false)

  /**
   * Toggle the modal display value
   */
  const toggleNewGameModal = () => {
    setShowNewGameModal(!showNewGameModal)
  }

  /**
   * Init a new game board with the specified size
   * @todo: Finalize, see useContext?
   */
  const initNewGame = () => {
    toggleNewGameModal()
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
          <a className="nav-link">
            <FontAwesomeIcon icon={faUndoAlt} className="link-icon" />
            <span className="link-text">Replay</span>
          </a>
        </li>
      </ul>
      {showNewGameModal ? (
        <Modal>
          <label htmlFor="select-new-game-size">
            <h3>How big will the new game board be?</h3>
            <select id="select-new-game-size">
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
    </nav>
  )
}

export default NavBar
