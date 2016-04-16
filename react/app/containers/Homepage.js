import React, { Component, PropTypes } from 'react'
import { Link } from "react-router";
import { connect } from 'react-redux';

/* Container Homepage : 
 * 
 * Conteneur homepage
*/
class Homepage extends Component {

  render() {
    const { isFetching } = this.props;
    return (
      <div className="homepage">
       	<div className="homepage-block a-middle">
       	    <div className="homepage-logo title-2">
       	 		.Gifycator
       		</div>
	       	<p className="homepage-txt">
	       		With Gifycator, you can create your own story by gluing gifs together, and share them with your friends. Drop by the gallery, you might find something funny !
	       	</p>
          {!isFetching &&
	       	<Link to="create-story" className="btn1 homepage-btn">Create my story</Link>
          }
	       	<Link to="gallery" className="btn1 homepage-btn">Gallery</Link>
       	</div>
      </div>
    )
  }
}

Homepage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isFetching: PropTypes.bool
}


function mapStateToProps(state) {

  const { concatGifStory } = state
  const { isFetching } = concatGifStory

  return {
    isFetching
  }
}

export default connect(mapStateToProps)(Homepage)
