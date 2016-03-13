import { combineReducers } from 'redux'

import { ADD_BOX_TO_STORY, DELETE_BOX_TO_STORY, ADD_GIF_FILE_TO_STORY, REMOVE_ALL_BOX_TO_STORY, READ_GIFS_STORY } from '../actions/CreateGifActions.js'

import { TYPE_REQUEST, TYPE_SUCCESS, TYPE_FAILURE } from '../actions/TypeActions.js'



/* Create Story Reducer :
 * - ADD_BOX_TO_STORY
 * - DELETE_BOX_TO_STORY
 * - ADD_GIF_FILE_TO_STORY
 * - REMOVE_ALL_BOX_TO_STORY
*/

function uploadFrame(id)  {
  return({
    id: id,
    file: null
  });
}

function createGifStory(state = {
    idCounter: 0, 
    imgs: [],
    complete : false
  }, action) {
  switch (action.type) {

    case ADD_BOX_TO_STORY:
      let newIdCounter = state.idCounter + 1;
      let newImg = new uploadFrame(newIdCounter);
      if (state.imgs.length>=4) {
        state.complete = true; 
      }
      return Object.assign({}, state, {
        idCounter: newIdCounter,
        imgs: state.imgs.concat(newImg),
        complete: state.complete
      })

    case DELETE_BOX_TO_STORY:
      let newTabImgs = state.imgs.filter(img=>img.id!==action.id);
      if (newTabImgs.length<=4) {
        state.complete = false;
      }
      return Object.assign({}, state, {
        idCounter: state.idCounter,
        imgs: newTabImgs,
        complete: state.complete
      })

    case ADD_GIF_FILE_TO_STORY:
      let image = state.imgs.find(img=>img.id === action.id);
      image.file = action.file;
      return Object.assign({}, state, {
        idCounter: state.idCounter,
        imgs: state.imgs,
        complete: state.complete
      })
    
    case REMOVE_ALL_BOX_TO_STORY:
      state.idCounter = 0;
      state.imgs = [];

    case READ_GIFS_STORY:
      return Object.assign({}, state, {
        idCounter: state.idCounter,
        imgs: state.imgs,
        complete: state.complete
      })

    default:
      return state
  }
}



function myAction(state = {
    isFetching: false
  }, action) {
  switch (action.type) {
    case TYPE_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        user: action.creds
      })
    case TYPE_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: 'Error message'
      })
    case TYPE_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: action.message
      })
    default:
      return state
  }
}

const myApp = combineReducers({
  myAction, createGifStory
})

export default myApp

