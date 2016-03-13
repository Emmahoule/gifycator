import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { readGifsStory } from '../../actions/CreateGifActions.js';
import GifBox from '../../components/GifBox';
import ReactDOM from 'react-dom';


/* Container ManipulateGif : 
 * 
 * Sous-conteneur qui concataine les gifs 
 * pour en faire une histoire
*/

class ManipulateGif extends Component {

  constructor(){
    super();
    this.videoElement = null;
    this.canvas = null;
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
    var video = document.querySelector("#video-to-story");
    console.log(video);
    var video2 = this.videoElement;
    console.log(video2);
  }

    // console.log("mavideo"+video);

//     var cpt = 0;
//     video.src = gifs[cpt];
//     console.log("src"+video.src);
//     video.play();
        
//     video.addEventListener('ended', onVideoFinish.bind(this), false);

//     this.record(video);

//     function onVideoFinish(e) {
//       cpt++;
//       if (cpt == gifs.length){
//         this.stopRecord();
//       } else {
//         video.src = gifs[cpt];
//         video.play();
//         video.addEventListener('ended',onVideoFinish,false);
//         video.controls = true;
//       }
//     }
//   }

//   record(video) {
//     var canvas = document.createElement('canvas');
//     canvas.width = video.width;
//     canvas.height = video.height;
//     var ctx = canvas.getContext('2d');
//     var CANVAS_HEIGHT = canvas.height;
//     var CANVAS_WIDTH = canvas.width;

//     frames = []; 

//     function drawVideoFrame(time) {
//       rafId = requestAnimationFrame(drawVideoFrame.bind(this));
//       ctx.drawImage(video, 0, 0, 400, 400);
//       var url = canvas.toDataURL('image/webp', 1); // image/jpeg is way faster :(
//       frames.push(url);
//     };

//     rafId = requestAnimationFrame(drawVideoFrame.bind(this));
            
//   };


//   stopRecord() {
//     cancelAnimationFrame(this.state.rafId);
//     this.embedVideoPreview();
//   };


//   embedVideoPreview(opt_url) {
//     var url = opt_url || null;
//     var video = $('#video-preview video') || null;
//     var video = document.querySelector("#video-preview");
//     var downloadLink = $('#video-preview a[download]') || null;

//     if (!video) {
//       video = document.createElement('video');
//       video.autoplay = true;
//       video.controls = true;
//       video.loop = true;
//       video.style.width = canvas.width + 'px';
//       video.style.height = canvas.height + 'px';
//       $('#video-preview').appendChild(video);

//       downloadLink = document.createElement('a');
//       downloadLink.download = 'capture.webm';
//       downloadLink.textContent = '[ download video ]';
//       downloadLink.title = 'Download your .webm video';
//       var p = document.createElement('p');
//       p.appendChild(downloadLink);
//       $('#video-preview').appendChild(p);

//     } else {
//       window.URL.revokeObjectURL(video.src);
//     }
//     if (!url) {
//       var webmBlob = Whammy.fromImageArray(frames, 50);
//       url = window.URL.createObjectURL(webmBlob);
//     }
//     video.src = url;
//     downloadLink.href = url;
// }



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

  render() {
    // console.log(document.getElementById("video-to-story"));
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

  const { createGifStory } = state
  const { imgs } = createGifStory

  return {
    imgs
  }
}

export default connect(mapStateToProps)(ManipulateGif)