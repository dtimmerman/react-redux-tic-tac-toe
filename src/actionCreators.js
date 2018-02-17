const move = ({ player, x, y }) => ({
  type: 'MOVE_PLAYER',
  x,
  y
})

export {
  move
}
