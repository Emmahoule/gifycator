import React, { Component, PropTypes } from 'react'
import { Link } from "react-router";
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
    			<div className="frame-bg">
    				<div className="frame-bg-line">
    					<div className="frame-bg-line-inner"></div>
    				</div>
    				<div className="frame-bg-line">
    					<div className="frame-bg-line-inner"></div>
    				</div>
    				<div className="frame-bg-line">
    					<div className="frame-bg-line-inner"></div>
    				</div>
    				<div className="frame-bg-line">
    					<div className="frame-bg-line-inner"></div>
    				</div>
    				<div className="frame-bg-line">
    					<div className="frame-bg-line-inner"></div>
    				</div>
    				<div className="frame-bg-line">
    					<div className="frame-bg-line-inner"></div>
    				</div>
    				<div className="frame-bg-line">
    					<div className="frame-bg-line-inner"></div>
    				</div>
    			</div>
          <div className="frame-left-nav">
            {isFetching &&
              <Link to="create-story/create-gif" className="frame-loading frame-left-nav-link">
                <svg className="icon icon-load frame-loading-icon">
                 <use xlinkHref="#icon-load"></use>
               </svg>
               <div className="frame-loading-text">Wait...</div>
             </Link>
            }
            {!isFetching && story &&
              <Link to="create-story/create-gif" className="frame-loading frame-left-nav-link">
                <div className="frame-loading-text">Story ready !</div>
              </Link>
            }
            <Link className="frame-left-nav-link" to="create-story">Create my story</Link>
            <Link className="frame-left-nav-link" to="gallery">Gallery</Link>
          </div>
        	<div className="frame-wrapper">
        	  <div className="title-1">
			    		.Gifycator
		      	</div>
       			{this.props.children}
	       	</div>
      	</div>
    	)	
  	}
}

            // {isFetching &&
            //   <Link to="create-story/create-gif" className="frame-loading frame-left-nav-link">
            //     <svg className="icon icon-load frame-loading-icon">
            //      <use xlinkHref="#icon-load"></use>
            //    </svg>
            //    <div className="frame-loading-text">story in creation...</div>
            //  </Link>
            // }
            // {!isFetching && story &&
            //   <Link to="create-story/create-gif" className="frame-loading frame-left-nav-link">
            //     <div className="frame-loading-text">your story is ready !</div>
            //   </Link>
            // }

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
