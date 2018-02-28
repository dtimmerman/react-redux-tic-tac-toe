import { PLACE_BOARD_MOVE, START_GAME, RESET_GAME } from '../actionCreators/game'

const playPhases = {
  NOT_STARTED: 'NOT_STARTED',
  PLAYING: 'PLAYING',
  FINISHED: 'FINISHED'
}

const symbols = {
  0: 'X',
  1: 'O'
}

const hasWon = (board) => {

}

const getActivePlayerNumber = (turn) => turn % 2

const initialState = {
  playPhase: playPhases.NOT_STARTED,
  board: [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ],
  turn: 0,
  message: ''
}

/*
horizontal victory
y0 x0, y0 x1, y0 x2

['x', 'x', 'x'],
['', '', ''],
['', '', '']

diagonal victory top left to bottom right
y0 x0, y1 x1, y2 x2

['x', '', ''],
['', 'x', ''],
['', '', 'x']

diagonal victory bottom left to top right
y0 x3, y1 x2, y2 x0

['', '', 'x'],
['', 'x', ''],
['x', '', '']

vertical victory
y0 x0, y1 x0, y2 x0

['x', '', ''],
['x', '', ''],
['x', '', '']

a player wins if they have consecutive x coordinates, consecutive y coordinates, mirrored x and y
coordinates, or flipped x and y coordinates
*/

const remapBoard = (x, y, player, board) => {
  return board.map(
    (item, index) => index === y ? remapRow(x, player, item) : item
  )
}

const remapRow = (x, player, row) => {
  return row.map((col, index) => index === x ? player : col)
}

// const reduceBoardToPlayerMoves = (collection, player, moves) => {
//   return
// }

const ticTacToe = (state = initialState, action) => {
  const { turn, board, playPhase } = state
  switch (action.type) {

    case START_GAME :
      return {
        ...state,
        playPhase: playPhases.PLAYING,
        // message: 'Player 1 begins the game. Player 1 is X\'s, Player 2 is O\'s.'
      }

    case PLACE_BOARD_MOVE :
      const player = getActivePlayerNumber(turn)
      const { x, y } = action

      const canPlay = playPhase !== playPhases.FINISHED
      const canMove = board[y][x] === ''

      if (!canPlay) {

        return {
          ...state,
          message: 'The game is already over.'
        }
      }

      if (canMove) {
        const newBoard = remapBoard(x, y, player, board)

        return {
          ...state,
          board: newBoard,
          turn: (turn + 1)
        }
      }

      return {
        ...state,
        message: 'You cannot move there.'
      }

    case RESET_GAME :
      return {
        ...initialState
      }

    default :
      return state
  }

}

export default ticTacToe

export { symbols, playPhases, getActivePlayerNumber }
