import React from 'react'
import './assets/css/App.css'
import NavBar from './components/NavBar'
import Board from './components/Board'

class App extends React.Component {
  render() {
    return (
      <div>
        <NavBar />
        <div className="container">
          <Board size={5} />
        </div>
      </div>
    )
  }
}

export default App
