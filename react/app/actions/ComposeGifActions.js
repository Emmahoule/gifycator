export const ADD_BOX_TO_STORY = 'ADD_BOX_TO_STORY';
export const DELETE_BOX_TO_STORY = 'DELETE_BOX_TO_STORY';
export const ADD_GIF_FILE_TO_STORY = 'ADD_GIF_FILE_TO_STORY';
export const REMOVE_ALL_BOX_TO_STORY = 'REMOVE_ALL_BOX_TO_STORY';
export const READ_GIFS_STORY = 'READ_GIFS_STORY';
import { config } from '../config.js'
const API_URL = config.API_URL;


// Ajouter un champ pour créer une histoire
export function addBoxToStory() {
  return {
    type: ADD_BOX_TO_STORY
  }
}

// Supprimer un champ de l'histoire
export function deleteBoxToStory(id) {
  return {
    type: DELETE_BOX_TO_STORY,
    id
  }
}

// Ajouter un file 
export function addGifFileToStory(id, file) {
  return {
    type: ADD_GIF_FILE_TO_STORY,
    id,
    file,
  }
}

// Supprimer toutes les box de l'histoire
export function removeAllBoxToStory() {
  return {
    type: REMOVE_ALL_BOX_TO_STORY
  }
}

// Lire les gifs
export function readGifsStory() {
  return {
    type: READ_GIFS_STORY
  }
}

