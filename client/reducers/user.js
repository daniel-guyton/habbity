import { SET_USER } from '../actions'

const emptyUser = {
  auth0Id: '',
  email: '',
  name: '',
  token: ''
}

export default function userReducer (state = emptyUser, action) {
  switch (action.type) {
    case SET_USER:
      return action.user
    default:
      return state
  }
}