import profilesReducer from '../profiles'
import { SET_PROFILE, UPDATE_PROFILE } from '../../actions'

const mockState = {
  auth0Id: '',
  email: '',
  name: '',
  token: '',
  points: 0,
  badges: [],
}

const fakeProfile = {
  auth0Id: 'auth0test',
  email: 'test@email.com',
  name: 'Habbity',
  token: 'fakeToken',
  points: 100,
  badges: ['urlToGiphy'],
}

describe('profilesReducer', () => {
  it('set the correct user profile', () => {
    const action = {
      type: SET_PROFILE,
      payload: { profile: fakeProfile }
    }

    const expected = fakeProfile
    const actual = profilesReducer(mockState, action)

    expect(actual).toEqual(expected)
  })
  it('updates the correct user information', () => {
    const fakeUpdate = { points: 2}
    const action = {
      type: UPDATE_PROFILE,
      payload: { updatedProfile: fakeUpdate }
    }

    const expected = {...fakeProfile, points: 2}
    const actual = profilesReducer(fakeProfile, action)

    expect(actual).toEqual(expected)
  })
  it('returns the state at default', () => {
    const action = ''

    const expected = mockState
    const actual = profilesReducer(mockState, action)

    expect(actual).toEqual(expected)
  })
})