import React, { Component, PropTypes } from 'react'
import { Link } from "react-router";
import { draw } from '../middleware/bgCanvas';

/* Container Frame : conteneur global */

export default class Frame extends Component {
	constructor(){
		super();
	}

  	render() {
    	return (
      		<div className="frame">
      			<canvas className="bg-gradient" id="bg-gradient"></canvas>
        		<div className="frame-wrapper">
        			{this.props.children}
	        	</div>
	        	<div className="frame-share">
	        		<svg className="icon icon-share2 frame-share-icon">
	        			<use xlinkHref="#icon-share"></use>
	        		</svg>
	        		Share
	        		<div className="frame-share-socials">
		        		<svg className="icon icon-facebook frame-share-socials-icon">
		        			<use xlinkHref="#icon-facebook"></use>
		        		</svg>
		        		<svg className="icon icon-twitter frame-share-socials-icon">
		        			<use xlinkHref="#icon-twitter"></use>
		        		</svg>
	        		</div>
	       		</div>
      		</div>
    	)	
  	}
}
