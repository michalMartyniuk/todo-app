import React from 'react';
import styles from './Modal.css';
import Aux from '../../../hoc/Aux';
import Card from '../Card/Card';
import { CSSTransition } from 'react-transition-group';

const Modal = props => {
  
  let modal = 
    <CSSTransition
        mountOnEnter
        unmountOnExit
        in={props.show}
        classNames={{
          enterActive: styles.enterActive,
          exitActive: styles.exitActive
        }}
        timeout={1000}
      >
      <div className={styles.Modal}>    
        <Card title={props.title} styleCard={{"width": "100%"}} styleTitle={props.styleTitle}>
          {props.children}
        </Card>
      </div>
    </CSSTransition>

  return (
    <Aux>
      {modal}
    </Aux>
  )
}

export default Modal