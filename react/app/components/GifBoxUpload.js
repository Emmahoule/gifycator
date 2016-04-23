import React, { Component, PropTypes } from 'react'
import { Link } from "react-router";
import Dropzone from "react-dropzone";

import { config } from '../config.js'
const API_URL = config.API_URL;


/* Component GifBoxUpload :
 * 
 * Box pour uploader via son ordinateur un gif 
 *
 * States :
 * - image: preview du fichier uploadé
 * - file: fichier uploadé
 * - toWebm: fichier uploadé en .webm
 * - fetching: true/false - requête en cours
*/
export default class GifBoxUpload extends Component {
  constructor(){
    super();
    this.state = {
      image: null,
      file: null,
      toWebm: null,
      fetching: false
    }
  }

  /* onDrop : 
   * - parameter : file 
   * 
   * Prend un fichier en paramètre, 
   * si c'est un gif, on le convertit en webm
   * sinon, on met à jour l'état du composant
  */
  onDrop(files) {
    if (files[0].type=="image/gif"){
      let form = new FormData();
      form.append('gif', files[0]);
      this.toWebm(form);
    }
    else {
      this.setState({
        image: files[0].preview,
        file: files[0]
      });
      this.props.addGifFileToStory(files[0]);
    }
  }

  /* toWebm : 
   * - parameter : gif 
   * 
   * Prend un gif (sous forme de formData) 
   * et le convertit en webm
  */  
  toWebm(gif){
    this.setState({fetching:true});

    let config = {
      method: 'POST',
      body: gif
    }

    fetch(API_URL+'api/to-webm', config)
      .then(response =>
        response.text().then(data => ({ data, response }))
            ).then(({ data, response }) =>  {
        if (!response.ok) {
          return Promise.reject(data)
        } else {
          this.setState({toWebm:API_URL+data, fetching:false});
          this.props.addGifFileToStory(data);
        }
      })
      //.catch(err => console.log("Error: ", err))
  }

  render() {
    return (
      <div className="gif-box-upload">

        {this.state.image==null && this.state.fetching==false &&
        <Dropzone onDrop={this.onDrop.bind(this)} multiple={false} accept="image/gif,video/webm" className="gif-box-upload-dropzone">
          <div className="gif-box-inner">
            <div className="gif-box-instructions">
              Drag&drop a file
              or click to upload a gif
            </div>
          </div>
        </Dropzone>
        }

        {this.state.fetching==true && 
          <div className="gif-box-gif-container gif-box-loader-container">
            <div className="gif-box-loader"><span></span><span></span><span></span><span></span><span></span></div>
          </div>
        }

        {this.state.toWebm &&
          <div className="gif-box-gif-container">
            <video autoPlay="true" loop="loop" preload="metadata" className="gif-box-gif" src={this.state.toWebm}></video>
          </div>
        }

        {this.state.image!=null && this.state.file.type=="video/webm" &&
          <div className="gif-box-gif-container">
            <video autoPlay="true" loop="loop" preload="metadata" className="gif-box-gif" src={this.state.image}></video>
          </div>
        }

      </div>
    )
  }
}

// Déclaration du types des props
GifBoxUpload.propTypes = {
  addGifFileToStory: PropTypes.func.isRequired
}
