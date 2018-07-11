import types from '../actionTypes';
import axios from 'axios';
import { fetcher } from '../utils';

export const getTodos = () => {
  return dispatch => {
    return new Promise( (resolve, reject) => {
      fetcher('GET', 'todos/get', undefined, 'auth')
      .then( res => {
        const todos = res.data.todos;
        dispatch({type: types.SET_TODOS, todos});
        resolve(todos);
      })
      .catch( error => {
        reject(error);
      })
    })
  } 
}

export const add = (id, text) => {
  return (dispatch, getState) => {
    if(text) {
      if(localStorage.getItem('token')) {
        fetcher('POST', 'todo/add', { id, text }, 'auth')
          .then( res => {
            dispatch({ type: types.SET_TODOS, todos: res.data.todos })
          })
          .catch( error => console.log(error))  
      }
      else {
        const todos = getState().todos.concat({ id, text, completed: false, edit: false });    
        dispatch({ type: types.SET_TODOS, todos });
      }
    }
  }
}

export const remove = (id) => {
  return (dispatch, getState) => {
    if(localStorage.getItem('token')) {
      fetcher('POST', 'todo/remove', { id }, 'auth')
        .then( res => {
          dispatch({ type: types.SET_TODOS, todos: res.data.todos })        
        })
        .catch( error => console.log(error))
    }
    else {
      const todos = getState().todos.filter( todo => todo.id !== id);
      dispatch({ type: types.SET_TODOS, todos });
    }
  }
}

export const complete = (id) => {
  return (dispatch, getState) => {
    if(localStorage.getItem('token')) {
      fetcher('POST', 'todo/complete', { id }, 'auth')
        .then( res => {
          dispatch({ type: types.SET_TODOS, todos: res.data.todos })    
        })
        .catch( error => console.log(error) )
    }
    else {
      const todos = JSON.parse(JSON.stringify(getState().todos))
      todos.map( todo => {
        if(todo.id === id) todo.complete = true;
        return todo;
      })
      dispatch({ type: types.SET_TODOS, todos });
    }
  }
}

export const update = (id, text) => {
  return (dispatch, getState) => {
    if(localStorage.getItem('token')) {
      fetcher('POST', 'todo/update', { id, text }, 'auth')
        .then( res => {
          dispatch({ type: types.EDIT, todos: res.data.todos })
        })
        .catch( error => console.log(error))
    }
    else {
      let todos = JSON.parse(JSON.stringify(getState().todos));
      todos.map( todo => {
        if(todo.id === id) {
          if(todo.edit === true) {
            todo.text = text;
          }
          todo.edit = !todo.edit
        }
        return todo;
      })
      dispatch({ type: types.SET_TODOS, todos });
    }
  }
}

export const edit = (id) => {
  return (dispatch, getState) => {
    const todos = getState().todos.map( todo => {
      if( todo.id === id ) {
        todo.edit = !todo.edit
      }
      return todo;
    })
    dispatch({ type: types.EDIT, todos })    
    
  }
}