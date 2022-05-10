import React from 'react'
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import SidebarWithHeader from '../SidebarWithHeader'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'

describe('<SidebarWithHeader />', () => {
  const state = {
    user: {
      token: ''
    },
    profile: {
      points: 1
    }
  }
  const store = {
    getState: () => state,
    subscribe: jest.fn()
  }
  it('checks if the sidebar links are being rendered', () => {
    render(
      <Provider store={store}>
        <Router>
          <SidebarWithHeader />
        </Router>
      </Provider>
    )
    const navItems = screen.getAllByRole('group')

    expect(navItems[0].textContent).toBe('Habits')
    expect(navItems[1].textContent).toBe('Stats')
    expect(navItems[2].textContent).toBe('Badges')
  })
})