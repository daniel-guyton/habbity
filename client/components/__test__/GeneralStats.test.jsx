import { MemoryRouter as Router } from 'react-router-dom'
import React from 'react'
import { screen, render, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import GeneralStats from '../Graphs/GeneralStats'
import { Provider } from 'react-redux'
import { createFetchPayload } from '../../actions'

jest.mock('../../actions')
const fakeProducts = 
   [
    { id: 1, goal: 'go for a fish', daysCompleted: 10, status: 'failed' },
    { id: 2, goal: 'play minecraft', daysCompleted: 900, status: 'completed',  }
  ]


const fakeStore = {
  subscribe: jest.fn(),
  getState: jest.fn(() => {
    return fakeProducts
  }),
  dispatch: jest.fn()
}

beforeEach(() => {
  jest.clearAllMocks()
})

describe('<Items />', () => {
  it('shows links', async () => {
    render(
      <Provider store={fakeStore}>
        <Router>
          <GeneralStats />
        </Router>
      </Provider>
    )
    await waitFor(() => createFetchPayload.mock.calls.length > 0)

    const link = screen.getAllByRole('link')
    expect(link[0]).toHaveTextContent('Doggo')
    expect(link[1]).toHaveTextContent('fish')
  })
  it('dispatches fetchProducts', async () => {
    render(
      <Provider store={fakeStore}>
        <Router>
          <GeneralStats />
        </Router>
      </Provider>
    )
    await waitFor(() => createFetchPayload.mock.calls.length > 0)
    expect(createFetchPayload).toHaveBeenCalled()
  })
})
