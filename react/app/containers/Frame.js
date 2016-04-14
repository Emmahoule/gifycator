import React, { Component, PropTypes } from 'react'
import { Link } from "react-router";
import { connect } from 'react-redux';
import { fetchCategories } from '../actions/CategoriesActions.js';

/* Container Frame : conteneur global */

class Frame extends Component {
	constructor(){
		super();
    this.state = {
      title:".Gifycator",
      currentPage: ""
    }
	}

  componentWillMount(){
    this.props.dispatch(fetchCategories());
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.location.pathname == "/"){
      this.setState({title:".Gifycator"});
    }
    if (nextProps.location.pathname == "create-story" || 
        nextProps.location.pathname == "create-story/create-gif") {
      this.setState({title:"Createstory"});
    }
    if (nextProps.location.pathname == "create-story/your-gif") {
      this.setState({title:"Amazing!"});
    }
    if (nextProps.location.pathname == "gallery") {
      this.setState({title:"Gallery"});
    }
    if (nextProps.dataCategories){
      nextProps.dataCategories.map(function(category){
        if (nextProps.location.pathname.indexOf("gallery/"+category.id)>-1) {
          return  this.setState({title:category.name});
        }
      }.bind(this));
    }
  }

	render() {
		const { isFetching, story, dataCategories } = this.props;

  	return (
    	<div className="frame">
  			<div className="frame-bg">
  				<div className="frame-bg-line">
  					<div className="frame-bg-line-inner"></div>
  				</div>
  				<div className="frame-bg-line">
  					<div className="frame-bg-line-inner"></div>
  				</div>
  				<div className="frame-bg-line">
  					<div className="frame-bg-line-inner"></div>
  				</div>
  				<div className="frame-bg-line">
  					<div className="frame-bg-line-inner"></div>
  				</div>
  				<div className="frame-bg-line">
  					<div className="frame-bg-line-inner"></div>
  				</div>
  				<div className="frame-bg-line">
  					<div className="frame-bg-line-inner"></div>
  				</div>
  				<div className="frame-bg-line">
  					<div className="frame-bg-line-inner"></div>
  				</div>
  			</div>
        <div className="frame-left-nav">
          {isFetching &&
            <Link to="create-story/create-gif" className="frame-loading frame-left-nav-link">
              <svg className="icon icon-load frame-loading-icon">
               <use xlinkHref="#icon-load"></use>
             </svg>
             <div className="frame-loading-text">Wait...</div>
           </Link>
          }
          {!isFetching && story &&
            <Link to="create-story/create-gif" className="frame-loading frame-left-nav-link">
              <div className="frame-loading-text">Story ready !</div>
            </Link>
          }
          {!isFetching &&
          <Link className="frame-left-nav-link" to="create-story">Create my story</Link>
          }
          <Link className="frame-left-nav-link" to="gallery">Gallery</Link>
        </div>
      	<div className="frame-wrapper">
      	  <div className="title-1">
		    		{this.state.title}
	      	</div>
          <Link className="frame-admin-btn" to="login">Admin</Link>
     			{this.props.children}
       	</div>
    	</div>
  	)	
	}
}

    // console.log(dataCategories);
    // let title = ".Gifycator";
    // console.log(this.props.location.pathname)
    // if (this.props.location.pathname == "create-story" || 
    //     this.props.location.pathname == "create-story/create-gif") {
    //   title = "Createstory";
    // }
    // if (this.props.location.pathname == "create-story/your-gif") {
    //   title = "Amazing!";
    // }
    // if (this.props.location.pathname == "gallery") {
    //   title = "Gallery";
    // }
    // if (dataCategories){
    //   dataCategories.map(function(category){
    //     if (this.props.location.pathname.indexOf("gallery/"+category.id)>-1) {
    //       return title = category.name;
    //     }
    //   }.bind(this));
    // }

Frame.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isFetching: PropTypes.bool,
  story: PropTypes.string,
  dataCategories: PropTypes.array
}

function mapStateToProps(state) {

  const { concatGifStory, fetchCategories } = state
  const { isFetching, story } = concatGifStory
  const { dataCategories } = fetchCategories;

  return {
    isFetching, story, dataCategories
  }
}

export default connect(mapStateToProps)(Frame)
