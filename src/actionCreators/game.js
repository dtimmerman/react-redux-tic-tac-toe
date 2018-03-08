export const PLACE_BOARD_MOVE = 'PLACE_BOARD_MOVE'
export const START_GAME = 'START_GAME'
export const RESET_GAME = 'RESET_GAME'

export const placeBoardMove = ({ x, y }) => ({
  type: PLACE_BOARD_MOVE,
  x,
  y
})

export const startGame = () => ({
  type: START_GAME
})

export const resetGame = () => ({
  type: RESET_GAME
})
