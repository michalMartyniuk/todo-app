import React from 'react';
import styles from './navigation.css';
import Aux from '../../../hoc/Aux';

const navigation = props => {

  const logout = 
    <div 
      className={[styles.logout, styles.linkDiv].join(' ')}
      onClick={props.logoutClick}
    >
      <span>Log out</span>
    </div>

  const auth = 
    <Aux>
      <div 
        className={[styles.login, styles.linkDiv].join(' ')}
        onClick={props.loginClick}  
      >
        <span>Log in</span>
      </div>
      <div 
        className={[styles.signup, styles.linkDiv].join(' ')}
        onClick={props.signupClick}
      >
        <span>Sign up</span>
      </div>
    </Aux>

  return (
    <div className={styles.navigation}>
      <div 
        className={[styles.linkDiv, styles.title].join(' ')}
        onClick={props.loginClick}  
      >
        To-do app
      </div>
      <div className={styles.auth}>
        {localStorage.getItem('token') ? logout : auth }
      </div>
    </div>
  )
}

export default navigation;