import React, { useContext } from 'react'
import './assets/css/App.css'
import NavBar from './components/NavBar'
import Board from './components/Board'
import { BoardContext } from './context/BoardContext'

function App() {
  const { state } = useContext(BoardContext)

  return (
    <div>
      <NavBar />
      <div className="container">
        <Board size={state.size} key={state.key} />
      </div>
    </div>
  )
}

export default App
