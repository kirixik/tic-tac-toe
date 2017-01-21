import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import ai from './ai'
import App from './components/App'
import './index.css';

const store = createStore( // create store using redux
  reducer
)

store.dispatch({ type: "RESTART_GAME" }); // init dispatch 

function handleChange() { 
  const action = ai.getAction(store.getState());
  if (action)
    store.dispatch(action);
}

store.subscribe(handleChange)// our AI observes state of application and if it should do some action  - dispatch it using redux dispatch

render( // render Application usering react-dom
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)