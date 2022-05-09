import React, { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import {ChakraProvider} from '@chakra-ui/react'
// import AddTodo from './AddTodo'
import SidebarWithHeader from './SidebarWithHeader'
import Habits from './Habits'
import Home from './Home'
import Badges from './Badges'
import Register from './Register'

import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'
import { useAuth0 } from '@auth0/auth0-react'
import { cacheUser } from '../auth0-utils'

function App() {
  useEffect(() => {}, [])
  cacheUser(useAuth0)

  return (
      <ChakraProvider>
        <IfAuthenticated>
          <SidebarWithHeader>
            <Routes>
              <Route path='/' element={<Habits />} />
              <Route path='/badges' element={<Badges />} />
              <Route path='/register' element={<Register />} />
            </Routes>
          </SidebarWithHeader>
        </IfAuthenticated>
        <IfNotAuthenticated>
          <Home />
        </IfNotAuthenticated>
      </ChakraProvider>
  )
}

export default App
