import { config } from "../config.js";

/*  Middleware callApi : 
 *
 *  Middleware permettant de faire des requêtes à l'API
*/
const API_URL = config.API_URL

function callApi(endpoint, callback) {

  return fetch(API_URL + endpoint, config)
    .then(response => 
      response.json().then(text => {
        if (typeof(callback) === "function") {
          callback();
        }
        return ({ text, response });
      })
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

  let { callback, endpoint, types, authenticated } = callAPI

  const [ requestType, successType, errorType ] = types

  return callApi(endpoint, callback).then(
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