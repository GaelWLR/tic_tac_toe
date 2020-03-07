import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBorderAll, faUndoAlt, faRetweet } from '@fortawesome/free-solid-svg-icons'
import '../assets/css/NavBar.scss'

function NavBar() {
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
          <a className="nav-link">
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
    </nav>
  )
}

export default NavBar
