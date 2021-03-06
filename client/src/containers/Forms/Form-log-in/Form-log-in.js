import React, { Component } from 'react';
import Input from '../Input/Input';
import formConfig from '../Form-config/log-in-config';

import styles from './Form-log-in.css';
import { connect } from 'react-redux';
import { login } from '../../../store/actions/actions-auth';

class LoginForm extends Component {
  state = {
    formConfig,
    validation: {}
  }

  componentDidMount() {
    let config = { }
    for(let item in this.state.formConfig) {
      for(let prop in this.state.formConfig[item].validation) {
        config[item] = {
          ...config[item],
          [prop]: { ...this.state.formConfig[item].validation[prop], value: false }
        }   
      }
    }
    this.validation = config
  }

  inputChangeHandler = (e, key) => {
    this.setState({
      formConfig: {
        ...this.state.formConfig,
        [key]: {
          ...this.state.formConfig[key],
          value: e.target.value,
          touched: true,                  
        }
      }
    })
  }

  formSubmitHandler = (e) => {
    e.preventDefault();
    let valid = true;
    const form = {...this.state.formConfig }
    for(let key in form) {
      form[key].touched = true
    }
    this.setState({ formConfig: form })
    for(let key in this.validation) {
      for(let prop in this.validation[key]) {
        if(this.validation[key][prop].value === false) valid = false;
      }
    }

    if(valid === true) {
      let userInfo = {}
      let invalidMessages = []
      for(let key in this.state.formConfig) {
        userInfo[key] = this.state.formConfig[key].value
      }
      this.props.login(userInfo);
      this.props.closeModal();
    }    
  }

  validatedHandler = (key, obj) => {
    this.validation = { ...this.validation, [key]: obj }
  }

  render() {
    let inputs = Object.keys(this.state.formConfig).map( key => {
      return <Input
        {...this.state.formConfig[key].config}
        validated={this.validatedHandler}
        key={key}
        name={key}
        inputchange={(event) => this.inputChangeHandler(event, key)}
        value={this.state.formConfig[key].value}
        touched={this.state.formConfig[key].touched}
        validation={this.state.formConfig[key].validation}
        inputtype='input'
        type={key === 'password' || key === 'confirmPassword' ? 'password' : 'text'}
      />
    })
    
    return (
        <form className={styles.Form} onSubmit={this.formSubmitHandler}>
          {inputs}
          <div className={styles.wrapper}>
            <button className={styles.loginBtn} onClick={this.props.formSubmitHandler}>Login</button>
          </div>
        </form>
    )
  }
}

const mapStateToProps = state => {
  return state
}

const mapDispatchToProps = dispatch => {
  return {
    login: (user) => dispatch( login(user) )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);