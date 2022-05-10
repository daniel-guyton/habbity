import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import XP from '../XP'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'

describe('<XP />', () => {
  const state = {
    profile: {
      points: 1,
    },
  }
  const store = {
    getState: () => state,
    subscribe: jest.fn(),
  }
  it('checks if the sidebar links are being rendered', () => {
    render(
      <Provider store={store}>
        <Router>
          <XP />
        </Router>
      </Provider>
    )
    // screen.debug()

    const XPSpan = screen.getAllByText(/XP/i)

    expect(XPSpan[0].textContent).toBe('XP: 1')
  })
})