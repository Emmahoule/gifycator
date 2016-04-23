import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import ConcatGif from '../../components/ConcatGif';
import SaveGif from '../../components/SaveGif';
import { clearStory } from '../../actions/CreateGifActions.js';
import ReactDOM from 'react-dom';

import { config } from '../../config.js'
const API_URL = config.API_URL;


/* Container CreateGif : 
 * 
 * Sous-conteneur contenant les composants pour concaténer les gifs,
 * et les composants pour enregistrer une histoire dans la BDD
*/
class CreateGif extends Component {

  constructor(){
    super();
  }

  /* ComponentWillMount : 
   * 
   * Si il n'y a pas de requête en cours
   * dispatch d'une action permettant de vider l'histoire
  */
  componentWillUnmount(){
    if (!this.props.isFetching) {
      this.props.dispatch(clearStory());
    }
  }

  render() {
    const { dispatch, imgs, story, dataCategories, history } = this.props;
    return (
        <div className="create-gif">
          {!story &&
            <ConcatGif 
              dispatch={dispatch} 
              imgs={imgs} 
            />
          }
          {story &&
            <SaveGif 
              history={history}
              story={story} 
              dispatch={dispatch}
              dataCategories={dataCategories}
            />
          }
        </div>
    )
  }
}

// Déclaration du types des props
CreateGif.propTypes = {
  dispatch: PropTypes.func.isRequired,
  imgs: PropTypes.array.isRequired,
  story: PropTypes.string,
  dataCategories: PropTypes.array
}

// Connection au store Redux
function mapStateToProps(state) {

  const { composeGifStory, concatGifStory, saveGifStory, fetchCategories } = state
  const { imgs } = composeGifStory
  const { story, isFetching } = concatGifStory
  const { dataCategories } = fetchCategories

  return {
    imgs, story, dataCategories, isFetching
  }
}

export default connect(mapStateToProps)(CreateGif)