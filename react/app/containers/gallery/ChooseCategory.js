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
        <div className="gallery">
          <div className="choose-category-block">
            {!this.state.selectCat &&
              <div className="choose-category-block-inner">
                <div className="choose-category-title">
                  Gal-<br/>lery
                </div>
                <div className="choose-category-subtitle title-2">Choose a category</div>
              </div>
            }
            {this.state.selectCat &&
              <div className="choose-category-block-inner">
                <div className="choose-category-name">{this.state.curCatName}</div>
                <img className="choose-category-img" src={API_URL+this.state.curCatImg} />
              </div>
            }
          </div>
          <div className="choose-category-categories">
          {dataCategories && dataCategories.map(function(category){
            return <div key={category.id}  className="choose-category-categories-item" onMouseEnter={()=>this.setState({selectCat: true, curCatName: category.name, curCatImg: category.img})} onMouseLeave={()=>this.setState({selectCat: false, curCatName: null})}  ><SelectCategory id={category.id} name={category.name} thumbnail={category.thumbnail} /></div>;
          }.bind(this))}
          </div>
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

