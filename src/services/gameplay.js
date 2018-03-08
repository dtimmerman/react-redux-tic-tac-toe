/**
* @flow
*/
const getActivePlayerNumber = (turn: number): number => turn % 2

const remapBoard = (x, y, player, board) => {
  return board.map(
    (item, index) => index === y ? remapRow(x, player, item) : item
  )
}

const remapRow = (x, player, row) => {
  return row.map((col, index) => index === x ? player : col)
}

const reduceBoardToPlayerMoves = (collection, y) => {
  return collection.reduce(
    (acc, cur, ind) => {

      // handle recursion case:
      if (Array.isArray(cur)) {
        return [
          ...acc,
          ...reduceBoardToPlayerMoves(cur, ind)
        ]
      }

      // handle base case:
      // accumulate values for reduction which are equal to a move, in a special 3-tuple format
      if (cur !== '') {
        return [
          ...acc,
          { x: ind, y, player: cur }
        ]
      }

      // don't accumulate values for reduction which are not equal to moves
      return acc
    }, []
  )
}

const hasWinner = (board) => {
  const moves = reduceBoardToPlayerMoves(board)
  const movesSorted = moves.sort((a, b) => a.y === b.y ? a.y - b.y : a.x - b.x)
  // console.log('moves sorted', movesSorted)
  const p0 = movesSorted.filter(move => move.player === 0)
  const p1 = movesSorted.filter(move => move.player === 1)

  // console.log(p0)
  // console.log(p1)

  for (let i = 0; i < 2; i++) {
    if (hasStraightWin(p0, 'x', i) || hasStraightWin(p0, 'y', i)) {
      return 0
    }
    if (hasStraightWin(p1, 'x', i) || hasStraightWin(p1, 'y', i)) {
      return 1
    }
  }
  if (hasDiagonalWinA(p0) || hasDiagonalWinB(p0)) {
    return 0
  }
  if (hasDiagonalWinA(p1) || hasDiagonalWinB(p1)) {
    return 1
  }
  return false
}

const hasDiagonalWinA = (moveTuples: Array<*>): boolean => {
  const matches = moveTuples.filter(
    ({x, y}: Object): boolean => (
      (x === 0 && y === 0) || (x === 1 && y === 1) || (x === 2 && y === 2)
    )
  )
  return matches.length === 3
}

const hasDiagonalWinB = (moveTuples: Array<*>): boolean => {
  const matches = moveTuples.filter(
    ({x, y}: Object): boolean => (x === 0 && y === 2) || (x === 1 && y === 1) || (x === 2 && y === 0)
  )
  return matches.length === 3
}

const hasStraightWin = (moveTuples: Array<*>, staticCoord = 'x', staticValue = 0): boolean => {
  return false
  const matches = moveTuples.filter(
    ({x, y}: Object): boolean => {
      const expectX = staticCoord === 'x' ? staticValue : [0, 1, 2].includes(x)
      const expectY = staticCoord !== 'x' ? [0, 1, 2].includes(y) : staticValue
      console.log('expect x', expectX, 'expect y', expectY)
      return expectX && expectY
    }
  )
  return matches.length === 3
}

export {
  getActivePlayerNumber,
  remapBoard,
  hasWinner
}
