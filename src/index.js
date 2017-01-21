import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import ai from './ai'
import App from './components/App'
import './index.css';

const store = createStore(
  reducer
)

store.dispatch({ type: "RESTART_GAME" });

function handleChange() {
  const action = ai.getAction(store.getState());
  if (action)
    store.dispatch(action);
}

store.subscribe(handleChange)
render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)