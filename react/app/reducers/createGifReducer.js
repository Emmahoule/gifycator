function createGifStory(state={}, action) {
  switch (action.type) {
    case ADD_GIF_TO_STORY:
      return Object.assign({}, state, {
        isFetching: true,
        user: action.creds
      })
    default:
      return state
  }
}
