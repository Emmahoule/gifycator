import './src/sass/main.scss';

import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'

import { Routes } from "./Routes";

import myApp from './reducers/reducers'
import thunkMiddleware from 'redux-thunk'
import createLogger from "redux-logger";

import api from './middleware/api'

// Logs de l'état de l'application
const logger = createLogger();

// Création du store Redux qui stockera l'état global de l'application
let createStoreWithMiddleware = applyMiddleware(thunkMiddleware, api, logger)(createStore)
let store = createStoreWithMiddleware(myApp)

// Point d'entrée de l'application
let rootElement = document.getElementById('root')

render(
	<Provider store={store}>
		<Routes/>
	</Provider>,
	rootElement
)