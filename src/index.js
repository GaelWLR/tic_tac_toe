import React from 'react'
import { render } from 'react-dom'
import App from './App'
import { BoardContextProvider } from './context/BoardContext'

const app = (
  <BoardContextProvider>
    <App />
  </BoardContextProvider>
)

render(app, document.getElementById('app'))
