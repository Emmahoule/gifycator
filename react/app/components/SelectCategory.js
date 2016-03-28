import React, { Component, PropTypes } from 'react'
import { Link } from "react-router";

import { config } from '../config.js'
const API_URL = config.API_URL;

/*  Component SelectCategory : 
 *
*/

export default class SelectCategory extends Component {
  render() {
    const { id, thumbnail } = this.props;
    const gallery =  "gallery/" + id;
    return (
      <Link to={gallery} className="select-category">
        <div className="select-category-name">See category</div>
        <div className="select-category-circle"  style={{backgroundImage: "url("+API_URL+thumbnail+")"}} ></div>
      </Link>
    )
  }
}

SelectCategory.propTypes = {
  id: PropTypes.number.isRequired,
  thumbnail: PropTypes.string.isRequired
}
