import React from 'react';
import styles from './Navigation.css';
import Aux from '../../../hoc/Aux';

const Navigation = props => {

  const logout = <button onClick={props.logout} className={styles.logout}>Log out</button>
  const auth = (
    <Aux>
      <div className={styles.loginLink} style={{marginLeft: 'auto'}}>
          <div className={styles.linkDiv}>Login</div>
      </div>

      <div className={styles.linkDiv} onClick={props.loginModal}>
        <i className="fas fa-user"></i>
        <span className={styles.navText}>Login</span> 
      </div>
      <div className={styles.signupLink}>
          <div className={styles.linkDiv}>Sign up</div>
      </div>

      <div className={styles.linkDiv} onClick={props.signupModal}>
        <i className="fas fa-sign-in-alt"></i>
        <span className={styles.navText}>Sign up</span> 
      </div>
    </Aux>
  )

  return (
    <div className={styles.Navigation}>
      <div className={styles.menuIcon} onClick={props.toggleSidedrawer}>
        <div className={styles.iconItem}></div>
        <div className={styles.iconItem}></div>
        <div className={styles.iconItem}></div>
      </div>
      <div className={styles.linkDiv}>
        <span className={styles.appTitle}>To-do app</span>
      </div>
      <div className={styles.menu}>
        {localStorage.getItem('token') ? logout : auth }
      </div>
    </div>
  )
}

export default Navigation;