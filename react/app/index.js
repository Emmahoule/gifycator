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

const logger = createLogger();

let createStoreWithMiddleware = applyMiddleware(thunkMiddleware, api, logger)(createStore)

let store = createStoreWithMiddleware(myApp)

let rootElement = document.getElementById('root')

render(
	<Provider store={store}>
		<Routes/>
	</Provider>,
	rootElement
)