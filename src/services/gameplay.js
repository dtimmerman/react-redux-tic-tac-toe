/**
* @flow
*/
import type { Board } from '../reducers/ticTacToe'

const getActivePlayerNumber = (turn: number): number => turn % 2

const remapBoard = (x, y, player, board: Board): Board => {
  return board.map(
    (item, index: number) => index === y ? remapRow(x, player, item) : item
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
  const p0 = movesSorted.filter(move => move.player === 0)
  const p1 = movesSorted.filter(move => move.player === 1)

  if (hasStraightWin(p0, 'x') || hasStraightWin(p0, 'y') || hasDiagonalWinA(p0) || hasDiagonalWinB(p0)) {
    return 0
  }
  if (hasStraightWin(p1, 'x') || hasStraightWin(p1, 'y') || hasDiagonalWinA(p1) || hasDiagonalWinB(p1)) {
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

const hasStraightWin = (moveTuples: Array<*>, coord: 'x'): boolean => {
  const counts = moveTuples.reduce(
    (acc, cur, ind) => {
      const coordVal = cur[coord]
      return acc.map((count, index) => coordVal === index ? (count + 1) : count)
    }, [ 0, 0, 0 ]
  )
  return counts.some(count => count === 3)
}

export {
  getActivePlayerNumber,
  remapBoard,
  hasWinner
}
