import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router";
import { logoutUser } from '../../actions/AuthActions.js'

/* Container Gallery : 
 * 
 * Conteneur global contenant les composants 
 * pour la gallerie d'histoires 
*/

export default class Admin extends Component {
  constructor(props) {
    super(props);
    if (!props.isAuthenticated) {
      props.history.push('/');
    }
  }
  logout() {
    this.props.dispatch(logoutUser(this.props.history));
  }
  render() {
    return (
        <div className="auth">
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
          <div className="auth-inner">
            {this.props.children}
          </div>
          <div className="auth-logout" onClick={this.logout.bind(this)}>Déconnexion</div>
        </div>
    )
  }
}

Admin.propTypes = {
  dispatch: PropTypes.func.isRequired,
  errorMessage: PropTypes.string
}

function mapStateToProps(state) {

  const { auth } = state
  const { errorMessage, isAuthenticated } = auth

  return {
    errorMessage, isAuthenticated
  }
}

export default connect(mapStateToProps)(Admin)