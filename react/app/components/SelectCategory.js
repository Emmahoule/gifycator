import React, { Component, PropTypes } from 'react'
import { Link } from "react-router";

import { config } from '../config.js'
const API_URL = config.API_URL;

/*  Component SelectCategory : 
 *
*/

export default class SelectCategory extends Component {
  render() {
    const { id, name, color } = this.props;
    const gallery =  "gallery/" + id;
    return (
      <Link to={gallery} className="select-category"  style={{backgroundColor: color}}>
        <div className="select-category-text-block">
          <div className="select-category-name">{name}</div>
          <div className="select-category-stories">{name} amazing stories</div>
        </div>
      </Link>
    )
  }
}

SelectCategory.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired
}
