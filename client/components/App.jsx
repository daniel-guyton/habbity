import React, { useEffect } from 'react'
import {ChakraProvider} from '@chakra-ui/react'
// import AddTodo from './AddTodo'
import SidebarWithHeader from './SidebarWithHeader'
import Habits from './Habits'

import { IfAuthenticated } from './Authenticated'
import { useAuth0 } from '@auth0/auth0-react'
import { cacheUser } from '../auth0-utils'

function App() {
  useEffect(() => {}, [])
  {cacheUser(useAuth0)}

  return (
      <ChakraProvider>
        <SidebarWithHeader>
          <IfAuthenticated>
            <Habits />
          </IfAuthenticated>
        </SidebarWithHeader>
      </ChakraProvider>
  )
}

export default App
