import { config } from "../config.js";

const API_URL = config.API_URL

function callApi(endpoint) {

  return fetch(API_URL + endpoint, config)
    .then(response => 
      response.json().then(text => ({ text, response }))
    ).then(({ text, response }) => {
      if (!response.ok) {
        return Promise.reject(text)
      }
      
      return text
    }).catch(err => console.log(err))
}

export const CALL_API = Symbol('Call API')

export default store => next => action => {

  const callAPI = action[CALL_API]

  if (typeof callAPI === 'undefined') {
    return next(action)
  }

  let { endpoint, types, authenticated } = callAPI

  const [ requestType, successType, errorType ] = types

  return callApi(endpoint).then(
    response =>
      next({
        response,
        type: successType
      }),
    error => next({
      error: error.message || 'There was an error.',
      type: errorType
    })
  )
}