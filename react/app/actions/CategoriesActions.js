/* CategoriesActions : 
 * 
 * Actions liées aux catégories
*/

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

export const DELETE_CAT_REQUEST = 'DELETE_CAT_REQUEST'
export const DELETE_CAT_SUCCESS = 'DELETE_CAT_SUCCESS'
export const DELETE_CAT_FAILURE = 'DELETE_CAT_FAILURE'

import { CALL_API } from '../middleware/api'
import { config } from '../config.js'
const API_URL = config.API_URL;


/* Categories Action : 
 * 
 * - types: types d'actions,
 * - endpoint: adresse de l'api,
 * - callback: callback
*/

// Requête pour récupérer la liste des catégories
export function fetchCategories(callback) {
  return {
    [CALL_API]: {
      callback: callback,
      endpoint: 'api/category',
      types: [FETCH_CATEGORIES_REQUEST, FETCH_CATEGORIES_SUCCESS, FETCH_CATEGORIES_FAILURE]
    }
  }
}


// Requête pour récupérer les infos d'une catégories
export function fetchCategory(id) {
  return {
    [CALL_API]: {
      endpoint: 'api/category/'+id,
      types: [FETCH_CATEGORY_REQUEST, FETCH_CATEGORY_SUCCESS, FETCH_CATEGORY_FAILURE]
    }
  }
}

// Action pour vider l'état général de l'application
export function clearCategory(){
  return {
    type: CLEAR_CATEGORY
  }  
}


/* NbGif Action : 
 * 
 * - types: types d'actions,
 * - endpoint: adresse de l'api,
*/

// Action pour récupérer le nombre de gif dans chaque catégorie
export function fetchNbGifs() {
  return {
    [CALL_API]: {
      endpoint: 'api/count-gifs',
      types: [FETCH_NB_GIFS_REQUEST, FETCH_NB_GIFS_SUCCESS, FETCH_NB_GIFS_FAILURE]
    }
  }
}


/* DeleteCat Actions : 
 * 
 * - type: type d'action,
 * - isFetching: true/false - requête en cours,
 * - isAuthenticated: true/false - authentifié,
 * - datasCatSupp - Datas catégorie supprimée
 * - message - Message d'erreur
*/

// Envoie de la requête pour supprimer une catégorie
function requestDeleteCat() {
  return {
    type: DELETE_CAT_REQUEST,
    isFetching: true
  }
}


// Reception de la requête pour supprimer une catégorie
function receiveDeleteCat(datasCatSupp) {
  return {
    type: DELETE_CAT_SUCCESS,
    isFetching: false,
    datasCatSupp
  }
}

// Reception d'une erreur lors de la supression d'une catégorie
function deleteCatError(message) {
  return {
    type: DELETE_CAT_FAILURE,
    isFetching: false,
    message
  }
}

// Requête pour supprimer une catégorie
export function deleteCategory(id, callback) {

  let config = {
    method: 'DELETE',
    headers: { 'Content-Type':'application/x-www-form-urlencoded' },
  }

  return dispatch => {
    dispatch(requestDeleteCat())

    return fetch(API_URL+'api/category/'+id, config)
      .then(response =>
        response.text().then(datas => ({ datas, response }))
            ).then(({ datas, response }) =>  {
        if (!response.ok) {
          dispatch(deleteCatError("Sorry, your category has not been deleted."))
          return Promise.reject(datas)
        } else {
          dispatch(receiveDeleteCat(datas))
          callback();
        }
      }).catch(err => console.log("Error: ", err))
  }
}


/* AddCat Actions : 
 * 
 * - type: type d'action,
 * - isFetching: true/false - requête en cours,
 * - isAuthenticated: true/false - authentifié,
 * - datasCat - Datas catégorie ajoutée
 * - message - Message d'erreur
*/

// Envoie de la requête pour ajouter une catégorie
function requestAddCat() {
  return {
    type: DELETE_CAT_REQUEST,
    isFetching: true
  }
}


// Reception de la requête pour ajouter une catégorie
function receiveAddCat(datasCat) {
  return {
    type: DELETE_CAT_SUCCESS,
    isFetching: false,
    datasCat
  }
}

// Reception d'une erreur lors de l'ajout d'une catégorie
function addCatError(message) {
  return {
    type: DELETE_CAT_FAILURE,
    isFetching: false,
    message
  }
}

// Requête pour ajouter une catégorie
export function addCategory(dataCategory, callback) {

  let config = {
    method: 'POST',
    body: dataCategory
  }

  return dispatch => {
    dispatch(requestAddCat())

    return fetch(API_URL+'api/category', config)
      .then(response =>
        response.text().then(datasCategory => ({ datasCategory, response }))
            ).then(({ datasCategory, response }) =>  {
        if (!response.ok) {
          dispatch(addCatError("Sorry, your category has not been created."))
          return Promise.reject(datasCategory)
        } else {
          dispatch(receiveAddCat(datasCategory))
          callback();
        }
      }).catch(err => console.log("Error: ", err))
  }
}
