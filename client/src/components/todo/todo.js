import React from 'react';
import styles from './todo.css';

const todo = props => {
  return (  
    <div className={styles.wrapper}>
      <div className={styles.todo}>
        { props.todo.edit ? 
          <input 
            className={styles.editInput} 
            type="text"
            value={props.editValue}
            onChange={props.editChange}
          /> :
          <span className={styles.text}>{props.todo.text}</span>
        }
        <button
          className={styles.editBtn}
          onClick={() => props.edit(props.todo.id)}  
        >
          <i className="fas fa-edit"></i>  
        </button>
        {!props.todo.complete ? <button 
          className={styles.complete}
          onClick={() => props.complete(props.todo.id)}
        ><i className="fas fa-check"></i></button> : null}
        
        <button
          className={styles.remove}
          onClick={() => props.remove(props.todo.id)}  
        >
          <i className="fas fa-times"></i>
        </button>
        
      </div>
      <span className={styles.completed}>{
          props.todo.complete ? <i className="fas fa-check"></i> : null
      }</span>
    </div>
  )
}

export default todo;