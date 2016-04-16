import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router";
import { fetchGifs, clearGifs } from '../../actions/GalleryActions.js';
import { fetchCategory, clearCategory } from '../../actions/CategoriesActions.js';
import ItemGallery from '../../components/ItemGallery.js';
import LazyLoad from 'react-lazy-load';
import $ from 'jquery';

import { config } from '../../config.js'
const API_URL = config.API_URL;

/* Container CategoryGallery : 
 * 
 * Sous-conteneur contant les composants 
 * pour afficher la gallerie de stories d'une catégorie
*/
class CategoryGallery extends Component {
  constructor(){
    super();
    this.state = {
      currentGif : 0,
      nextGif : 1,
      prevGif : -1
    }
    this.lg = 0;
  }

  /* componentWillMount : 
   * 
   * Dispatch de 2 actions : 
   * une pour récupérer les stories de la catégorie sélectionnée
   * et une autre pour récupérer les infos de la catégorie.
   * Ajout des classes nécessaires à l'animation.
  */
  componentWillMount(){
    this.props.dispatch(fetchGifs(this.props.params.id));
    this.props.dispatch(fetchCategory(this.props.params.id));
    window.setTimeout(function(){
      $('.category-gallery-block').addClass("visible");
      this.props.history.push('gallery/'+this.props.params.id[0]+'/'+this.props.gifs[0].id);
    }.bind(this), 500);
  }

  /* componentWillReceiveProps : 
   * 
   * Récupération du nombre de stories présents dans la catégorie
  */
  componentWillReceiveProps(nextProps){
    if (nextProps.gifs) {
      this.lg = nextProps.gifs.length;
    }
  }

  /* componentWillUnmount : 
   * 
   * Dispatch de 2 actions : Une pour vider le composant, 
   * et une autre pour vider la catégorie courrante.
  */
  componentWillUnmount(){
    this.props.dispatch(clearGifs());
    this.props.dispatch(clearCategory());
  }

  /* prevStates : 
   * 
   * Mise à jours de l'état du composant, ajout des classes nécessaires
   * à l'animation, et redirection vers la story précédente
  */
  prevStates(){
    if (this.state.currentGif>0) {
      $('.category-gallery-block').removeClass("visible");
      window.setTimeout(function(){
        $('.category-gallery-block').addClass("visible");
        this.props.history.push('gallery/'+this.props.params.id[0]+'/'+this.props.gifs[this.state.prevGif].id);
        this.setState({
          currentGif : this.state.currentGif-1,
          nextGif : this.state.currentGif,
          prevGif : this.state.currentGif-2
        });   
      }.bind(this), 1000);
    } else {
      this.setState({
        currentGif : -1,
        nextGif : 0,
        prevGif : -2
      });      
    }
  }  

  /* nextStates : 
   * 
   * Mise à jours de l'état du composant, ajout des classes nécessaires
   * à l'animation, et redirection vers la story suivante
  */
  nextStates(){
    if (this.state.currentGif<=this.lg) {
      $('.category-gallery-block').removeClass("visible");
      window.setTimeout(function(){
        $('.category-gallery-block').addClass("visible");
        this.props.history.push('gallery/'+this.props.params.id[0]+'/'+this.props.gifs[this.state.nextGif].id);
        this.setState({
          currentGif : this.state.currentGif+1,
          nextGif : this.state.currentGif+2,
          prevGif : this.state.currentGif
        });    
      }.bind(this), 1000);
    }
  }       

  /* onClickReturn : 
   * 
   * Mise à jour des classes nécessaires pour l'animation, et redirection
   * vers la liste des catégories
  */
  onClickReturn(e){
    e.preventDefault();
    $('.category-gallery-block').removeClass("visible");
    window.setTimeout(function(){
      this.props.history.push("gallery");
    }.bind(this), 1000);
  }

  render() {
    const { gifs, dataCategory } = this.props;
    const categoryId = this.props.params.id[0];
    return (
        <div className="category-gallery">
          <Link to="gallery" className="category-gallery-return" onClick={this.onClickReturn.bind(this)}>Categories</Link>
          <div className="a-middle">
          {dataCategory && 
          <div className="category-gallery-block">
            <div className="category-gallery-block-square" style={{backgroundColor: dataCategory.color}}></div>
            {this.state.currentGif<0 &&
              <div className="category-gallery-block-category">{dataCategory.name}</div>
            }
            {this.state.currentGif>=0 &&
              this.props.children
            }
          </div>
          }
          {gifs &&
            <div className="category-gallery-nav">
            {this.state.prevGif>=0 &&
              <div className="category-gallery-nav-item category-gallery-nav-prev" onClick={this.prevStates.bind(this)} >Prev</div>
            }
            {this.state.nextGif<this.lg &&
              <div className="category-gallery-nav-item category-gallery-nav-next" onClick={this.nextStates.bind(this)} >Next</div>
            }
            </div>
          }
          </div>
        </div>
    )
  }
}


CategoryGallery.propTypes = {
  dispatch: PropTypes.func.isRequired,
  gifs: PropTypes.array,
  dataCategories: PropTypes.array
}

function mapStateToProps(state) {

  const { fetchGifs, fetchCategory } = state;
  const { gifs } = fetchGifs;
  const { dataCategory } = fetchCategory;

  return {
    gifs, dataCategory
  }
}

export default connect(mapStateToProps)(CategoryGallery)

