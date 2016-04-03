import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router';
import { connect } from 'react-redux'
import { fetchGif, clearGif } from '../actions/GalleryActions.js';

import { config } from '../config.js'
const API_URL = config.API_URL;

/*  Component ItemGallery : 
 *
*/

class ItemGallery extends Component {
	constructor(){
		super();
		this.id = null;
	}

	componentWillMount() {
	  this.id = this.props.params.id[1];
    this.props.dispatch(fetchGif(this.id));
	}

	componentWillReceiveProps(nextProps){
    if (nextProps.params.id[1]!= this.id) {
      this.id = nextProps.params.id[1];
      this.props.dispatch(fetchGif(this.id));
    }
  }

  componentWillUnmount(){
    this.props.dispatch(clearGif());
  }

  render() {
    const { gif } = this.props;
    return (
      <div className="item-gallery">
      {gif &&
        <div>
      	<div className="item-gallery-block">
	     	 	<div className="item-gallery-block-title">{gif.title}</div>
	     	 	<div className="item-gallery-block-author">{gif.author}</div>
     	 	</div>
     	 	<div className="item-gallery-gif-container">
	        <img className="item-gallery-cover" src={API_URL+gif.cover} />
	        <video className="item-gallery-gif" src={API_URL+gif.url} autoPlay loop/>
        </div>
        </div>
      }
      </div>
    )
  }
}

// ItemGallery.propTypes = {
//   deleteBoxToStory: PropTypes.func.isRequired,
//   addItemFileToStory: PropTypes.func.isRequired,
//   id: PropTypes.number.isRequired
// }

function mapStateToProps(state) {

  const { fetchGif } = state;
  const { gif } = fetchGif;

  return {
    gif
  }
}

export default connect(mapStateToProps)(ItemGallery)
