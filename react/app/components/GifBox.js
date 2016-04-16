import React, { Component, PropTypes } from 'react'
import { Link } from "react-router";
import GifBoxUpload from "./GifBoxUpload";
import GifBoxUrl from "./GifBoxUrl";
import GifBoxCamera from "./GifBoxCamera";

/*  Component GifBox : 
 *
 *  Box pour ajouter un gif
*/
export default class GifBox extends Component {
  constructor(){
    super();
    this.state = {
      typeUpload: null
    }
  }

  render() {
  	const { deleteBoxToStory, addGifFileToStory, id} = this.props; 
    return (
      <div className="gif-box">
        <div className="gif-box-delete" onClick={(e)=>deleteBoxToStory(id)}></div>

        {this.state.typeUpload==null &&
        <div className="gif-box-inner">
          <div className="gif-box-inner-btn" onClick={()=>this.setState({typeUpload:"upload"})}>
        		<svg className="icon icon-upload gif-box-inner-btn-icon">
		        	<use xlinkHref="#icon-upload"></use>
		        </svg>
        	</div>
        	<div className="gif-box-inner-btn" onClick={()=>this.setState({typeUpload:"url"})}>
        		<div className="gif-box-inner-btn-txt">
		        	URL
		        </div>
		      </div>
        	<div className="gif-box-inner-btn" onClick={()=>this.setState({typeUpload:"camera"})}>
        		<svg className="icon icon-camera gif-box-inner-btn-icon">
		        	<use xlinkHref="#icon-camera"></use>
		        </svg>
        	</div>
        </div>
        }

        {this.state.typeUpload=="upload" &&
          <GifBoxUpload addGifFileToStory={addGifFileToStory}/>
        }

        {this.state.typeUpload=="url" &&
          <GifBoxUrl addGifFileToStory={addGifFileToStory}/>
        }

        {this.state.typeUpload=="camera" &&
          <GifBoxCamera addGifFileToStory={addGifFileToStory}/>
        }

        {this.state.typeUpload!=null &&
          <div className="gif-box-bottom">
            <div className="gif-box-bottom-left">
              <div className="gif-box-bottom-btn" onClick={()=>this.setState({typeUpload:null})}>
                <svg className="icon icon-edit gif-box-bottom-btn-icon">
                  <use xlinkHref="#icon-edit"></use>
                </svg>
              </div>
            </div>
            <div className="gif-box-bottom-right">
              <div className="gif-box-bottom-btn" onClick={()=>this.setState({typeUpload:"upload"})}>
                <svg className="icon icon-upload gif-box-bottom-btn-icon">
                  <use xlinkHref="#icon-upload"></use>
                </svg>
              </div>
              <div className="gif-box-bottom-btn" onClick={()=>this.setState({typeUpload:"url"})}>
                <div className="gif-box-bottom-btn-txt">
                  URL
                </div>
              </div>
              <div className="gif-box-bottom-btn" onClick={()=>this.setState({typeUpload:"camera"})}>
                <svg className="icon icon-camera gif-box-bottom-btn-icon">
                  <use xlinkHref="#icon-camera"></use>
                </svg>
              </div>
            </div>
          </div>
        }

      </div>
    )
  }
}

GifBox.propTypes = {
  deleteBoxToStory: PropTypes.func.isRequired,
  addGifFileToStory: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired
}
