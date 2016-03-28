import React from 'react'
import { Route, Router, IndexRoute } from "react-router";
import createHashHistory from 'history/lib/createHashHistory';
// import createBrowserHistory from 'history/lib/createBrowserHistory';

import { useBasename } from 'history';

import Frame from './containers/Frame'

import Homepage from './containers/Homepage'

import CreateStory from './containers/create-story/CreateStory'
import ComposeGif from './containers/create-story/ComposeGif'
import CreateGif from './containers/create-story/CreateGif'
import ViewGif from './containers/create-story/ViewGif'

import Gallery from './containers/gallery/Gallery'
import ChooseCategory from './containers/gallery/ChooseCategory'
import CategoryGallery from './containers/gallery/CategoryGallery'
import ItemGallery from './components/ItemGallery'

// let history = useBasename(createBrowserHistory)({basename: '/html/'});
let history = useBasename(createHashHistory)({basename: '/html/'});

export class Routes extends React.Component {
	render(){
		return(
			<Router history={history}>
				<Route path="/" component={Frame}>
					<IndexRoute component={Homepage} />
					<Route path="gallery" component={Gallery}>
						<IndexRoute component={ChooseCategory} />
						<Route path=":id" component={CategoryGallery} >
							<Route path=":id" component={ItemGallery} />
						</Route>
					</Route>
					<Route path="create-story" component={CreateStory}>
						<IndexRoute component={ComposeGif} />
						<Route path="create-gif" component={CreateGif}/>
						<Route path="your-gif" component={ViewGif}/>
					</Route>
				</Route>
			</Router>
		);
	}
}