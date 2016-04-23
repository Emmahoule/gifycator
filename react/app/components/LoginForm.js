import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';

/*  Component LoginForm : 
 *
 *  Formulaire d'authentification
 *
 * States :
 * - email: email de l'utilisateur
 * - password: password de l'utilisateur
*/
export default class LoginForm extends Component {
  constructor(){
    super();
    this.state = {
      email: null,
      password: null
    }
  }

  /*  Submit : 
   *
   * Au click sur le bouton "ok", dispatch d'une action pour vérifier
   * si l'utilisateur est authorisé à accéder à l'admin 
  */
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

LoginForm.propTypes = {
  dispatch: PropTypes.func,
  errorMessage: PropTypes.string,
  onLoginClick: PropTypes.func
}