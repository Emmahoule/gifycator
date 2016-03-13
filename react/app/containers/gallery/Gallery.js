import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

class Gallery extends Component {
  render() {
  	const { dispatch } = this.props
    return (
      	<div>
          MyContainer
        </div>
    )
  }
}

function mapStateToProps(state) {

  const { myAction } = state
  const { errorMessage } = myAction

  return {
    errorMessage
  }
}

export default connect(mapStateToProps)(Gallery)