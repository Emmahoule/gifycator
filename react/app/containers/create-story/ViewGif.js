import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'
import { Link } from "react-router";

import { config } from '../../config.js'
const API_URL = config.API_URL;


/* Container ViewGif : 
 * 
 * 
*/

class ViewGif extends Component {

  constructor(){
    super();
  }

  render() {
    const { dispatch, dataStory } = this.props;
    return (
        <div className="view-gif">
          <div className="a-middle">
            {dataStory &&
              <div className="view-gif-story-block">
                <div className="view-gif-story">
                  <div className="view-gif-square"></div>
                  <div className="view-gif-title-block">
                    <div className="view-gif-title">{dataStory.title}</div>
                    <div className="view-gif-author">{dataStory.author}</div>
                  </div>
                  <video className="view-gif-video" crossOrigin="anonymous" autoPlay="true" width="300" height="300" loop="loop" preload="metadata" src={API_URL+dataStory.url}></video>
                </div>
                <div className="view-gif-share">Share on 
                  <a className="view-gif-share-link" href="#">            
                    <svg className="icon icon-facebook">
                      <use xlinkHref="#icon-facebook"></use>
                    </svg>
                  </a>
                  <a className="view-gif-share-link" href="#"> 
                    <svg className="icon icon-twitter">
                      <use xlinkHref="#icon-twitter"></use>
                    </svg>
                  </a>
                </div>
                <div className="clearfix"></div>
              </div>
            }
            <Link to="gallery" className="view-gif-btn btn1">Gallery</Link>
            <Link to="create-story" className="view-gif-btn btn1">Create new story</Link>
          </div>
        </div>
    )
  }
}

ViewGif.propTypes = {
  dispatch: PropTypes.func.isRequired,
  dataStory: PropTypes.object.isRequired
}

function mapStateToProps(state) {

  const { saveGifStory } = state
  const { dataStory } = saveGifStory

  return {
    dataStory
  }
}

export default connect(mapStateToProps)(ViewGif)