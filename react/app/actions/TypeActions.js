export const TYPE_REQUEST = 'TYPE_REQUEST'
export const TYPE_SUCCESS = 'TYPE_SUCCESS'
export const TYPE_FAILURE = 'TYPE_FAILURE'

import { config } from '../config.js'
const API_URL = config.API_URL;

function requestType(creds) {
  return {
    type: TYPE_REQUEST,
    isFetching: true,
    creds
  }
}

function receiveType(user) {
  return {
    type: TYPE_SUCCESS,
    isFetching: false
  }
}

function typeError(message) {
  return {
    type: TYPE_FAILURE,
    isFetching: false,
    message
  }
}

export function typeUser(creds) {

  let config = {
    method: 'POST',
    headers: { 'Content-Type':'application/x-www-form-urlencoded' },
    body: `username=${creds.email}`
  }

  return dispatch => {
    dispatch(requestType(creds))

    return fetch(API_URL+'/api-adress/', config)
      .then(response =>
        response.json().then(user => ({ user, response }))
            ).then(({ user, response }) =>  {
        if (!response.ok) {
          dispatch(typeError("Désolé, message d'erreur"))
          return Promise.reject(user)
        } else {
          dispatch(receiveType(user))
        }
      }).catch(err => console.log("Error: ", err))
  }
}
