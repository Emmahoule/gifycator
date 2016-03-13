import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router";

/* Container CreateStory : 
 * 
 * Conteneur global contenant les composants 
 * pour la création d'histoire 
*/

export default class CreateStory extends Component {
  render() {
    return (
      	<div className="create-story">
          <Link to="/" className="create-story-logo">
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
          <div className="create-story-inner">
            {this.props.children}
          </div>
        </div>
    )
  }
}
