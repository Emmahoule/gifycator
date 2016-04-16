import React, { Component, PropTypes } from 'react'
import { Link } from "react-router";

import { config } from '../config.js'
const API_URL = config.API_URL;

/*  Component SelectCategory : 
 *
 * Composant contenant une catégorie et son lien
 * pour rentrer dans sa gallerie
*/
export default class SelectCategory extends Component {

  constructor(){
    super();
    this.onClickCategory = this.onClickCategory.bind(this);
  }

  /*  GoToGallery(event) : 
   * - parameter : event 
   *
   * Au click sur une catégorie, lancement de l'animation de disparition
   * des catégories, et callback pour entrer dans la catégorie sélectionnée.
  */
  onClickCategory(e) {
    e.preventDefault();
    let tl = new TimelineMax();
    tl.add( TweenMax.to(".select-category-bg-inner", 1, {width: "0px", ease:Power2.easeInOut}));
    tl.add( TweenMax.to(".select-category-name", 0.5, {autoAlpha: 0, x: 0, y:0, ease:Power2.easeOut}), 0.5);  
    tl.add( TweenMax.to(".select-category-stories", 0.5, {autoAlpha: 0, x: 0, y:0, ease:Power2.easeOut, onComplete: ()=>this.props.history.push("gallery/" + this.props.id)}), 0.5);
  }

  render() {
    const { id, name, color, nbGifs } = this.props;
    const gallery =  "gallery/" + id;
    return (
      <Link to={gallery} onClick={this.onClickCategory.bind(this)} className="select-category">
        <div className="select-category-bg">
          <div className="select-category-bg-inner" style={{backgroundColor: color}}></div>
        </div>
        <div className="select-category-text-block">
          <div className="select-category-name">{name}</div>
          <div className="select-category-stories">{nbGifs} amazing stories</div>
        </div>
      </Link>
    )
  }
}

SelectCategory.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  nbGifs: PropTypes.array
}
