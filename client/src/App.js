import React, { Component } from 'react';
import styles from './App.css';
import Todos from './containers/Todos/Todos';
import LoginForm from './containers/Forms/Form-log-in/Form-log-in';
import SignUpForm from './containers/Forms/Form-sign-up/Form-sign-up';
import Modal from './components/UI/Modal/Modal';
import Backdrop from './components/UI/Backdrop/Backdrop';
import Navigation from './components/UI/Navigation/Navigation';
import axios from 'axios';
import { connect } from 'react-redux';
import types from './store/actionTypes';
import { logout } from './store/actions/actions-auth';
import Sidedrawer from './components/UI/Sidedrawer/Sidedrawer';

class App extends Component {

  state = {
    sidedrawerState: false,
    modalState: {
      login: false,
      signup: false
    }
  }

  closeModal = () => {
    this.setState({
      modalState: {
        login: false,
        signup: false,
      }
    })
  }

  backdropClickHandler = () => {
    this.props.resetError();
    this.closeModal();
    if(this.state.sidedrawerState === true) {
      this.setState({
        sidedrawerState: false
      })
    }
  }

  authHandler = (auth) => {
    if(auth === 'login') this.setState({
      modalState: {
        ...this.state.modalState,
        login: true
      }
    });
    if(auth === 'signup') this.setState({
      modalState: {
        ...this.state.modalState,
        signup: true
      }
    })
  }

  toggleSidedrawer = () => {
    this.setState({
      sidedrawerState: !this.state.sidedrawerState,
    })
  }

  render() {
    return (
      <div className="App">
        <Backdrop 
          show={
            this.state.modalState.login || 
            this.state.modalState.signup ||
            this.props.error ||
            this.state.sidedrawerState
          } 
          click={this.backdropClickHandler}  
        />
        <Navigation 
          loginModal={() => this.authHandler("login")}
          signupModal={() => this.authHandler("signup")}
          logout={this.props.logout}
          toggleSidedrawer={this.toggleSidedrawer}
        />
        <Modal 
          show={this.state.modalState.login}
          title="Log in"  
        >
          <LoginForm closeModal={this.closeModal}/>
        </Modal>
        <Modal 
          show={this.state.modalState.signup}
          title="Sign up"  
        >
          <SignUpForm closeModal={this.closeModal}/>
        </Modal>
        <Modal
          show={this.props.error}
          title="Error"
          styleTitle={{fontSize: '2.5rem'}}
        >
          <p className={styles.errorMsg}>{this.props.error}</p>
        </Modal>
        <Sidedrawer 
          click={this.backdropClickHandler} 
          show={this.state.sidedrawerState}
          logout={this.props.logout}
          loginModal={() => this.authHandler("login")}
          signupModal={() => this.authHandler("signup")}
        />
        <Todos/>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state
}

const mapDispatchToProps = dispatch => {
  return {
    resetError: () => dispatch({ type: types.RESET_ERROR }),
    logout: () => dispatch( logout() )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
