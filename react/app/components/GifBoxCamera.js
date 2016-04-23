import React, { Component, PropTypes } from 'react'
import { Link } from "react-router";
import $ from 'jquery';
import ReactDOM from 'react-dom';

/* Component GifBoxCamera : 
 *
 * Box pour enregistrer une vidéo avec sa camera
 *
 * States :
 * - camera: preview de la camera
 * - recording: true/false - enregistrement en cours
 * - frames: tableau de frames
 * - video: video enregistrée
*/
export default class GifBoxCamera extends Component {
  
  constructor(){
    super();
    this.state = {
      camera: null,
      recording: false, 
      frames:[],
      video: null
    }
  }

  /* ComponentWillMount : 
   * 
   * Démarre la caméra
  */
  componentWillMount(){
    this.startCamera();
  }

  /* componentWillUnmount : 
   * 
   * Stop la caméra,
   * et met dans l'état du composant à jour
  */
  componentWillUnmount(){
    this.stopCamera();
    this.setState({      
      camera: null,
      recording: false, 
      frames:[],
      video: null
    });
  }

  /* stopCamera : 
   * 
   * Stop la caméra
  */  
  stopCamera(){
    this.state.stream.getVideoTracks()[0].stop();
  }

  /* startCamera : 
   * 
   * Démarrer la caméra, initialise le canvas
   * qui permettra l'enregistrement frame par frame, 
   * et met l'état du composant à jour
  */ 
  startCamera(){
    navigator.getUserMedia = navigator.getUserMedia ||
    navigator.webkitGetUserMedia || navigator.mozGetUserMedia ||
    navigator.msGetUserMedia || navigator.mediaDevices.getUserMedia;
    var video = $('#video-camera');
    var canvas = document.createElement('canvas'); 
    video.controls = false;
    var stream;

    // Remise à 0 de l'état du composant
    this.setState({      
        camera: null,
        recording: false, 
        frames:[],
        video: null,
        noWebcam: false
      }
    );

    // Initialisation de la video
    var finishVideoSetup = function() {
      setTimeout(function() {
        video.width = 180;
        video.height = 180;
        canvas.width = video.width;
        canvas.height = video.height;
      }, 1000);
    };
      
    // Démarrage de la camera
    navigator.getUserMedia({video: true, audio: false}, (stream) => {
      stream = stream;
        this.setState({
          camera: window.URL.createObjectURL(stream),
          stream: stream
      });
      finishVideoSetup();
    }, function(e) {
      this.setState({
          noWebcam: true
      });
    });
  }

  /* record : 
   * 
   * Enregistrement de chaque frame de la video (jouée dans un canvas) en image webp,
   * et mise à jour de l'état du composant 
  */   
  record(){
    exports.cancelAnimationFrame = exports.cancelAnimationFrame ||
    exports.webkitCancelAnimationFrame || exports.mozCancelAnimationFrame ||
    exports.msCancelAnimationFrame || exports.oCancelAnimationFrame;
    var video = ReactDOM.findDOMNode(this.refs.videoCamera);
    var canvas = document.createElement('canvas'); // offscreen canvas.
    var rafId = null;
    var ctx = canvas.getContext('2d');
    video.width = 180;
    video.height = 135;
    canvas.width = video.width;
    canvas.height = video.height;
    var CANVAS_HEIGHT = canvas.height;
    var CANVAS_WIDTH = canvas.width;

    // Si l'enregistrement n'est pas déjà en cours : lancement de l'enregistrement
    if (this.state.recording == false){

      // Mise à jour de l'état du composant
      this.setState({recording: true});

      // Récupération frame par frame de l'enregistrement
      function drawVideoFrame(time) {
        if (this.state.recording == true) {
          rafId = requestAnimationFrame(drawVideoFrame.bind(this));
          ctx.drawImage(video, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
          var url = canvas.toDataURL('image/webp', 1);
          var frames = this.state.frames.slice()
          frames.push(url)
          this.setState({ frames: frames })
        }
      };
      rafId = requestAnimationFrame(drawVideoFrame.bind(this));
    
    // Sinon : récupération de l'enregistrement, stop de la camera et affichage de la vidéo
    } else {
      this.setState({recording: false});
      cancelAnimationFrame(rafId);
      this.stopCamera();
      this.embedVideoPreview(canvas, this.state.frames);
    }
  }

  /* embedVideoPreview : 
   * - parameters : canvas, frames
   * 
   * Récupération de l'enregistrement,
   * puis conversion en .webm avec le plugin Whammy.js.
   * Ensuite, mise à jour de l'état du composant
  */   
  embedVideoPreview(canvas, frames) {
    var video = $('#video-preview video') || null;

    if (!video) {
      video = document.createElement('video');
      video.autoplay = true;
      video.controls = true;
      video.loop = true;
      video.style.width = canvas.width + 'px';
      video.style.height = canvas.height + 'px';
      $('#video-preview').appendChild(video);      
    } else {
      window.URL.revokeObjectURL(video.src);
    }
    var webmBlob = Whammy.fromImageArray(frames, 50);
    var url = window.URL.createObjectURL(webmBlob);
    video.src = url;
    this.setState({video: url});
    this.props.addGifFileToStory(this.blobToFile(webmBlob, "camera_record_"+this.props.id+".webm"));
  }

  /* embedVideoPreview : 
   * - parameters : blob, nom du fichier
   * 
   * Conversion d'un blob en file
  */   
  blobToFile(theBlob, fileName){
    theBlob.lastModifiedDate = new Date();
    theBlob.name = fileName;
    return theBlob;
  }

  render() {
    return (
      <div className="gif-box-camera">
      
      {this.state.video==null &&
        <div className="gif-box-gif-container">
          <video ref="videoCamera" className="gif-box-gif" src={this.state.camera} autoPlay></video>
          <div className={"gif-box-camera-btn gif-box-camera-record-btn "+ (this.state.recording==true?"record":"")} onClick={this.record.bind(this)}></div>
        </div>
      }
      {this.state.noWebcam &&
        <div className="gif-box-camera-no-camera">No webcam was found.</div>
      }
      {this.state.video!=null &&
        <div className="gif-box-gif-container">
          <video ref="videoCamera" loop="true" className="gif-box-gif" src={this.state.video} autoPlay></video>
          <div className="gif-box-camera-btn gif-box-camera-restart-btn" onClick={this.startCamera.bind(this)}>
            <svg className="icon icon-restart gif-box-inner-btn-icon">
              <use xlinkHref="#icon-restart"></use>
            </svg>
          </div>
        </div>
      }
      </div>
    )
  }
}

// Déclaration du types des props
GifBoxCamera.propTypes = {
  addGifFileToStory: PropTypes.func.isRequired
}