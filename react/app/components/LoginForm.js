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
    this.props.onLoginClick(creds);
  }   
  render() {
    const { errorMessage } = this.props
    return (
      <div>
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
        <div className="btn1" onClick={this.submit.bind(this)} >Se connecter</div>
      </div>
    )
  }
}