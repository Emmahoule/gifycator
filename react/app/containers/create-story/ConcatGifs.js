import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { readGifsStory } from '../../actions/CreateGifActions.js';
import { concatGifs } from '../../actions/ConcatGifsActions.js';
import GifBox from '../../components/GifBox';
import ReactDOM from 'react-dom';


/* Container ManipulateGif : 
 * 
 * Sous-conteneur qui concataine les gifs 
 * pour en faire une histoire
*/

class ConcatGif extends Component {

  constructor(){
    super();
  }
  componentDidMount(){
    // this.props.dispatch(readGifsStory());
        let form = new FormData();
    {this.props.imgs.map(function(img){
      form.append("gif_"+img.id, img.file);
    })}
        this.props.dispatch(concatGifs(form));

  }
  // componentWillReceiveProps(nextProps){
  //   let form = new FormData();
  //   {nextProps.imgs.map(function(img){
  //     form.append("gif_"+img.id, img.file);
  //   })}
  //   this.props.dispatch(concatGifs(form));
  // }
  render() {
    const { dispatch, imgs } = this.props;
    return (
        <div className="manipulate-gif">
          <div>Concat Gif</div>
        </div>
    )
  }
}

ConcatGif.propTypes = {
  dispatch: PropTypes.func.isRequired,
  imgs: PropTypes.array.isRequired,
  story: PropTypes.string
}

function mapStateToProps(state) {

  const { createGifStory, concatGifStory } = state
  const { imgs } = createGifStory
  const { story } = concatGifStory

  return {
    imgs, story
  }
}

export default connect(mapStateToProps)(ConcatGif)