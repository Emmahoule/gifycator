import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router";
import SelectCategory from '../../components/SelectCategory';
import { fetchCategories, fetchNbGifs, deleteCategory, addCategory } from '../../actions/CategoriesActions.js';

import { config } from '../../config.js'
const API_URL = config.API_URL;


/* Container CategoriesList : 
 * 
 * Sous conteneur de l'admin contenant la liste des catégories,
 * avec la possibilité d'ajouter une catégorie
 * et de les supprimer (à condition qu'elles ne contiennent plus de gif)
*/
class CategoriesList extends Component {
  constructor(){
    super();
    this.state = {
      catName:null,
      catColor: null
    }
  }

  /* componentDidMount : 
   * 
   * Dispatch de 2 actions : une permettant de récupérer
   * les catégories, et une autre permettant de connaître le nombre
   * de stories contenues dans chaque catégories.
  */
  componentDidMount(){
    this.props.dispatch(fetchCategories());
    this.props.dispatch(fetchNbGifs());
  }

  /* AddCategory : 
   * 
   * Création d'un formulaire contenant les données de la nouvelle 
   * catégorie, et dispatch d'une action prenant pour paramètre le formulaire, et 
   * permettant d'ajouter cette catégories dans la BDD. 
  */
  addCategory(){
    let form = new FormData();
    form.append('name', this.state.catName);
    form.append('color', this.state.catColor);
    this.props.dispatch(addCategory(form, () => this.props.dispatch(fetchCategories())));
  }

  /* DeleteCategory : 
   * 
   * Dispatch d'une action permettant de supprimer une catégorie.
  */
  deleteCategory(id){
    this.props.dispatch(deleteCategory(id, () => this.props.dispatch(fetchCategories())));
  }

  render() {
    const { dataCategories, nbGifs } = this.props;
    return (
        <div className="categories-list a-middle">
          {dataCategories && nbGifs && dataCategories.map(function(category){
            let nbOfGifs=nbGifs.find((item)=>{return (typeof(item.category!="undefined"))? item.category == category.id:0});
            let canDelete = null;
            if (!nbOfGifs){
              canDelete = <div className="categories-list-category-delete" onClick={()=>this.deleteCategory(category.id)} >X Delete</div>;
            }
            return <div key={category.id} className="categories-list-category-item">
                      <Link to={"gallery/"+category.id}
                        className="categories-list-category" 
                        style={{backgroundColor: category.color}} >
                        {category.name} : {nbOfGifs?nbOfGifs.total:0} stories
                      </Link>
                      {canDelete}
                    </div>;
          }.bind(this))}
          <input className="categories-list-input" placeholder="New category" onChange={(e)=>this.setState({catName: e.target.value})} />
          <input className="categories-list-input" placeholder="Color code" onChange={(e)=>this.setState({catColor: e.target.value})} />
          <div className="btn1 categories-list-btn" onClick={this.addCategory.bind(this)}>Add</div>
        </div>
    )
  }
}


CategoriesList.propTypes = {
  dispatch: PropTypes.func.isRequired,
  dataCategories: PropTypes.array,
  nbGifs: PropTypes.array

}

function mapStateToProps(state) {

  const { fetchCategories, fetchNbGifs, deleteCat, addCat } = state;
  const { dataCategories } = fetchCategories;
  const { nbGifs } = fetchNbGifs;

  return {
    dataCategories, nbGifs
  }
}

export default connect(mapStateToProps)(CategoriesList)

