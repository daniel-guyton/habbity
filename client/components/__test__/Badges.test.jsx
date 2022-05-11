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
  points: 200
}
const fakeBadgeUrl = { embed_url: 'fake_test_url'}
const fakeUserInfo = {
  id: 1,
  auth0Id: 'testAuth0|eunice123',
  email: 'eunice@test.com',
  name: 'Eunice',
  points: 200,
  badges: 'url1,url2'
}

fakeUserData.user.mockReturnValue(fakeUser)
fakeUserData.profile.mockReturnValue(fakeProfile)

const userInfoPromise = new Promise((resolve) => {
  act(() => resolve(fakeUserInfo))
})
const badgeUrlPromise = new Promise((resolve) => {
  act(() => resolve(fakeBadgeUrl))
})
const updateBadgePromise = new Promise((resolve) => {
  act(() => resolve(''))
})
getUserByAuth0Id.mockReturnValue(userInfoPromise)
getBadge.mockReturnValue(badgeUrlPromise)
updateBadgeByUser.mockReturnValue(updateBadgePromise)

redux.useSelector.mockImplementation((f) => {
  return f({
    user: fakeUser,
    profile: fakeProfile
  })
})

describe('<Badges />', () => {
  it('calculate the number of new badges to be awarded to user', async () => {
    expect.assertions(3)
    await act( async() => render(<Router><Badges /></Router>))

    const pointsDisplay = screen.getByText(`${fakeProfile.points} xp`)
    const actualBadges = screen.getAllByTestId('badge')
    const expectedBadges = Math.round(Math.floor(fakeUserInfo.points / 56))
    
    expect(pointsDisplay).toBeTruthy()
    expect(actualBadges).toHaveLength(expectedBadges)
    expect(actualBadges[0].outerHTML).toContain('url1')
  })

  it('reveal the badge when user click reveal button and fetch new giphy url', async () => {
    expect.assertions(2)
    await act( async() => render(<Router><Badges /></Router>))

    const firstRevealButton = screen.getByText('Reveal New Badge!')
    await act( async() => fireEvent.click(firstRevealButton))

    expect(getBadge).toHaveBeenCalledTimes(1)
    const revealedBadge = screen.getAllByTestId('badge')
    expect(revealedBadge[2].outerHTML).toContain(fakeBadgeUrl.embed_url)
  })

  it('return a new giphy url when shuffle button clicked', async () => {
    expect.assertions(1)
    await act( async() => render(<Router><Badges /></Router>))

    const firstRevealButton = screen.getByText('Reveal New Badge!')
    await act( async() => fireEvent.click(firstRevealButton))
    const iconButtons = screen.getAllByLabelText('Change Gif')
    await act( async() => fireEvent.click(iconButtons[0]))

    expect(getBadge).toHaveBeenCalledTimes(3)
  })

  it('calls the updateUserBadges function when confirm button clicked and reset the badges', async () => {
    expect.assertions(2)
    await act( async() => render(<Router><Badges /></Router>))

    const firstRevealButton = screen.getByText('Reveal New Badge!')
    await act( async() => fireEvent.click(firstRevealButton))
    const iconButtons = screen.getAllByLabelText('Change Gif')
    await act( async() => fireEvent.click(iconButtons[1]))

    expect(updateBadgeByUser).toHaveBeenCalledTimes(1)
    expect(getUserByAuth0Id).toHaveBeenCalledTimes(6) //called 4 times as rendering <Badges /> + 2 times as isConfirmed state changes
  })

})