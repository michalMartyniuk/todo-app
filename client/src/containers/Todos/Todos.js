import React, { Component } from 'react';
import styles from './Todos.css';
import { connect } from 'react-redux';
import { getTodos, add, remove, complete, edit, update } from '../../store/actions/actions-todos';
import Todo from '../../components/todo/todo';

class Todos extends Component {

  state = {
    addValue: '',
    editValue: '',
    completedCheckbox: false,
  }

  componentDidMount() {
    this.props.getTodos()
      .then( todos => console.log(todos))
      .catch( error => console.log(error))
  }

  completedCheckboxHandler = () => {
    this.setState({
      completedCheckbox: !this.state.completedCheckbox
    })
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

  editHandler = (id) => { 
    this.props.update(id, this.state.editValue);
  }

  render() {
    return (
      <div className={styles.Todos}>
        <div className={styles.inputWrapper}>
          <input 
            type="text" 
            className={styles.todoInput}
            value={this.state.addValue}
            onChange={(e) => this.setState({ addValue: e.target.value })}
          />
          <button
            className={styles.addButton}
            onClick={this.addHandler}
          >Add todo</button>
        </div>
        <div className={styles.checkboxWrapper}>
          <div className={styles.completedCheckbox}>
            <input 
              type="checkbox"
              onChange={this.completedCheckboxHandler}
              checked={this.state.completedCheckbox}
            />
            <span>Completed</span>                                     
          </div>
        </div>

        {this.props.todos.map(todo => {
          if(this.state.completedCheckbox) {
            if(todo.complete) {
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
          }
          else {
            if(!todo.complete) {
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
          }
        })}
      </div>
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