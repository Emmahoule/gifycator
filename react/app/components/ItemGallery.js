import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router';
import { connect } from 'react-redux'

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
	}

	componentWillReceiveProps(nextProps){
    if (nextProps.params.id[1]!= this.id) {
      this.id = nextProps.params.id[1];
    }
  }

  render() {
    const { gifs } = this.props;
    let id = this.props.params.id[1];
		let gif = gifs.filter(gif=>gif.id==id);
		gif = gif[0];
    return (
      <div className="item-gallery">
      	<div className="item-gallery-block">
	     	 	<div className="item-gallery-block-title">{gif.title}</div>
	     	 	<div className="item-gallery-block-author">{gif.author}</div>
     	 	</div>
     	 	<div className="item-gallery-gif-container">
	        <img className="item-gallery-cover" src={API_URL+gif.cover} />
	        <video className="item-gallery-gif" src={API_URL+gif.url} autoPlay loop/>
        </div>

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

  const { fetchGifs } = state;
  const { gifs } = fetchGifs;

  return {
    gifs
  }
}

export default connect(mapStateToProps)(ItemGallery)
