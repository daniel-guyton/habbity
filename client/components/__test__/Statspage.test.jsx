import React from 'react'
import { screen, render } from '@testing-library/react'
import { MemoryRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import Statspage from '../Statspage'

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

window.ResizeObserver =
    window.ResizeObserver ||
    jest.fn().mockImplementation(() => ({
        disconnect: jest.fn(),
        observe: jest.fn(),
        unobserve: jest.fn(),
    }));

test('statspage header is displayed', () => {
  render(
<Provider store={fakeStore}>
    <Router>
      <Statspage />
    </Router>
</Provider>

    
 )
 const header = screen.getByText(/journey/i)
 expect(header.innerHTML).toMatch(/Here's Your Journey so Far!/)
})
