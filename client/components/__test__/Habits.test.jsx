import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'

import Habits from '../Habits'

import { Provider } from 'react-redux'

describe('<Habits />', () => {
  const state = {
    user: {
      token: '',
    },
    goals: [],
  }
  const store = {
    getState: () => state,
    subscribe: jest.fn(),
  }
  it('should check if habits is rendered', () => {
    render(
      <Provider store={store}>
        <Habits />
      </Provider>
    )

    const columsList = screen.getAllByTestId('column-titles')
    expect(columsList[0].textContent).toContain('In Progress')
    expect(columsList[1].textContent).toContain('Completed')
    expect(columsList[2].textContent).toContain('To Continue')
  })
})