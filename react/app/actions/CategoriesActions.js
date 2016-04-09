import { CALL_API } from '../middleware/api'
import { config } from '../config.js'

export const FETCH_CATEGORIES_REQUEST = 'FETCH_CATEGORIES_REQUEST'
export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS'
export const FETCH_CATEGORIES_FAILURE = 'FETCH_CATEGORIES_FAILURE'

export const FETCH_CATEGORY_REQUEST = 'FETCH_CATEGORY_REQUEST'
export const FETCH_CATEGORY_SUCCESS = 'FETCH_CATEGORY_SUCCESS'
export const FETCH_CATEGORY_FAILURE = 'FETCH_CATEGORY_FAILURE'
export const CLEAR_CATEGORY = 'CLEAR_CATEGORY'

export const FETCH_NB_GIFS_REQUEST = 'FETCH_NB_GIFS_REQUEST'
export const FETCH_NB_GIFS_SUCCESS = 'FETCH_NB_GIFS_SUCCESS'
export const FETCH_NB_GIFS_FAILURE = 'FETCH_NB_GIFS_FAILURE'

export function fetchCategories() {
  return {
    [CALL_API]: {
      endpoint: 'api/category',
      types: [FETCH_CATEGORIES_REQUEST, FETCH_CATEGORIES_SUCCESS, FETCH_CATEGORIES_FAILURE]
    }
  }
}

export function fetchCategory(id) {
  return {
    [CALL_API]: {
      endpoint: 'api/category/'+id,
      types: [FETCH_CATEGORY_REQUEST, FETCH_CATEGORY_SUCCESS, FETCH_CATEGORY_FAILURE]
    }
  }
}

export function clearCategory(){
  return {
    type: CLEAR_CATEGORY
  }  
}

export function fetchNbGifs() {
  return {
    [CALL_API]: {
      endpoint: 'api/count-gifs',
      types: [FETCH_NB_GIFS_REQUEST, FETCH_NB_GIFS_SUCCESS, FETCH_NB_GIFS_FAILURE]
    }
  }
}