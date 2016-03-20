import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { readGifsStory } from '../actions/ComposeGifActions.js';
import { concatGifs } from '../actions/CreateGifActions.js';
import ReactDOM from 'react-dom';

import { config } from '../config.js'
const API_URL = config.API_URL;


/* Component ConcatGif : 
 * 
 * Composent qui récupère la liste de gif de l'utilisateur
 * et qui effectue une requête pour concaténer les gifs 
 * et créer l'histoire
*/

export default class ConcatGif extends Component {

  constructor(){
    super();
  }

  /* componentDidMount : 
   * 
   * Créée le formulaire contenant les gifs à concaténer
   * et l'envoie au serveur
  */  
  componentDidMount(){
    let form = new FormData();
  	{this.props.imgs.map(function(img){
  		form.append("gif_"+img.id, img.file);
  	})}
  	this.props.dispatch(concatGifs(form));
  }

  render() {
    const { dispatch, imgs } = this.props;
    return (
        <div className="concat-gif">
        	<div className="create-story-title title-2">Lets create your story !</div>
        	<div className="concat-gif-title">
		        <svg className="icon icon-load concat-gif-title-icon">
				      <use xlinkHref="#icon-load"></use>
				    </svg>
				    <div className="concat-gif-title-text">story in creation...</div>
			    </div>
			  <p className="concat-gif-infos">You can navigate in the website, or stay here during the creation of your story. It must be take the longer of yours gif. We tell you when your story is ready !</p>
      </div>
    )
  }
}

ConcatGif.propTypes = {
  dispatch: PropTypes.func.isRequired,
  imgs: PropTypes.array.isRequired
}
