import { SET_PROFILE } from '../actions'

const emptyUser = {
  auth0Id: '',
  email: '',
  name: '',
  token: '',
  points: 0,
  badges: [],
}

export default function profilesReducer(state = emptyUser, action) {
  switch (action.type) {
    case SET_PROFILE:
      return action.payload.profile
    default:
      return state
  }
}
