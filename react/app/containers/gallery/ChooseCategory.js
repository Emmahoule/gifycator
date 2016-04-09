import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router";
import SelectCategory from '../../components/SelectCategory';
import { fetchCategories, fetchNbGifs } from '../../actions/CategoriesActions.js';

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

  componentWillMount(){
    this.props.dispatch(fetchCategories());
    this.props.dispatch(fetchNbGifs());
  }

  render() {
    const { dataCategories, nbGifs } = this.props;
    if(nbGifs){
      console.log(nbGifs);
    }
    return (
        <div className="choose-category a-middle">
          {dataCategories && nbGifs && dataCategories.map(function(category){
            let nbOfGifs=nbGifs.find((item)=>{return (typeof(item.category!="undefined"))? item.category == category.id:0});
            return <SelectCategory 
                    id={category.id} 
                    key={category.id} 
                    nbGifs={nbOfGifs?nbOfGifs.total:0} 
                    name={category.name} 
                    color={category.color} />;
          }.bind(this))}
        </div>
    )
  }
}


ChooseCategory.propTypes = {
  dispatch: PropTypes.func.isRequired,
  dataCategories: PropTypes.array
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

