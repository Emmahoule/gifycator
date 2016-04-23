import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import ReactDOM from 'react-dom';
import { saveStory } from '../actions/CreateGifActions.js';
import { fetchCategories } from '../actions/CategoriesActions.js';

import { config } from '../config.js'
const API_URL = config.API_URL;


/* Component SaveGif : 
 * 
 * Conteneur qui récupère la vidéo concaténée
 * et qui affiche des champs de formulaire pour
 * ajouter des infos à l'histoire (titre, auteur, 
 * image de couverture, catégorie). 
 *
 * States :
 * - categoryName: nom de la catégorie sélectionnée
 * - categoryValue: valeur de la catégorie sélectionnée
 * - categoryColor: couleur de la catégorie sélectionnée
 * - open: true/false - état du select
 * - title: titre de l'histoire
 * - author: autheur de l'histoire
 * - cover: image de couverture de l'histoire
*/
export default class SaveGif extends Component {

  constructor(){
    super();
    this.state = {
      categoryName: "Choose a category",
      categoryValue: null,
      categoryColor: null,
      open: false,
      title: null, 
      author: null,
      cover: null
    }
    this.selectCat;
    this.video;
  }

  /* componentWillMount : 
   * 
   * Au montage du composant, récupération des catégories (fetch),
   * et si pas d'histoire à enregistrer, redirection vers la composition d'histoire
  */  
  componentWillMount(){
    this.props.dispatch(fetchCategories());
    if (!this.props.story) {
      this.props.history.push("create-story");
    }
  }

  /* onClickSelect : 
   * 
   * Met à jour l'état du composant 
   * pour passer une classe "open" au select
   * si il est ouvert, et "closed" si il est fermé
  */  
  onClickSelect() {
    if (!this.state.open) {
      this.setState({
        open : true
      });
    } else {
      this.setState({
        open : false
      });      
    }
  }

  /* onClickSelectItem : 
   * 
   * Met à jour l'état du composant 
   * pour afficher, dans le select, la valeur sélectionnée
  */  
  onClickSelectItem(e){
    let value = e.target.getAttribute("data-value");
    let text = e.target.innerHTML;
    let color = this.props.dataCategories.find((category)=>{return category.id==value}).color;
    this.setState({
      categoryName : text,
      categoryValue : value,
      categoryColor : color,
      open : false
    });
  }

  /* onClickCoverBtn : 
   * 
   * Ajoute le contrôle de la vidéo,
   * et la remet au début pour la selection
   * d'une photo de couverture
  */  
  onClickCoverBtn() {
    this.setState({
      cover : "clicked"
    });
    this.video.pause();
    this.video.currentTime = 0;
    this.video.controls=true;
  }

  /* onClickValidateBtn : 
   * 
   * Au clique sur valider,
   * capture d'une image de couverture
   * pour la vidéo
  */  
  onClickValidateBtn(){
    this.captureCoverVideo();
  }

  /* captureCoverVideo : 
   * 
   * Capture dans un canvas d'une image de couverture en base 64
   * et envoie des données au serveur
  */  
  captureCoverVideo(){
    var canvas = document.createElement('canvas');
    var context = canvas.getContext('2d');
    var width = this.video.videoWidth;
    var height = this.video.videoHeight;
    canvas.width = width;
    canvas.height = height;
    context.drawImage(this.video, 0, 0, canvas.width, canvas.height);
    var dataURL = canvas.toDataURL();
    var coverImg = dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
    this.setState({
      cover: coverImg
    });
    this.sendData(coverImg);
  }

  /* sendData : 
   * - parameter : coverImg 
   * 
   * Ajoute les données de l'histoire (titre, auteur, url, couverture, catégorie) 
   * contenues dans l'état du composant dans un formulaire.
   * Dispatch d'une action pour envoyer le formulaire au serveur et ainsi enregistrer les données
  */  
  sendData(coverImg){
    let form = new FormData();
    form.append("url", this.props.story);
    form.append("cover", coverImg);
    form.append("title", this.state.title);
    form.append("author", this.state.author);
    form.append("category", this.state.categoryValue);
    this.props.dispatch(saveStory(form, this.props.history));
  }

  render() {
    const { dispatch, story, dataCategories } = this.props;

    return (
        <div className="save-gif">

          <div className="a-middle">
            <div className="save-gif-top">
              <input type="text" className="save-gif-input-name" value={this.state.title} onChange={(e)=>this.setState({title:e.target.value})} placeholder="Choose a title"/>
              <input type="text" className="save-gif-input-author" value={this.state.author}  onChange={(e)=>this.setState({author:e.target.value})} placeholder="Who's the author"/>
              <div className={"select save-gif-select" + (this.state.open ? " open" : " closed")} ref={e=>this.selectCat=e}>
                <div className="select-selected" onClick={this.onClickSelect.bind(this)} data-value={this.state.categoryValue}>{this.state.categoryName}</div>
                {dataCategories &&
                  <ul className="select-list">
                  {dataCategories.map(function(category){
                    return <li key={category.id} className="select-list-item" data-value={category.id} onClick={this.onClickSelectItem.bind(this)}>{category.name}</li>
                  }.bind(this))}
                  </ul>
                }
              </div>
              <div className="btn1 save-gif-cover-btn" onClick={this.onClickCoverBtn.bind(this)}>Select a cover</div>
            </div>
            <div className="save-gif-bottom">
              <div className="save-gif-bottom-square" style={{backgroundColor: this.state.categoryColor}}></div>
              <div className="save-gif-bottom-title-block">
                <div className="save-gif-bottom-title">{this.state.title}</div>
                <div className="save-gif-bottom-author">{this.state.author}</div>
              </div>
              <div className="save-gif-video-mask">
                <video crossOrigin="anonymous" autoPlay="true" width="250" height="250" loop="loop" preload="metadata" className="save-gif-video" ref={e=>this.video=e} src={API_URL+story}></video>
              </div>
            </div>
            <div className="clearfix"></div>
            {this.state.title && this.state.author && this.state.categoryValue && this.state.cover &&
              <div className="btn1 save-gif-btn" onClick={this.onClickValidateBtn.bind(this)}>Valider</div>
            }
          </div>
        </div>
    )
  }
}

// Déclaration du types des props
SaveGif.propTypes = {
  dispatch: PropTypes.func.isRequired,
  story: PropTypes.string.isRequired,
  dataCategories: PropTypes.array
}
