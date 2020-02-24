import React from 'react'
import PropTypes from 'prop-types'
import BoardBox from './BoardBox'

/**
 * Render a row of boxes
 * @param {Object} props
 * @param {Array} props.row
 * @param {number} props.x
 */
function BoardRow({ row, x }) {
  const boxes = row.map((box, y) => <BoardBox key={y} box={box} x={x} y={y} />)
  return <div className="board-row">{boxes}</div>
}

BoardRow.propTypes = {
  row: PropTypes.array,
  x: PropTypes.number
}

export default BoardRow
