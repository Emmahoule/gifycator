import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from "react-router";
import { fetchGifs, clearGifs } from '../../actions/GalleryActions.js';
import { fetchCategory } from '../../actions/CategoriesActions.js';
import ItemGallery from '../../components/ItemGallery.js';
import LazyLoad from 'react-lazy-load';

import { config } from '../../config.js'
const API_URL = config.API_URL;

/* Container CategoryGallery : 
 * 
*/

class CategoryGallery extends Component {
  constructor(){
    super();
    this.state = {
      currentGif : -1,
      nextGif : 0,
      prevGif : -2
    }
    this.lg = 0;
    console.log("construction");
  }

  componentWillMount(){
    this.props.dispatch(fetchGifs(this.props.params.id));
    this.props.dispatch(fetchCategory(this.props.params.id));
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.gifs) {
      this.lg = nextProps.gifs.length;
    }
  }

  componentWillUnmount(){
    this.props.dispatch(clearGifs());
  }

  prevStates(){
    if (this.state.currentGif>0) {
      this.props.history.push('gallery/'+this.props.params.id[0]+'/'+this.props.gifs[this.state.prevGif].id);
      this.setState({
        currentGif : this.state.currentGif-1,
        nextGif : this.state.currentGif,
        prevGif : this.state.currentGif-2
      });   
    } else {
      this.setState({
        currentGif : -1,
        nextGif : 0,
        prevGif : -2
      });      
    }
  }  

  nextStates(){
    if (this.state.currentGif<=this.lg) {
      this.props.history.push('gallery/'+this.props.params.id[0]+'/'+this.props.gifs[this.state.nextGif].id);
      this.setState({
        currentGif : this.state.currentGif+1,
        nextGif : this.state.currentGif+2,
        prevGif : this.state.currentGif
      });    
    }
  }       


  render() {
    const { gifs, dataCategory } = this.props;
    const categoryId = this.props.params.id[0];
    console.log(this.state);
    return (
        <div className="category-gallery">
          {dataCategory && 
          <div className="category-gallery-block">
            <div className="category-gallery-block-square"></div>
            {this.state.currentGif<0 &&
              <div>
                <div className="category-gallery-block-category">{dataCategory.name}</div>
                <img className="category-gallery-block-img" src={API_URL+dataCategory.img} />
              </div>
            }
            {this.state.currentGif>=0 &&
              this.props.children
            }
          </div>
          }
          {gifs &&
            <div><br/><br/><br/><br/>
            {this.state.prevGif>=-1 &&
              <div onClick={this.prevStates.bind(this)} >Prev</div>
            }
            {this.state.nextGif<this.lg &&
              <div onClick={this.nextStates.bind(this)} >Next</div>
            }
            </div>
          }
        </div>
    )
  }
}


            // <Link to={'gallery/'+categoryId+'/'+gifs[this.state.prevGif].id} onClick={this.prevStates.bind(this)} >Prev{this.state.prevGif}</Link>
            // <Link  to={'gallery/'+categoryId+'/'+gifs[this.state.nextGif].id} onClick={this.nextStates.bind(this)} >Next{this.state.nextGif}</Link>

          // <div className="category-gallery-block">
          //   <div className="category-gallery-block-square"></div>
          //   <div className="category-gallery-block-category">{dataCategory.name}</div>
          //   <img className="category-gallery-block-img" src={API_URL+dataCategory.img} />
          // </div>
          // {gifs && gifs.map(function(gif){
          //   return <LazyLoad key={gif.id} height={400} offsetVertical={300}><ItemGallery id={gif.id} title={gif.title} author={gif.author} url={gif.url} cover={gif.cover}/></LazyLoad>
          // })}

// CategoryGallery.propTypes = {
//   dispatch: PropTypes.func.isRequired,
//   dataCategories: PropTypes.array
// }

function mapStateToProps(state) {

  const { fetchGifs, fetchCategory } = state;
  const { gifs } = fetchGifs;
  const { dataCategory } = fetchCategory;

  return {
    gifs,
    dataCategory
  }
}

export default connect(mapStateToProps)(CategoryGallery)

