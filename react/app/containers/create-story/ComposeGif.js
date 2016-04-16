import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { addBoxToStory, deleteBoxToStory, removeAllBoxToStory, addGifFileToStory } from '../../actions/ComposeGifActions.js';
import GifBox from '../../components/GifBox';
import { Link } from "react-router";

/* Container ComposeGif : 
 * 
 * Sous-conteneur contenant les composants
 * pour l'ajout de gif lors de la création d'histoire 
*/

class ComposeGif extends Component {

  /* ComponentWillMount : 
   * 
   * Remise à 0 des box pour crééer l'histoire
  */
  componentWillMount(){
    if (this.props.isFetching) {
      this.props.history.push("/");
    }
    this.props.dispatch(removeAllBoxToStory());
  }

  render() {
  	const { dispatch, imgs, complete, files } = this.props;
    return (
      	<div className="compose-gif">
          <div className="create-story-title title-2">Let's create your story !</div>
          <div className="compose-gif-block a-middle">
            {imgs.map(function(img){
              return <GifBox deleteBoxToStory={(id)=>dispatch(deleteBoxToStory(id))} addGifFileToStory={(file)=>dispatch(addGifFileToStory(img.id, file))} id={img.id} key={img.id} />
            })}

            {complete==false &&
            <div className="gif-box gif-box-add" onClick={()=>dispatch(addBoxToStory())}>
              <div className="gif-box-add-inner">
                <span className="gif-box-add-inner-icn">+</span> Add box
              </div>
            </div>
            }

            <div className="clearfix"></div>
            {files>=2 &&
              <Link to="create-story/create-gif" className="compose-gif-btn btn1">Create my story</Link>
          }
          </div>
        </div>
    )
  }
}

ComposeGif.propTypes = {
  dispatch: PropTypes.func.isRequired,
  imgs: PropTypes.array.isRequired,
  files: PropTypes.number.isRequired,
  complete: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool
}

function mapStateToProps(state) {

  const { composeGifStory, concatGifStory } = state;
  const { imgs, complete, files } = composeGifStory;
  const { isFetching } = concatGifStory;

  return {
    imgs,
    complete,
    files,
    isFetching
  }
}

export default connect(mapStateToProps)(ComposeGif)