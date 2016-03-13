import { config } from '../config.js'
const API_URL = config.API_URL;

export const CONCAT_GIFS_REQUEST = 'CONCAT_GIFS_REQUEST'
export const CONCAT_GIFS_SUCCESS = 'CONCAT_GIFS_SUCCESS'
export const CONCAT_GIFS_FAILURE = 'CONCAT_GIFS_FAILURE'

// Envoie de la requête pour créer l'histoire
function requestConcatGifs() {
  return {
    type: CONCAT_GIFS_REQUEST,
    isFetching: true
  }
}

// Reception de la requête pour créer l'histoire
function receiveConcatGifs(story) {
  return {
    type: CONCAT_GIFS_SUCCESS,
    isFetching: false,
    story
  }
}

// Reception d'une erreur
function concatGifsError(message) {
  return {
    type: CONCAT_GIFS_FAILURE,
    isFetching: false,
    message
  }
}

export function concatGifs(imgs) {

  let config = {
    method: 'POST',
    body: imgs
  }

  return dispatch => {
    dispatch(requestConcatGifs(imgs))

    return fetch(API_URL+'api/create-story', config)
      .then(response =>
        response.text().then(story => ({ story, response }))
            ).then(({ story, response }) =>  {
        if (!response.ok) {
          dispatch(concatGifsError("Désolé, message d'erreur"))
          return Promise.reject(story)
        } else {
          dispatch(receiveConcatGifs(story))
        }
      }).catch(err => console.log("Error: ", err))
  }
}


