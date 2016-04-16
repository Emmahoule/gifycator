import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router";
import SelectCategory from '../../components/SelectCategory';
import { fetchCategories, fetchNbGifs } from '../../actions/CategoriesActions.js';
import * as TweenMax from "gsap/src/minified/TweenMax.min.js";

import { config } from '../../config.js'
const API_URL = config.API_URL;

/* Container ChooseCategory : 
 * 
 * Sous conteneur contenant le choix
 * de la catégorie à afficher
*/
class ChooseCategory extends Component {
  constructor(){
    super();
    this.state = {
      selectCat:false,
      curCatName: null,
      curCatImg: null
    }
  }

  /* ComponentWillMount : 
   * 
   * Dispatch de 2 actions : une permettant de récupérer
   * les catégories, et une autre permettant de connaître le nombre
   * de stories contenues dans chaque catégories.
  */
  componentWillMount(){
    this.props.dispatch(fetchCategories());
    this.props.dispatch(fetchNbGifs());
  }

  /* ComponentWillReceiveProps : 
   * 
   * A la réception des données concernant les catégories,
   * lancement de l'animation pour les afficher
  */
  componentWillReceiveProps(nextProps){
    if (nextProps.dataCategories){
      let tl = new TimelineMax();
      tl.add( TweenMax.staggerTo(".select-category-bg-inner", 1, {width: "375px", ease:Power2.easeInOut}, 0.15));
      tl.add( TweenMax.staggerTo(".select-category-name", 1.5, {autoAlpha: 1, x: 0, y:0, ease:Power2.easeOut}, 0.15), 0.5);  
      tl.add( TweenMax.staggerTo(".select-category-stories", 1.5, {autoAlpha: 1, x: 0, y:0, ease:Power2.easeOut}, 0.15), 0.5);  
    }
  }

  render() {
    const { dataCategories, nbGifs } = this.props;
    return (
        <div className="choose-category a-middle">
          {dataCategories && nbGifs && dataCategories.map(function(category){
            let nbOfGifs=nbGifs.find((item)=>{return (typeof(item.category!="undefined"))? item.category == category.id:0});
            return <SelectCategory 
                    id={category.id} 
                    key={category.id} 
                    nbGifs={nbOfGifs?nbOfGifs.total:0} 
                    name={category.name} 
                    color={category.color}
                    history={this.props.history} />;
          }.bind(this))}
        </div>
    )
  }
}


ChooseCategory.propTypes = {
  dispatch: PropTypes.func.isRequired,
  dataCategories: PropTypes.array,
  nbGifs: PropTypes.array
}

function mapStateToProps(state) {

  const { fetchCategories, fetchNbGifs } = state;
  const { dataCategories } = fetchCategories;
  const { nbGifs } = fetchNbGifs;
  return {
    dataCategories, nbGifs
  }
}

export default connect(mapStateToProps)(ChooseCategory)

