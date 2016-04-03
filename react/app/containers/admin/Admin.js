import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router";

/* Container Gallery : 
 * 
 * Conteneur global contenant les composants 
 * pour la gallerie d'histoires 
*/

export default class Admin extends Component {
  render() {
    return (
        <div className="gallery">
          <Link to="/" className="gallery-logo">
            <span className="c-red">.</span>
            <span className="c-red">G</span>
            <span className="c-red">i</span>
            <span className="c-red">f</span>
            <span>y</span>
            <span>-</span><br/>
            <span>c</span>
            <span>a</span>
            <span>t</span>
            <span>o</span>
            <span>r</span>
          </Link>
          <div className="gallery-inner">
            {this.props.children}
          </div>
        </div>
    )
  }
}
