/**
* @flow
*/
import { PLACE_BOARD_MOVE, START_GAME, RESET_GAME } from '../actionCreators/game'
import { getActivePlayerNumber, remapBoard, hasWinner } from '../services/gameplay'

export type Board = Array<[string, string, string]>

export type State = {
  playPhase: string,
  board: Board,
  turn: number,
  message: string,
}

const playPhases = {
  NOT_STARTED: 'NOT_STARTED',
  PLAYING: 'PLAYING',
  FINISHED: 'FINISHED'
}

const symbols = {
  0: 'X',
  1: 'O'
}

const initialState: State = {
  playPhase: playPhases.NOT_STARTED,
  board: [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ],
  turn: 0,
  message: ''
}

const ticTacToe = (state: State = initialState, action: Object): Object => {
  const { turn, board, playPhase } = state
  switch (action.type) {

    case START_GAME :
      return {
        ...state,
        playPhase: playPhases.PLAYING
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
        const winner = hasWinner(newBoard)
        // console.log('has winner', winner)

        if (winner !== false) {
          const message = `Player ${player} has won.`
          return {
            ...state,
            board: newBoard,
            message
          }
        }

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
