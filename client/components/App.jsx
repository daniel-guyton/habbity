import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
// import AddTodo from './AddTodo'
import SidebarWithHeader from './SidebarWithHeader'
import Habits from './Habits'
import Home from './Home'
import Badges from './Badges'
import Register from './Register'

import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'
import { useAuth0 } from '@auth0/auth0-react'
import { cacheUser } from '../auth0-utils'
import { fetchProfile } from '../actions'
import { useSelector, useDispatch } from 'react-redux'
function App() {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const [isRegistered, setIsRegistered] = useState(false)

  function register() {
    setIsRegistered(true)
  }
  useEffect(() => {
    if (user.token && isRegistered) {
      dispatch(fetchProfile(user.token))
    }
  }, [user.token, isRegistered])

  cacheUser(useAuth0, user)

  return (
    <ChakraProvider>
      <IfAuthenticated>
        <SidebarWithHeader>
          <Routes>
            <Route path="/" element={<Habits />} />
            <Route path="/badges" element={<Badges />} />
            <Route
              path="/register"
              element={
                <Register onRegister={register} isRegistered={isRegistered} />
              }
            />
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
