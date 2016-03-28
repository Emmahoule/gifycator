import { config } from '../config.js'
const API_URL = config.API_URL;

export const CONCAT_GIFS_REQUEST = 'CONCAT_GIFS_REQUEST';
export const CONCAT_GIFS_SUCCESS = 'CONCAT_GIFS_SUCCESS';
export const CONCAT_GIFS_FAILURE = 'CONCAT_GIFS_FAILURE';
export const CLEAR_STORY = 'CLEAR_STORY';


export const SAVE_STORY_REQUEST = 'SAVE_STORY_REQUEST';
export const SAVE_STORY_SUCCESS = 'SAVE_STORY_SUCCESS';
export const SAVE_STORY_FAILURE = 'SAVE_STORY_FAILURE';

// Envoie de la requête pour concaténer les gifs
function requestConcatGifs() {
  return {
    type: CONCAT_GIFS_REQUEST,
    isFetching: true
  }
}

// Reception de la requête pour concaténer les gifs
function receiveConcatGifs(story) {
  return {
    type: CONCAT_GIFS_SUCCESS,
    isFetching: false,
    story
  }
}

// Reception d'une erreur lors de la concaténation des gifs
function concatGifsError(message) {
  return {
    type: CONCAT_GIFS_FAILURE,
    isFetching: false,
    message
  }
}

// Requête pour concaténer les gifs
export function concatGifs(imgs) {

  let config = {
    method: 'POST',
    body: imgs
  }

  return dispatch => {
    dispatch(requestConcatGifs())

    return fetch(API_URL+'api/create-story', config)
      .then(response =>
        response.text().then(story => ({ story, response }))
            ).then(({ story, response }) =>  {
        if (!response.ok) {
          dispatch(concatGifsError("Sorry, your story has not been created."))
          return Promise.reject(story)
        } else {
          dispatch(receiveConcatGifs(story))
        }
      }).catch(err => console.log("Error: ", err))
  }
}

// Remise de l'état du reducer à 0
export function clearStory() {
  return {
    type: CLEAR_STORY
  }
}


// Envoie de la requête pour enregistrer l'histoire
function requestSaveStory() {
  return {
    type: SAVE_STORY_REQUEST,
    isFetching: true
  }
}

// Reception de la requête pour enregistrer l'histoire
function receiveSaveStory(dataStory) {
  return {
    type: SAVE_STORY_SUCCESS,
    isFetching: false,
    dataStory
  }
}

// Reception d'une erreur lors de l'envoie de la requête enregistrer l'histoire 
function saveStoryError(message) {
  return {
    type: SAVE_STORY_FAILURE,
    isFetching: false,
    message
  }
}

// Requête pour enregistrer l'histoire dans la BDD
export function saveStory(story, history) {

  let config = {
    method: 'POST',
    body: story
  }

  return dispatch => {
    dispatch(requestSaveStory())

    return fetch(API_URL+'api/gif', config)
      .then(response =>
        response.json().then(dataStory => ({ dataStory, response }))
            ).then(({ dataStory, response }) =>  {
        if (!response.ok) {
          dispatch(saveStoryError("Sorry, your story has not been saved."))
          return Promise.reject(dataStory)
        } else {
          dispatch(receiveSaveStory(dataStory))
          history.push('create-story/your-gif');
        }
      }).catch(err => console.log("Error: ", err))
  }
}

