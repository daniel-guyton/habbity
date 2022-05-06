import React, { useEffect } from 'react'
// import AddTodo from './AddTodo'
import SidebarWithHeader from './SidebarWithHeader'
import Habits from './Habits'
import {ChakraProvider} from '@chakra-ui/react'


function App() {
  useEffect(() => {}, [])

  return (
      <ChakraProvider>
        <SidebarWithHeader>
          <Habits />
        </SidebarWithHeader>
      </ChakraProvider>
  )
}

export default App
