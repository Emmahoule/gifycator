import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router";
import SelectCategory from '../../components/SelectCategory';
import { fetchCategories } from '../../actions/CategoriesActions.js';

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
  }

  render() {
    const { dataCategories } = this.props;
    return (
        <div className="choose-category a-middle">
          {dataCategories && dataCategories.map(function(category){
            return <SelectCategory id={category.id} key={category.id} name={category.name} color={category.color} />;
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

  const { fetchCategories } = state;
  const { dataCategories } = fetchCategories;

  return {
    dataCategories
  }
}

export default connect(mapStateToProps)(ChooseCategory)

