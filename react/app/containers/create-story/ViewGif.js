import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom';
import { connect } from 'react-redux'
import { Link } from "react-router";

import { ShareButtons, ShareCounts, generateShareIcon } from 'react-share';

import { config } from '../../config.js'

const API_URL = config.API_URL;
const BASE_URL = config.BASE_URL;

const { FacebookShareButton, TwitterShareButton, PinterestShareButton } = ShareButtons;


/* Container ViewGif : 
 * 
 * Composant permettant de visualiser le gif terminé
 * et de le partager sur différents réseaux sociaux
*/
class ViewGif extends Component {

  constructor(){
    super();
  }

  /* ComponentWillMount : 
   * 
   * Au montage du composant, si la story n'est pas présente
   * redirection de l'utilisateur vers la home de création d'histoire
  */
  componentWillMount(){
    if (!this.props.dataStory) {
      this.props.history.push("create-story");
    }
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
                  <div className="view-gif-video-mask">
                    <video className="view-gif-video" width="290" height="290" src={API_URL+dataStory.url} autoPlay loop></video>
                  </div>
                </div>
                <div className="clearfix"></div>
                <div className="view-gif-share share">Share on 
                  <FacebookShareButton className="share-link" url={BASE_URL+"gallery/"+dataStory.category+"/"+dataStory.id[0].id} title={dataStory.title} media={API_URL+dataStory.cover} >
                    <svg className="icon icon-facebook">
                      <use xlinkHref="#icon-facebook"></use>
                    </svg>
                  </FacebookShareButton>

                  <TwitterShareButton className="share-link" url={BASE_URL+"gallery/"+dataStory.category+"/"+dataStory.id[0].id} title={dataStory.title} media={API_URL+dataStory.cover}> 
                    <svg className="icon icon-twitter">
                      <use xlinkHref="#icon-twitter"></use>
                    </svg>
                  </TwitterShareButton>

                  <PinterestShareButton className="share-link" url={BASE_URL+"gallery/"+dataStory.category+"/"+dataStory.id[0].id} title={dataStory.title} media={API_URL+dataStory.cover} >
                    <svg className="icon icon-pinterest">
                      <use xlinkHref="#icon-pinterest"></use>
                    </svg>
                  </PinterestShareButton>
                </div>
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