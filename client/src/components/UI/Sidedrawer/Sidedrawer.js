import React from 'react';
import styles from './Sidedrawer.css';

const Sidedrawer = props => {

  let login = null;
  let logout = null;
  let signup = null;
  
  const sideDrawerStyle = {
    transform: props.show ? 'translateX(0)' : 'translateX(-100%)',    
  }

  const logoutHandler = () => {
    props.click();
    props.logout();
  }

  const loginHandler = () => {
    props.click();
    props.loginModal();
  }

  const signupHandler = () => {
    props.click();
    props.signupModal();
  }

  if(localStorage.getItem('token')) {
    logout = <div className={styles.logout} onClick={logoutHandler}>Log out</div>
  }
  else {
    login = <div className={styles.item} onClick={loginHandler}>Log in</div>
    signup = <div className={styles.item} onClick={signupHandler}>Sign up</div>
  }

  return (
    <div 
      className={styles.Sidedrawer}
      style={sideDrawerStyle}
    >
      {login}
      {signup}  
      {logout}
    </div>
  )
}

export default Sidedrawer;