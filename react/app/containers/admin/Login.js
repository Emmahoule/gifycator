import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { loginUser } from '../../actions/AuthActions.js'
import LoginForm from '../../components/LoginForm'
import { Link } from "react-router";

/* Login : 
 * 
 * Conteneur permettant à un admin de se connecter
*/
class Login extends Component {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    if (this.props.isAuthenticated) {
      this.props.history.push('admin/categories');
    }  
  }

  render() {
    const { dispatch, errorMessage } = this.props
    return (
      <div className="auth auth-signin">
          <Link to="/" className="auth-logo">
            <span className="c-red">.</span>
            <span className="c-red">G</span>
            <span className="c-red">i</span>
            <span className="c-red">f</span>
            <span>y</span>
            <span>c</span>
            <span>a</span>
            <span>t</span>
            <span>o</span>
            <span>r</span>
          </Link>
          <LoginForm
            errorMessage={errorMessage}
            onLoginClick={ creds => dispatch(loginUser(creds, this.props.history))}
          />
      </div>
    )
  }
}

Login.propTypes = {
  dispatch: PropTypes.func,
  errorMessage: PropTypes.string,
  isAuthenticated: PropTypes.bool
}

function mapStateToProps(state) {

  const { auth } = state
  const { errorMessage, isAuthenticated } = auth

  return {
    errorMessage, isAuthenticated
  }
}

export default connect(mapStateToProps)(Login)