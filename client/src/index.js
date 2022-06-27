import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "bootstrap/dist/css/bootstrap.min.css"
import Login from './Login';
import Register from './REgister';
import { combineReducers } from 'redux';
import { rootReducer } from './rootReducer';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

const finalReducer=combineReducers({
  rootReducer:rootReducer
})
const initialState={
  rootReducer:{
    foodItem:localStorage.getItem("foodItem")?JSON.parse(localStorage.getItem("foodItem")):[]
  }
}
const store=createStore(finalReducer,initialState)
ReactDOM.render(
  <React.StrictMode>
  <Provider store={store}>
  <App></App>
  </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
