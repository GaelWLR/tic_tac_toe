import React from 'react'
import PropTypes from 'prop-types'

/**
 * Render a unique box of the board
 * @param {Object} props
 * @param {string|null} props.box
 * @param {number} props.x
 * @param {number} props.y
 */
function BoardBox({ box, x, y }) {
  if (!box) {
    return <div className="board-box" data-x={x} data-y={y} />
  }
  return <div className={`board-box box-${box}`} data-x={x} data-y={y} />
}

BoardBox.propTypes = {
  box: PropTypes.string,
  x: PropTypes.number,
  y: PropTypes.number
}

export default BoardBox
