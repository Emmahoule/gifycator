import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { addBoxToStory, deleteBoxToStory, removeAllBoxToStory, addGifFileToStory } from '../../actions/CreateGifActions.js';
import GifBox from '../../components/GifBox';
import { Link } from "react-router";

/* Container CreateGif : 
 * 
 * Sous-conteneur contenant les composants
 * pour l'ajout de gif lors de la création d'histoire 
*/

class CreateGif extends Component {
  componentWillUnmount(){
    // this.props.dispatch(removeAllBoxToStory());
  }
  render() {
  	const { dispatch, imgs, complete } = this.props;
    return (
      	<div className="create-gif">
          <div className="create-story-title title-2">Lets create your story !</div>

          {imgs.map(function(img){
            return <GifBox deleteBoxToStory={(id)=>dispatch(deleteBoxToStory(id))} addGifFileToStory={(file)=>dispatch(addGifFileToStory(img.id, file))} id={img.id} key={img.id} />
          })}

          {complete==false &&
          <div className="gif-box gif-box-add" onClick={()=>dispatch(addBoxToStory())}>
            <div className="gif-box-inner gif-box-inner">
              +
            </div>
          </div>
          }

          <div className="clearfix"></div>
          <Link to="create-story/manipulate-gif" className="create-gif-btn btn1">Create my story</Link>
        </div>
    )
  }
}

CreateGif.propTypes = {
  dispatch: PropTypes.func.isRequired,
  imgs: PropTypes.array.isRequired,
  complete: PropTypes.bool.isRequired
}

function mapStateToProps(state) {

  const { createGifStory } = state
  const { imgs, complete } = createGifStory

  return {
    imgs,
    complete
  }
}

export default connect(mapStateToProps)(CreateGif)