import axios from 'axios';
import types from '../actionTypes';
import { fetcher } from '../utils';

export const login = (user) => {
  return dispatch => {
    fetcher('POST', 'login', user)  
      .then( res => {
        localStorage.setItem('token', res.data.token)
        dispatch({ type: types.LOG_IN, todos: res.data.todos })
      })
      .catch( err => dispatch({ type: types.ERROR, error: err.response.data }));
  }
}

export const signup = (user) => {
  return dispatch => {
    fetcher('POST', 'signup', user)
      .then( res => {
        localStorage.setItem('token', res.data.token)
        dispatch({ type: types.SIGN_UP, todos: res.data.todos })
      })
      .catch( err => dispatch({ type: types.ERROR, error: err.response.data }));
  }
}

export const logout = () => {
  if(localStorage.getItem('token')) {
    localStorage.clear();
    return { type: types.LOG_OUT }
  }
}
