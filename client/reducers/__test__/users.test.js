import { SET_USER } from '../../actions'
import userReducer from '../user'

const mockState = {
  auth0Id: '',
  email: '',
  name: '',
  token: '',
} 

describe('userReducer', () => {
  it('set correct user', () => {
    const fakeUser = {
      auth0Id: 'testAuth0',
      email: 'test@email.com',
      name: 'habbitor',
      token: 'fakeToken', 
    }

    const action = {
      type: SET_USER,
      user: fakeUser
    }

    const expected = fakeUser
    const actual = userReducer(mockState, action)

    expect(actual).toEqual(expected)
  })
  it('returns initial state at default', () => {
    const action = ''

    const expected = mockState
    const actual = userReducer(mockState, action)

    expect(actual).toEqual(expected)
  })
})