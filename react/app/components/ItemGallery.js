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


/* Component ItemGallery : 
 *
 * Affichage d'une histoire dans la gallerie
*/
class ItemGallery extends Component {
  constructor(){
    super();
    this.id = null;
  }

  /*  ComponentWillMount: 
   *
   * Au montage du composant, dispatch d'une action pour récupérer 
   * les infos de l'histoire (fetch) et gestion des classes nécessaires aux
   * animations
  */
  componentWillMount() {
    this.id = this.props.params.id[1];
    this.props.dispatch(fetchGif(this.id));
    $('.category-gallery-block').removeClass("visible");
    window.setTimeout(function(){
      $('.category-gallery-block').addClass("visible");
    }, 1000)
  }

  /* ComponentWillUnmount: 
   *
   * Au démontage du composant, dispatch d'une action permettant
   * de vider le composant, et gestion des classes nécessaires aux
   * animations
  */
  componentWillUnmount(){
    this.props.dispatch(clearGif());
      $('.category-gallery-block').removeClass("visible");
    window.setTimeout(function(){
      $('.category-gallery-block').addClass("visible");
    }, 1000)
  }

  /* componentWillReceiveProps: 
   *
   * A la reception des nouvelles props, récupération de l'id
   * du gif à fetcher, et récupération des données du nouveau gif
  */
  componentWillReceiveProps(nextProps){
    if (nextProps.params.id[1]!= this.id) {
      this.id = nextProps.params.id[1];
      this.props.dispatch(fetchGif(this.id));
    }
  }

  /* deleteGif: 
   *
   * Dispatch d'une action permettant de supprimer une histoire
   * si l'utilisateur est identifié
  */
  deleteGif() {
    const { dispatch, gif, history } = this.props;
    dispatch(deleteGif(gif.id, history));
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

// Déclaration du types des props
ItemGallery.propTypes = {
  gif: PropTypes.object,
  isAuthenticated: PropTypes.bool
}

// Connection au store Redux
function mapStateToProps(state) {

  const { fetchGif, auth } = state;
  const { gif } = fetchGif;
  const { isAuthenticated } = auth

  return {
    gif, isAuthenticated
  }
}

export default connect(mapStateToProps)(ItemGallery)
