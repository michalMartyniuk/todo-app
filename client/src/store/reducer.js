import axios from 'axios';
import { fetcher } from './utils';
import types from './actionTypes';

const initialState = {
  todos: [],
  error: null
}

const reducer = (state=initialState, action) => {
  switch(action.type) {
    case types.CHANGE:
      return state

    case types.SET_TODOS:
      return { ...state, todos: action.todos };
    
    case types.EDIT:
      return { ...state, todos: action.todos };

    case types.ERROR:
      return { ...state, error: action.error }

    case types.RESET_ERROR:
      return { ...state, error: null }

    case types.SIGN_UP:
      return { ...state, todos: action.todos, loggedIn: true }

    case types.LOG_IN:
      return { ...state, todos: action.todos, loggedIn: true }

    case types.LOG_OUT:
      return { ...state, todos: [] }

    default: 
      return state;
  }
}

export default reducer;