import React from 'react'
import './assets/css/App.css'
import Board from './components/Board'

class App extends React.Component {
  render() {
    return (
      <div>
        <Board size={5} />
      </div>
    )
  }
}

export default App
