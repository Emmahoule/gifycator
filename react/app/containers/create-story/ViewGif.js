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
        <div className="publish-gif">
          {dataStory &&
            <div>
            <div>
              <div style={{backgroundUrl: dataStory.cover}}>
                <video crossOrigin="anonymous" autoPlay="true" width="250" height="250" loop="loop" preload="metadata" src={API_URL+dataStory.url}></video>
              </div>
              <div className="">{dataStory.title}</div>
            </div>
            <div className="">{dataStory.author}</div>
            </div>
          }
          <div className="btn1">Gallery</div>
          <div className="btn1">Share</div>
          <Link to="create-story" className="btn1">Create new story</Link>
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