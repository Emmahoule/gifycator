import { CALL_API } from '../middleware/api'
import { config } from '../config.js'
const API_URL = config.API_URL;

export const FETCH_GIFS_REQUEST = 'FETCH_GIFS_REQUEST'
export const FETCH_GIFS_SUCCESS = 'FETCH_GIFS_SUCCESS'
export const FETCH_GIFS_FAILURE = 'FETCH_GIFS_FAILURE'

export const FETCH_GIF_REQUEST = 'FETCH_GIF_REQUEST'
export const FETCH_GIF_SUCCESS = 'FETCH_GIF_SUCCESS'
export const FETCH_GIF_FAILURE = 'FETCH_GIF_FAILURE'

export const DELETE_GIF_REQUEST = 'DELETE_GIF_REQUEST'
export const DELETE_GIF_SUCCESS = 'DELETE_GIF_SUCCESS'
export const DELETE_GIF_FAILURE = 'DELETE_GIF_FAILURE'

export const CLEAR_GIFS= 'CLEAR_GIFS'
export const CLEAR_GIF= 'CLEAR_GIF'

// Envoie de la requête pour récupérer les gifs en fonction de l'id d'une catégorie
export function fetchGifs(id) {
  return {
    [CALL_API]: {
      endpoint: 'api/gifs/'+id,
      types: [FETCH_GIFS_REQUEST, FETCH_GIFS_SUCCESS, FETCH_GIFS_FAILURE]
    }
  }
}

// Envoie de la requête pour vider les gifs courrants
export function clearGifs(){
  return {
    type: CLEAR_GIFS
  }
}

// Envoie de la requête pour récupérer un gif depuis son id
export function fetchGif(id) {
  return {
    [CALL_API]: {
      endpoint: 'api/gif/'+id,
      types: [FETCH_GIF_REQUEST, FETCH_GIF_SUCCESS, FETCH_GIF_FAILURE]
    }
  }
}

// Envoie de la requête pour vider le gif courrant
export function clearGif(){
  return {
    type: CLEAR_GIF
  }
}


// Envoie de la requête pour supprimer une story
function requestDeleteGif() {
  return {
    type: DELETE_GIF_REQUEST,
    isFetching: true
  }
}


// Reception de la requête pour supprimer une story
function receiveDeleteGif(datasGifSupp) {
  return {
    type: DELETE_GIF_SUCCESS,
    isFetching: false,
    datasGifSupp
  }
}

// Reception d'une erreur lors de la supression d'une story
function deleteGifError(message) {
  return {
    type: DELETE_GIF_FAILURE,
    isFetching: false,
    message
  }
}

// Requête pour supprimer une story
export function deleteGif(id, history) {

  let config = {
    method: 'DELETE',
    headers: { 'Content-Type':'application/x-www-form-urlencoded' },
  }

  return dispatch => {
    dispatch(requestDeleteGif())

    return fetch(API_URL+'api/gif/'+id, config)
      .then(response =>
        response.text().then(datas => ({ datas, response }))
            ).then(({ datas, response }) =>  {
        if (!response.ok) {
          dispatch(deleteGifError("Sorry, your story has not been deleted."))
          return Promise.reject(datas)
        } else {
          dispatch(receiveDeleteGif(datas))
          history.push('gallery');
        }
      }).catch(err => console.log("Error: ", err))
  }
}
