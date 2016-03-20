import { CALL_API } from '../middleware/api'
import { config } from '../config.js'

export const FETCH_CATEGORIES_REQUEST = 'FETCH_CATEGORIES_REQUEST'
export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS'
export const FETCH_CATEGORIES_FAILURE = 'FETCH_CATEGORIES_FAILURE'

export function fetchCategories() {
  return {
    [CALL_API]: {
      endpoint: 'api/category',
      types: [FETCH_CATEGORIES_REQUEST, FETCH_CATEGORIES_SUCCESS, FETCH_CATEGORIES_FAILURE]
    }
  }
}