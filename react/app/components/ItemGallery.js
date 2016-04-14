import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router';
import { connect } from 'react-redux'
import { fetchGif, clearGif, deleteGif } from '../actions/GalleryActions.js';
import { ShareButtons, ShareCounts, generateShareIcon } from 'react-share';
import $ from 'jquery';

import { config } from '../config.js'
const API_URL = config.API_URL;
const BASE_URL = config.BASE_URL;
const { FacebookShareButton, TwitterShareButton, PinterestShareButton } = ShareButtons;

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
    $('.category-gallery-block').removeClass("visible");
    window.setTimeout(function(){
      $('.category-gallery-block').addClass("visible");
    }, 1000)
	}

	componentWillReceiveProps(nextProps){
    if (nextProps.params.id[1]!= this.id) {
      this.id = nextProps.params.id[1];
      this.props.dispatch(fetchGif(this.id));
    }
  }

  componentWillUnmount(){
    this.props.dispatch(clearGif());
      $('.category-gallery-block').removeClass("visible");
    window.setTimeout(function(){
      $('.category-gallery-block').addClass("visible");
    }, 1000)
  }

  deleteGif(){
    this.props.dispatch(deleteGif(this.props.gif.id, this.props.history));
  }

  render() {
    const { gif, isAuthenticated } = this.props;
    return (
      <div className="item-gallery">
      {gif &&
      	<div className="item-gallery-story">
          <div className="item-gallery-title-block">
  	     	 	<div className="item-gallery-title">{gif.title}</div>
  	     	 	<div className="item-gallery-author">{gif.author}</div>
       	 	</div>
          <div className="item-gallery-video-mask">
  	        <video className="item-gallery-video" src={API_URL+gif.url} autoPlay loop/>
          </div>
        </div>
      }
      {gif &&
        <div className="share item-gallery-share">Share on 
          <FacebookShareButton className="share-link" url={BASE_URL+"gallery/"+gif.category+"/"+gif.id} title={gif.title} media={API_URL+gif.cover} >
            <svg className="icon icon-facebook">
              <use xlinkHref="#icon-facebook"></use>
            </svg>
          </FacebookShareButton>

          <TwitterShareButton className="share-link" url={BASE_URL+"gallery/"+gif.category+"/"+gif.id} title={gif.title} media={API_URL+gif.cover}> 
            <svg className="icon icon-twitter">
              <use xlinkHref="#icon-twitter"></use>
            </svg>
          </TwitterShareButton>

          <PinterestShareButton className="share-link" url={BASE_URL+"gallery/"+gif.category+"/"+gif.id} title={gif.title} media={API_URL+gif.cover} >
            <svg className="icon icon-pinterest">
              <use xlinkHref="#icon-pinterest"></use>
            </svg>
          </PinterestShareButton>
        </div>
      } 
      {isAuthenticated && 
        <div className="item-gallery-delete" onClick={this.deleteGif.bind(this)}>X Delete this story</div>
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

  const { fetchGif, auth } = state;
  const { gif } = fetchGif;
  const { isAuthenticated } = auth

  return {
    gif, isAuthenticated
  }
}

export default connect(mapStateToProps)(ItemGallery)
