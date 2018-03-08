import React from 'react'
import { connect } from 'react-redux'
import { symbols } from '../reducers/ticTacToe'
import { placeBoardMove } from '../actionCreators/game'

const RawColumn = ({ x, y, move, placeBoardMove }) => {
  const symbol = typeof symbols[move] === 'string' && symbols[move].length ? symbols[move] : move
  const handleClick = () => {
    placeBoardMove({ x, y })
  }

  return (
    <div className="column" onClick={handleClick}>
      {symbol}
    </div>
  )
}

const Column = connect(null, { placeBoardMove })(RawColumn)

const Row = ({ rowItems, rowIndex }) => {
  return (
    <div className="row">
      {
        rowItems.map((columnValue, columnIndex) => (
          <Column key={`row-column-${columnIndex}`} x={columnIndex} y={rowIndex} move={columnValue} />
        ))
      }
    </div>
  )
}

const Board = ({ board }) => {
  return (
    <div className="board">
      {
        board.map((row, index) => (
          <Row rowItems={row} rowIndex={index} key={`row-${index}`} />
        ))
      }
    </div>
  )
}

export default Board
