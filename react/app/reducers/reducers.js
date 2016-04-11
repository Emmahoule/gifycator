import { combineReducers } from 'redux'

import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, LOGOUT_SUCCESS } from '../actions/AuthActions.js'

import { ADD_BOX_TO_STORY, DELETE_BOX_TO_STORY, ADD_GIF_FILE_TO_STORY, REMOVE_ALL_BOX_TO_STORY, READ_GIFS_STORY } from '../actions/ComposeGifActions.js'

import { CONCAT_GIFS_REQUEST, CONCAT_GIFS_SUCCESS, CONCAT_GIFS_FAILURE, CLEAR_STORY,
        SAVE_STORY_REQUEST, SAVE_STORY_SUCCESS, SAVE_STORY_FAILURE } 
        from '../actions/CreateGifActions.js'

import { FETCH_CATEGORIES_REQUEST, FETCH_CATEGORIES_SUCCESS, FETCH_CATEGORIES_FAILURE, 
        FETCH_CATEGORY_REQUEST, FETCH_CATEGORY_SUCCESS, FETCH_CATEGORY_FAILURE, CLEAR_CATEGORY,
        FETCH_NB_GIFS_REQUEST, FETCH_NB_GIFS_SUCCESS, FETCH_NB_GIFS_FAILURE, 
        DELETE_CAT_REQUEST, DELETE_CAT_SUCCESS, DELETE_CAT_FAILURE,
        ADD_CAT_REQUEST, ADD_CAT_SUCCESS, ADD_CAT_FAILURE} from '../actions/CategoriesActions.js'

import { FETCH_GIFS_REQUEST, FETCH_GIFS_SUCCESS, FETCH_GIFS_FAILURE, CLEAR_GIFS, FETCH_GIF_REQUEST, FETCH_GIF_SUCCESS, FETCH_GIF_FAILURE, CLEAR_GIF } from '../actions/GalleryActions.js'

/* Auth Reducer :
 * - LOGIN_REQUEST
 * - LOGIN_SUCCESS
 * - LOGIN_FAILURE
 * - LOGOUT_SUCCESS
*/
function auth(state = {
    isFetching: false,
    isAuthenticated: localStorage.getItem('id_token') ? true : false
  }, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
        user: action.creds
      })
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        errorMessage: 'Vous êtes maintenant connecté'
      })
    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.message
      })
    case LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
        errorMessage: ''
      })
    default:
      return state
  }
}


/* Compose Gif Reducer :
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

function composeGifStory(state = {
    idCounter: 0, 
    imgs: [],
    files: 0,
    complete : false
  }, action) {
  switch (action.type) {

    case ADD_BOX_TO_STORY:
      let newIdCounter = state.idCounter + 1;
      let newImg = new uploadFrame(newIdCounter);
      if (state.imgs.length>=3) {
        state.complete = true; 
      }
      return Object.assign({}, state, {
        idCounter: newIdCounter,
        imgs: state.imgs.concat(newImg),
        complete: state.complete
      })

    case DELETE_BOX_TO_STORY:
      let nbFile = state.files;
      let currentImage = state.imgs.find(img=>img.id === action.id);
      if (currentImage.file!=null){
        nbFile--;
      }
      let newTabImgs = state.imgs.filter(img=>img.id!==action.id);
      if (newTabImgs.length<=3) {
        state.complete = false;
      }
      return Object.assign({}, state, {
        idCounter: state.idCounter,
        imgs: newTabImgs,
        files: nbFile,
        complete: state.complete
      })

    case ADD_GIF_FILE_TO_STORY:
      let image = state.imgs.find(img=>img.id === action.id);
      image.file = action.file;
      let nbFiles = state.files + 1;
      return Object.assign({}, state, {
        idCounter: state.idCounter,
        imgs: state.imgs,
        files: nbFiles,
        complete: state.complete
      })
    
    case REMOVE_ALL_BOX_TO_STORY:
      state.idCounter = 0;
      state.imgs = [];
      state.files = 0;

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


/* Concat Gifs Reducer :
 * - CONCAT_GIFS_REQUEST
 * - CONCAT_GIFS_SUCCESS
 * - CONCAT_GIFS_FAILURE
*/
function concatGifStory(state = {
    isFetching: false
  }, action) {
  switch (action.type) {
    case CONCAT_GIFS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })
    case CONCAT_GIFS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        story: action.story
      })
    case CONCAT_GIFS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: action.message
      })
    case CLEAR_STORY:
      return Object.assign({}, state, {
        isFetching: false,
        story: null
      })
    default:
      return state
  }
}

/* Concat Gifs Reducer :
 * - SAVE_STORY_REQUEST
 * - SAVE_STORY_SUCCESS
 * - SAVE_STORY_FAILURE
*/
function saveGifStory(state = {
    isFetching: false
  }, action) {
  switch (action.type) {
    case SAVE_STORY_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })
    case SAVE_STORY_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        dataStory: action.dataStory
      })
    case SAVE_STORY_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        errorMessage: action.message
      })
    default:
      return state
  }
}

/* Fetch categories Reducer :
 * - FETCH_CATEGORIES_REQUEST
 * - FETCH_CATEGORIES_SUCCESS
 * - FETCH_CATEGORIES_FAILURE
*/
function fetchCategories(state = {
    isFetching: false
  }, action) {
  switch (action.type) {
    case FETCH_CATEGORIES_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })
    case FETCH_CATEGORIES_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        dataCategories: action.response
      })    
    case FETCH_CATEGORIES_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      })
    default:
      return state
  }
}

/* Fetch category Reducer :
 * - FETCH_CATEGORY_REQUEST
 * - FETCH_CATEGORY_SUCCESS
 * - FETCH_CATEGORY_FAILURE
 * - CLEAR_CATEGORY
*/
function fetchCategory(state = {
    isFetching: false
  }, action) {
  switch (action.type) {
    case FETCH_CATEGORY_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })
    case FETCH_CATEGORY_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        dataCategory: action.response
      })    
    case FETCH_CATEGORY_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      })
    case CLEAR_CATEGORY:
      return Object.assign({}, state, {
        isFetching: false,
        dataCategory: null
      })
    default:
      return state
  }
}

/* Fetch number gifs Reducer :
 * - FETCH_CATEGORY_REQUEST
 * - FETCH_CATEGORY_SUCCESS
 * - FETCH_CATEGORY_FAILURE
*/
function fetchNbGifs(state = {
    isFetching: false
  }, action) {
  switch (action.type) {
    case FETCH_NB_GIFS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })
    case FETCH_NB_GIFS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        nbGifs: action.response
      })    
    case FETCH_NB_GIFS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      })
    default:
      return state
  }
}

/* Delete category reduced :
 * - DELETE_CAT_REQUEST
 * - DELETE_CAT_SUCCESS
 * - DELETE_CAT_FAILURE
*/
function deleteCat(state = {
    isFetching: false
  }, action) {
  switch (action.type) {
    case DELETE_CAT_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })
    case DELETE_CAT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        datasCatSupp: action.datasCatSupp
      })    
    case DELETE_CAT_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      })
    default:
      return state
  }
}

/* Add category reducer :
 * - ADD_CAT_REQUEST
 * - ADD_CAT_SUCCESS
 * - ADD_CAT_FAILURE
*/
function addCat(state = {
    isFetching: false
  }, action) {
  switch (action.type) {
    case ADD_CAT_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })
    case ADD_CAT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        datasCat: action.datasCat
      })    
    case ADD_CAT_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      })
    default:
      return state
  }
}

/* Fetch gifs Reducer :
 * - FETCH_GIFS_REQUEST
 * - FETCH_GIFS_SUCCESS
 * - FETCH_GIFS_FAILURE
*/
function fetchGifs(state = {
    isFetching: false
  }, action) {
  switch (action.type) {
    case FETCH_GIFS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })
    case FETCH_GIFS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        gifs: action.response
      })    
    case FETCH_GIFS_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      })
    case CLEAR_GIFS:
      return Object.assign({}, state, {
        gifs: null,
        isFetching: false
      })
    default:
      return state
  }
}

/* Fetch gif Reducer :
 * - FETCH_GIF_REQUEST
 * - FETCH_GIF_SUCCESS
 * - FETCH_GIF_FAILURE
*/
function fetchGif(state = {
    isFetching: false
  }, action) {
  switch (action.type) {
    case FETCH_GIF_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })
    case FETCH_GIF_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        gif: action.response
      })    
    case FETCH_GIF_FAILURE:
      return Object.assign({}, state, {
        isFetching: false
      })
    case CLEAR_GIF:
      return Object.assign({}, state, {
        gif: null,
        isFetching: false
      })
    default:
      return state
  }
}

const myApp = combineReducers({
  composeGifStory, concatGifStory, saveGifStory, fetchCategories, fetchCategory, fetchNbGifs, deleteCat, addCat, fetchGifs, fetchGif, auth
})

export default myApp

