import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router";
import SelectCategory from '../../components/SelectCategory';
import { fetchCategories, fetchNbGifs, deleteCategory, addCategory } from '../../actions/CategoriesActions.js';

import { config } from '../../config.js'
const API_URL = config.API_URL;

/* Container CategoriesList : 
 * 
 * Sous conteneur contenant le choix
 * de la catégorie à afficher
*/

class CategoriesList extends Component {
  constructor(){
    super();
    this.state = {
      catName:null,
      catColor: null
    }
  }

  componentWillMount(){
    this.props.dispatch(fetchCategories());
    this.props.dispatch(fetchNbGifs());
  }

  addCategory(){
    let form = new FormData();
    form.append('name', this.state.catName);
    form.append('color', this.state.catColor);
    this.props.dispatch(addCategory(form));
    this.props.dispatch(fetchCategories());
  }

  render() {
    const { dataCategories, nbGifs } = this.props;
    return (
        <div className="categories-list a-middle">
          {dataCategories && nbGifs && dataCategories.map(function(category){
            let nbOfGifs=nbGifs.find((item)=>{return (typeof(item.category!="undefined"))? item.category == category.id:0});
            return <div key={category.id} className="categories-list-category-item">
                      <div 
                        className="categories-list-category" 
                        style={{backgroundColor: category.color}} >
                        {category.name} : {nbOfGifs?nbOfGifs.total:0} stories
                      </div>
                      <div className="categories-list-category-delete" onClick={()=>this.props.dispatch(deleteCategory(category.id))} >X Delete</div>
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
  dataCategories: PropTypes.array
}

function mapStateToProps(state) {

  const { fetchCategories, fetchNbGifs, deleteCat, addCat } = state;
  const { dataCategories } = fetchCategories;
  const { datasCatSupp } = deleteCat;
  const { nbGifs } = fetchNbGifs;
  const { datasCat } = addCat;

  return {
    dataCategories, nbGifs, datasCat, addCat
  }
}

export default connect(mapStateToProps)(CategoriesList)

