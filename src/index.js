import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import logger from 'redux-logger'

import './styles/index.css'
import App from './components/App'
import registerServiceWorker from './registerServiceWorker'
import ticTacToe from './reducers/ticTacToe'

let store = createStore(ticTacToe, applyMiddleware(logger))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
