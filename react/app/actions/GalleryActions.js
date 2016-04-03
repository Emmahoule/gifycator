import { CALL_API } from '../middleware/api'
import { config } from '../config.js'

export const FETCH_GIFS_REQUEST = 'FETCH_GIFS_REQUEST'
export const FETCH_GIFS_SUCCESS = 'FETCH_GIFS_SUCCESS'
export const FETCH_GIFS_FAILURE = 'FETCH_GIFS_FAILURE'

export const FETCH_GIF_REQUEST = 'FETCH_GIF_REQUEST'
export const FETCH_GIF_SUCCESS = 'FETCH_GIF_SUCCESS'
export const FETCH_GIF_FAILURE = 'FETCH_GIF_FAILURE'

export const CLEAR_GIFS= 'CLEAR_GIFS'
export const CLEAR_GIF= 'CLEAR_GIF'

export function fetchGifs(id) {
  return {
    [CALL_API]: {
      endpoint: 'api/gifs/'+id,
      types: [FETCH_GIFS_REQUEST, FETCH_GIFS_SUCCESS, FETCH_GIFS_FAILURE]
    }
  }
}

export function clearGifs(){
  return {
    type: CLEAR_GIFS
  }
}


export function fetchGif(id) {
  return {
    [CALL_API]: {
      endpoint: 'api/gif/'+id,
      types: [FETCH_GIF_REQUEST, FETCH_GIF_SUCCESS, FETCH_GIF_FAILURE]
    }
  }
}

export function clearGif(){
  return {
    type: CLEAR_GIF
  }
}
