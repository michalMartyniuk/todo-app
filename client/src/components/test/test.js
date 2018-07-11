import React, { Component } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styles from './test.css';

class Test extends Component {
  
  state = {
    arr: [1,2,3,4,5]
  }
  
  arrHandler = (item) => {
    const newArr = this.state.arr.filter( num => num !== item);
    this.setState({
      arr: newArr
    })
  }

  render() {

    return (
      <TransitionGroup
        component="div"
        className={styles.group}
      >
      {this.state.arr.map( item => {
        return (
        <CSSTransition
          classNames = {{
            enter: styles.enter,
            enterActive: styles.enterActive,
            exit: styles.leave,
            exitActive: styles.leaveActive
          }}
          key={item}
          timeout={1000}

        >
          <li 
            className={styles.listItem}
            onClick={() => this.arrHandler(item)}
          >{item}</li>  
        </CSSTransition>)
      })}
    </TransitionGroup>
      
    )
  }
}

export default Test;