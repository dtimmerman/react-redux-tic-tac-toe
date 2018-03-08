import React from 'react'
import { connect } from 'react-redux'
import '../styles/App.css'
import Board from './Board'
import Message from './Message'
import { playPhases, getActivePlayerNumber, symbols } from '../reducers/ticTacToe'
import { startGame } from '../actionCreators/game'

const mapStateToProps = (state) => ({ ...state })

const mapDispatchToProps = { startGame }

class App extends React.Component {
  render() {
    const { playPhase, board, message, turn } = this.props

    const playerNumber = getActivePlayerNumber(turn)
    const playerNumberDisplayed = playerNumber + 1
    const playerSymbol = symbols[playerNumber]
    const indefArticle = playerSymbol.toLowerCase() === 'x' ? 'an' : 'a'
    const turnDisplayed = turn + 1

    return (
      <div className="game-container">
        <h1>react-redux tic-tac-toe</h1>
        { playPhase === playPhases.NOT_STARTED && (
          <React.Fragment>
            <p>Push start to begin.</p>
            <button onClick={this.props.startGame}>Start Playing</button>
          </React.Fragment>
        )}

        { playPhase === playPhases.PLAYING && (
          <React.Fragment>
            <p>
              It is currently turn number {turnDisplayed}. Player {playerNumberDisplayed}, it is your turn. Click on the board to place {indefArticle} {playerSymbol} for your turn.
            </p>
            <Board board={board} />
            {message.length > 0 && (
              <Message content={message} />
            )}
          </React.Fragment>
        )}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
