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
        <div className="concat-gif a-middle">
        	<div className="concat-gif-title">
		        <svg className="icon icon-load concat-gif-title-icon">
				      <use xlinkHref="#icon-load"></use>
				    </svg>
				    <div className="concat-gif-title-text title-3">Wait...</div>
			    </div>
			  <p className="concat-gif-infos">Your story is being created. You can browse the gallery, or stay here while it is being created. The creation should take about as long as the duration of your story. We will tell you when it’s ready !</p>
      </div>
    )
  }
}

ConcatGif.propTypes = {
  dispatch: PropTypes.func.isRequired,
  imgs: PropTypes.array.isRequired
}
