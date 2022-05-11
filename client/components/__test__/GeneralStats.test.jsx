import { MemoryRouter as Router } from 'react-router-dom'
import React from 'react'
import { screen, render, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import GeneralStats from '../Graphs/GeneralStats'
import { Provider } from 'react-redux'
import { createFetchPayload } from '../../actions'

jest.mock('../../actions')
const fakeProducts = {
   goals: [
    { id: 1, goal: 'go for a fish', daysCompleted: 10, status: 'failed' },
    { id: 2, goal: 'play minecraft', daysCompleted: 900, status: 'completed',  },
    { id: 2, goal: 'play eldenring', daysCompleted: 1, status: 'progress',  }
  ]
}

const fakeStore = {
  subscribe: jest.fn(),
  getState: () => fakeProducts
  ,
  dispatch: jest.fn()
}

beforeEach(() => {
  jest.clearAllMocks()
})

describe('<GeneralStats />', () => {
  it('shows titles of boxes', async () => {
    render(
      <Provider store={fakeStore}>
        <Router>
          <GeneralStats />
        </Router>
      </Provider>
    )
    
    await waitFor(() => createFetchPayload.mock.calls.length > 0)
  
    const title1 = screen.getByText(/TOP CURRENT DAY RUN/i)
    const para = screen.getByText(/You've been keeping up/i)
    const para2 = screen.getByText(/days/)

    expect(title1).toBeInTheDocument()
    expect(para.innerHTML).toMatch(/play eldenring/)
   expect(para2.innerHTML).toMatch(/10/)
  })
  
})
