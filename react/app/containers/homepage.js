import React, { Component, PropTypes } from 'react'
import { Link } from "react-router";

/* Container Homepage : homepage */

export default class Homepage extends Component {

  render() {
    return (
      <div className="homepage">
      	<div className="homepage-logo">
	      	<img className="homepage-img" src="/html/src/img/cat.png"/>
	       	<div className="homepage-logo-txt">
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
	       	</div>
       	</div>
       	<p className="homepage-txt title-2">
       		Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec cursus dapibus est eleifend egestas. Maecenas imperdiet, magna id molestie.
       	</p>
       	<Link to="create-story" className="btn1 homepage-btn">Create my story</Link>
       	<Link to="gallery" className="btn1 homepage-btn">Gallery</Link>
      </div>
    )
  }
}
