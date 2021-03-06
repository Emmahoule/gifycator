/* AuthActions : 
 * 
 * Actions d'authentification
*/

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE'

import { config } from '../config.js'
const API_URL = config.API_URL;


/* Login Actions : 
 * 
 * - type: type d'action,
 * - isFetching: true/false - requête en cours,
 * - isAuthenticated: true/false - authentifié,
 * - creds - Données d'authentification
 * - message - Message d'erreur
*/

// Envoie de la requête pour se connecter
function requestLogin(creds) {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds
  }
}

// Réception de la requête pour se connecter
function receiveLogin(user) {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true
  }
}

// Erreur survenue de la requête pour se connecter
function loginError(message) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  }
}

// Requête pour se connecter
export function loginUser(creds, history) {

  let config = {
    method: 'POST',
    headers: { 'Content-Type':'application/x-www-form-urlencoded' },
    body: `email=${creds.email}&password=${creds.password}`
  }

  return dispatch => {
    dispatch(requestLogin(creds))
    return fetch(API_URL+'api/auth', config)
      .then(response =>
        response.json().then(user => ({ user, response }))
            ).then(({ user, response }) =>  {
        if (!response.ok) {
          dispatch(loginError("Sorry, email or password incorrect"))
          return Promise.reject(user)
        } else {
          localStorage.setItem('id_token', user.token)
          dispatch(receiveLogin(user))
          history.push('admin/categories');
        }
      }).catch(err => console.log("Error: ", err))
  }
}


/* Logout Actions : 
 * 
 * - type: type d'action,
 * - isFetching: true/false - requête en cours,
 * - isAuthenticated: true/false - authentifié,
*/

// Envoie de la requête pour la déconnexion
function requestLogout() {
  return {
    type: LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true
  }
}

// Réception de la requête pour la déconnexion
function receiveLogout() {
  return {
    type: LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false
  }
}

// Actions pour la déconnexion
export function logoutUser(history) {
  return dispatch => {
    dispatch(requestLogout())
    localStorage.removeItem('id_token')
    dispatch(receiveLogout())
    return history.push('/');
  } 
}


