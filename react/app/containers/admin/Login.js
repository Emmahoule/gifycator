import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { loginUser } from '../../actions/AuthActions.js'
import LoginForm from '../../components/LoginForm'
import { Link } from "react-router";

class Login extends Component {
  render() {
    const { dispatch, errorMessage } = this.props
    return (
      <div className="auth auth-signin">
          <LoginForm
            errorMessage={errorMessage}
            onLoginClick={ creds => dispatch(loginUser(creds, this.props.history))}
          />
      </div>
    )
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  errorMessage: PropTypes.string
}

function mapStateToProps(state) {

  const { auth } = state
  const { errorMessage } = auth

  return {
    errorMessage
  }
}

export default connect(mapStateToProps)(Login)