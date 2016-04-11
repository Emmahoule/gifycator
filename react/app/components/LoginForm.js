import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';

export default class LoginForm extends Component {
  constructor(){
    super();
    this.state = {
      email: null,
      password: null
    }
  }
  submit() {
    const creds = { email: this.state.email, password: this.state.password }
    this.props.onLoginClick(creds, this.props.history);
  }   
  render() {
    const { errorMessage } = this.props
    return (
      <div className="login-form a-middle">
        <input 
          placeholder="Email" 
          type="text"
          name="email" 
          value={this.state.email}
          onChange={(e)=>this.setState({email: e.target.value})}
          required />
        <input 
          placeholder="Password" 
          type="password"
          name="password" 
          onChange={(e)=>this.setState({password: e.target.value})}
          required />
          {errorMessage &&
            <div><br/>{errorMessage}<br/></div>
          }
        <div className="btn1 login-form-btn" onClick={this.submit.bind(this)} >Se connecter</div>
      </div>
    )
  }
}