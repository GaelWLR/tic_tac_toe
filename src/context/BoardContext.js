/* eslint-disable react/prop-types */
import React, { createContext, useReducer } from 'react'

const initialState = {
  size: 3,
  key: Date.now()
}

const BoardContext = createContext(initialState)

function BoardContextProvider({ children }) {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      case 'reset':
        return initialState
      case 'new-game':
        return { size: action.size, key: Date.now() }
      case 'replay':
        return { ...state, key: Date.now() }
    }
  }, initialState)

  return <BoardContext.Provider value={{ state, dispatch }}>{children}</BoardContext.Provider>
}

export { BoardContext, BoardContextProvider }
