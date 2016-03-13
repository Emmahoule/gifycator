import React, { Component, PropTypes } from 'react'
import { Link } from "react-router";

import { config } from '../config.js'
const API_URL = config.API_URL;

/* Component GifBoxUrl : 
 * 
 * Box pour uploader un gif via une URL 
*/

export default class GifBoxUrl extends Component {
  constructor(){
    super();
    this.state = {
      url: null,
      fetching: false,
      error: false,
    }
  }

  /* downloadVideo : 
   * - parameter : event 
   * 
   * Récupère la valeur de l'input
   * et lance une requête télécharger l'url 
   * (résultat: url du fichier téléchargé en webm)
  */  
  downloadVideo(e) {
    var url = e.target.value;
    let form = new FormData();
    form.append('url', url);

    this.setState({fetching:true});

    let config = {
      method: 'POST',
      body: form
    }

    fetch(API_URL+'api/download-file', config)
      .then(response =>
        response.text().then(data => ({ data, response }))
            ).then(({ data, response }) =>  {
        if (!response.ok) {
          this.setState({error: true, fetching:false});
          return Promise.reject(data)
        } else {
          this.setState({url:API_URL+data, fetching:false}) 
          this.props.addGifFileToStory(this.state.url);
        }
      })
      //.catch(err => console.log("Error: ", err))

  }

  /* componentWillUnmount : 
   * 
   * Mise à jour de l'état du composant
  */  
  componentWillUnmount(){
    this.setState = {
      url: null,
      fetching: false
    }
  }

  render() {
    return (
      <div className="gif-box-url">

        {this.state.url==null && this.state.fetching==false &&
          <div className="gif-box-inner">
            <div className="gif-box-instructions">
              {this.state.error==true &&
                <div className="error">Sorry, the file couldn't be downloaded</div>
              } 
              <input name="" placeholder="Enter URL" value={this.state.url} onBlur={this.downloadVideo.bind(this)}/>
            </div>
          </div>
        }

        {this.state.fetching==true && 
          <div className="gif-box-gif-container gif-box-loader-container">
            <div className="gif-box-loader"><span></span><span></span><span></span><span></span><span></span></div>
          </div>
        }

        {this.state.url!=null &&
          <div className="gif-box-gif-container">
            <video autoPlay="true" loop="loop" preload="metadata" className="gif-box-gif" src={this.state.url}></video>
          </div>
        }
      </div>
    )
  }
}

GifBoxUrl.propTypes = {
  addGifFileToStory: PropTypes.func.isRequired
}
