import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { fireEvent, screen, render, act } from '@testing-library/react'
// import { useAuth0 } from '@auth0/auth0-react'
import Badges from '../Badges'
import '@testing-library/jest-dom'
import * as redux from 'react-redux'
import * as api from '../../apis/apiClient'

// jest.mock('@auth0/auth0-react')
jest.mock('react-redux')
jest.mock('../../apis/apiClient')
jest.mock('../../store')

const fakeUserData = { 
  user: jest.fn(),
  profile: jest.fn(),
}
const getBadge = jest.spyOn(api, 'getBadge')
const getUserByAuth0Id = jest.spyOn(api, 'getUserByAuth0Id')
const updateBadgeByUser = jest.spyOn(api, 'updateBadgeByUser')

const fakeUser = {
  auth0Id: 'testAuth0|eunice123',
  email: 'eunice@test.com',
  name: 'Eunice',
  token: 'fakeToken'
}
const fakeProfile = {
  auth0Id: 'testAuth0|eunice123',
  email: 'eunice@test.com',
  name: 'Eunice',
  token: 'fakeToken',
  points: 100
}
const fakeBadgeUrl = { embed_url: 'fake_test_url'}
const fakeUserInfo = {
  id: 1,
  auth0Id: 'testAuth0|eunice123',
  email: 'eunice@test.com',
  name: 'Eunice',
  points: 100,
  badges: 'url1,url2'
}

fakeUserData.user.mockReturnValue(fakeUser)
fakeUserData.profile.mockReturnValue(fakeProfile)

getBadge.mockReturnValue(fakeBadgeUrl)
const userInfoPromise = new Promise((resolve) => {
  act(() => resolve({ fakeUserInfo }))
})
getUserByAuth0Id.mockReturnValue(userInfoPromise)
updateBadgeByUser.mockReturnValue('')

describe('<Badges />', () => {
  it('calculate the number of new badges to be awarded to user', () => {
    redux.useSelector.mockImplementation((f) => {
      return f({
        user: fakeUser,
        profile: fakeProfile
      })
    })

    expect.assertions(1)

    render(<Router><Badges /></Router>)

    const pointsDisplay = screen.getByText('xp')
    expect(pointsDisplay).toContain(100)
  })
  it.todo('reveal the badge when user click reveal button')
  it.todo('fetch new giphy url')
  it.todo('return a new giphy url when shuffle button clicked')
  it.todo('calls the updateUserBadges function when confirm button clicked')
  it.todo('send user badge urls to db')
})