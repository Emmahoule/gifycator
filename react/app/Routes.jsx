import React from 'react'
import { Route, Router, IndexRoute } from "react-router";
import createHashHistory from 'history/lib/createHashHistory';
// import createBrowserHistory from 'history/lib/createBrowserHistory';

import { useBasename } from 'history';

import Frame from './containers/Frame'

import Homepage from './containers/Homepage'

import CreateStory from './containers/create-story/CreateStory'
import CreateGif from './containers/create-story/CreateGif'
import ConcatGifs from './containers/create-story/ConcatGifs'

import Gallery from './containers/gallery/Gallery'

// let history = useBasename(createBrowserHistory)({basename: '/html/'});
let history = useBasename(createHashHistory)({basename: '/html/'});

export class Routes extends React.Component {
	render(){
		return(
			<Router history={history}>
				<Route path="/" component={Frame}>
					<IndexRoute component={Homepage} />
					<Route component={Gallery}/>
					<Route path="create-story" component={CreateStory}>
						<IndexRoute component={CreateGif} />
						<Route path="manipulate-gif" component={ConcatGifs}/>
					</Route>
				</Route>
			</Router>
		);
	}
}
