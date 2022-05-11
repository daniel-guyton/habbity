import React from 'react'
import { screen, render } from '@testing-library/react'
import { MemoryRouter as Router } from 'react-router-dom'

import Statspage from '../Statspage'


test('statspage header is displayed', () => {
  render(

    <Router>
      <Statspage />
    </Router>


    
 )
 const header = screen.getByText(/journey/i)
 expect(header.innerHTML).toMatch(/Here's Your Journey so Far!/)
})
