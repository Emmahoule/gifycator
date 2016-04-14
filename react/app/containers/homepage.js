import React, { Component, PropTypes } from 'react'
import { Link } from "react-router";
import { connect } from 'react-redux';

/* Container Homepage : homepage */

class Homepage extends Component {

  render() {
    const { isFetching } = this.props;
    console.log(isFetching);
    return (
      <div className="homepage">
       	<div className="homepage-block a-middle">
       	    <div className="homepage-logo title-2">
       	 		.Gyficator
       		</div>
	       	<p className="homepage-txt">
	       		Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec cursus dapibus est eleifend egestas. Maecenas imperdiet, magna id molestie.
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

function mapStateToProps(state) {

  const { concatGifStory } = state
  const { isFetching } = concatGifStory

  return {
    isFetching
  }
}

export default connect(mapStateToProps)(Homepage)
