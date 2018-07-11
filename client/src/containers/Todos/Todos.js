import React, { Component } from 'react';
import styles from './Todos.css';
import { connect } from 'react-redux';
import { getTodos, add, remove, complete, edit, update } from '../../store/actions/actions-todos';
import Todo from '../../components/todo/todo';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

class Todos extends Component {

  state = {
    addValue: '',
    editValue: '',
    completedState: false,
  }

  componentDidMount() {
    if(localStorage.getItem('token')) {
      this.props.getTodos()
        .then( todos => console.log(todos))
        .catch( error => console.log(error))
    }
  }

  completedHandler = () => {
    this.setState({
      completedState: !this.state.completedState
    }, () => console.log(this.state.completedState))
  }

  randomId = (text) => {
    const num = () => Math.floor((Math.random() * 100) + 1)
    const randId = text.split(' ').map( word => {
      return word + num();
    });
    return randId.join();
  }

  addHandler = () => {
    this.props.add(this.randomId(this.state.addValue), this.state.addValue);
    this.setState({ addValue: '' });
  }

  inputKeyHandler = (e) => {
    if(e.key === 'Enter') {
      this.addHandler();    
    }
  }

  editHandler = (id) => { 
    this.props.update(id, this.state.editValue);
  }

  createTodo = (todo) => {
    return <Todo
        key={todo.id}
        todo={todo}
        complete={this.props.complete}
        remove={this.props.remove}
        edit={this.editHandler}
        editValue={this.state.editValue}
        editChange={(e) => this.setState({ editValue: e.target.value })}
      />
  }

  render() {
    return (
      <TransitionGroup
        className={styles.Todos}
        component="div"
      >
        <div className={styles.inputWrapper}>
          <div className={styles.upperDiv}>What do you need to-do?</div>
          <input 
            type="text" 
            className={styles.todoInput}
            value={this.state.addValue}
            onChange={(e) => this.setState({ addValue: e.target.value })}
            onKeyDown={this.inputKeyHandler}
          />
          <button
            className={styles.addButton}
            onClick={this.addHandler}
          >Add</button>
        </div>
        <div className={styles.completedWrapper}>
          <div
            className={[
              styles.completed,
              this.state.completedState ? styles.completedClicked : null
            ].join(' ')}
            onClick={this.completedHandler}
          >
            <span>Show completed</span>                                     
          </div>
          <div
            className={[
              styles.completedSmall,
              this.state.completedState ? styles.completedClicked : null
            ].join(' ')}
            onClick={this.completedHandler}
          >
            <i className="fas fa-check"></i>
          </div>
        </div>
        {this.props.todos.map(todo => {
          if(this.state.completedState) {
            if(todo.complete) {
              return <CSSTransition
                classNames = {{
                  enterActive: styles.enterActive,
                  exitActive: styles.exitActive
                }}
                key={todo.id}
                timeout={600}
              >
                {this.createTodo(todo)}
              </CSSTransition>
            }
          }
          else {
            if(!todo.complete) {
              return <CSSTransition
                classNames = {{
                  enterActive: styles.enterActive,
                  exitActive: styles.exitActive,
                }}
                key={todo.id}
                timeout={600}
              >
                {this.createTodo(todo)}
              </CSSTransition>
            }
          }
        })}
      </TransitionGroup>
    )
  }
}

const mapStateToProps = state => state

const mapDispatchToProps = dispatch => {
  return {
    getTodos: () => dispatch( getTodos() ),
    add: (id, text) => dispatch( add(id, text) ),
    remove: (id) => dispatch( remove(id) ),
    complete: (id) => dispatch( complete(id) ),
    edit: (id) => dispatch( edit(id) ),
    update: (id, text) => dispatch( update(id, text))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Todos);