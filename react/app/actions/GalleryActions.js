import { CALL_API } from '../middleware/api'
import { config } from '../config.js'

export const FETCH_GIFS_REQUEST = 'FETCH_GIFS_REQUEST'
export const FETCH_GIFS_SUCCESS = 'FETCH_GIFS_SUCCESS'
export const FETCH_GIFS_FAILURE = 'FETCH_GIFS_FAILURE'

export const CLEAR_GIFS= 'CLEAR_GIFS'

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
