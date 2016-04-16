import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { readGifsStory } from '../../actions/ComposeGifActions.js';
import GifBox from '../../components/GifBox';
import ReactDOM from 'react-dom';


/* Container ManipulateGif :
 * => (Essais avec Canvas, mais trop lent, solution abandonnée)
 * 
 * Sous-conteneur qui concataine les gifs 
 * pour en faire une histoire. 
*/
class ManipulateGif extends Component {

  constructor(){
    super();

    this.videoElement = null;
    this.video = null;
    this.canvas = null;
    this.frames = [];
    this.rafId = null

    this.state = { 
      video: ""
    };
  }

  componentDidMount(){
    this.props.dispatch(readGifsStory());
    this.runGifs();
  }

  /* runGifs : 
   * 
   * Lance les gifs les uns à la suite des autres
  */
  runGifs(){
    var gifs = this.filesToArray();
    this.video = this.videoElement;

    var cpt = 0;
    this.video.src = gifs[cpt];
    console.log("src"+this.video.src);
    this.video.play();
        
    this.video.addEventListener('ended', onVideoFinish.bind(this), false);

    this.record();

    function onVideoFinish(e) {
      cpt++;
          console.log(cpt)
          console.log(gifs.length);

      if (cpt >= gifs.length){
        this.stopRecord();
      } else {
        this.video.src = gifs[cpt];
        this.video.play();
        this.video.addEventListener('ended',onVideoFinish.bind(this),false);
        this.video.controls = true;
      }
    }
  }

  /* filesToArray : 
   * 
   * Crée un tableau de gifs 
   * à partir de la prop imgs
  */
  filesToArray(){
    var tabFiles = [];
    this.props.imgs.map(function(img){
      tabFiles.push(img.file);
    });
    return tabFiles;
  }

  record() {
    this.canvas = document.createElement('canvas');
    this.canvas.width = this.video.width;
    this.canvas.height = this.video.height;
    var ctx = this.canvas.getContext('2d');
    var CANVAS_HEIGHT = this.canvas.height;
    var CANVAS_WIDTH = this.canvas.width;

    this.frames = []; 

    function drawVideoFrame(time) {
      exports.requestAnimationFrame = exports.requestAnimationFrame ||
      exports.webkitRequestAnimationFrame || exports.mozRequestAnimationFrame ||
      exports.msRequestAnimationFrame || exports.oRequestAnimationFrame;

      this.rafId = requestAnimationFrame(drawVideoFrame.bind(this));
      ctx.drawImage(this.video, 0, 0, 400, 400);
      var url = this.canvas.toDataURL('image/webp', 1);
      this.frames.push(url);
    };

    this.rafId = requestAnimationFrame(drawVideoFrame.bind(this));
            
  };

  /* stopRecord : 
   * 
   * Stop l'enregistrement
  */
  stopRecord() {
    exports.cancelAnimationFrame = exports.cancelAnimationFrame ||
    exports.webkitCancelAnimationFrame || exports.mozCancelAnimationFrame ||
    exports.msCancelAnimationFrame || exports.oCancelAnimationFrame;

    cancelAnimationFrame(this.rafId);
    this.embedVideoPreview();
  };


  /* embedVideoPreview : 
   * 
   * Création du preview de la video
  */
  embedVideoPreview(opt_url) {
    var url = opt_url || null;
    var video = document.querySelector('#video-preview video') || null;
    var video = document.querySelector("#video-preview");
    var downloadLink = document.querySelector('#video-preview a[download]') || null;

    if (!video) {
      video = document.createElement('video');
      video.autoplay = true;
      video.controls = true;
      video.loop = true;
      video.style.width = this.canvas.width + 'px';
      video.style.height = this.canvas.height + 'px';
      document.querySelector('#video-preview').appendChild(video);

      downloadLink = document.createElement('a');
      downloadLink.download = 'capture.webm';
      downloadLink.textContent = '[ download video ]';
      downloadLink.title = 'Download your .webm video';
      var p = document.createElement('p');
      p.appendChild(downloadLink);
      document.querySelector('#video-preview').appendChild(p);

    } else {
      window.URL.revokeObjectURL(video.src);
    }
    if (!url) {
      var webmBlob = Whammy.fromImageArray(this.frames, 60);
      url = window.URL.createObjectURL(webmBlob);
    }
    video.src = url;
  }

  render() {
    const { dispatch, imgs } = this.props;
    return (
        <div className="manipulate-gif">
          <div>Manipulate Gif</div>
          <video id="video-to-story" ref={element => {this.videoElement = element}} width="400" height="400" autoPlay ></video>
          <video id="video-preview" width="400" height="400" autoPlay ></video>
        </div>
    )
  }
}

ManipulateGif.propTypes = {
  dispatch: PropTypes.func.isRequired,
  imgs: PropTypes.array.isRequired
}

function mapStateToProps(state) {

  const { ComposeGifStory } = state
  const { imgs } = ComposeGifStory

  return {
    imgs
  }
}

export default connect(mapStateToProps)(ManipulateGif)