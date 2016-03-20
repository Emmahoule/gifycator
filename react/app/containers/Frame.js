import React, { Component, PropTypes } from 'react'
import { Link } from "react-router";
import { draw } from '../middleware/bgCanvas';
import { connect } from 'react-redux';

/* Container Frame : conteneur global */

class Frame extends Component {
	constructor(){
		super();
	}

  	render() {
  		const { isFetching, story } = this.props;
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
	       		{isFetching &&
	       		<Link to="create-story/create-gif" className="frame-loading">
			        <svg className="icon icon-load frame-loading-icon">
					    <use xlinkHref="#icon-load"></use>
					</svg>
					<div className="frame-loading-text">story in creation...</div>
	       		</Link>
	       		}
	       		{!isFetching && story &&
	       		<Link to="create-story/create-gif" className="frame-loading">
					<div className="frame-loading-text">your story is ready !</div>
	       		</Link>
	       		}
      		</div>
    	)	
  	}
}

Frame.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isFetching: PropTypes.bool,
  story: PropTypes.string
}

function mapStateToProps(state) {

  const { concatGifStory } = state
  const { isFetching, story } = concatGifStory

  return {
    isFetching, story
  }
}

export default connect(mapStateToProps)(Frame)
