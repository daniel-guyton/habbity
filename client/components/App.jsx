import React, { useEffect } from 'react'
// import AddTodo from './AddTodo'
import SidebarWithHeader from './SidebarWithHeader'
import { ChakraProvider } from '@chakra-ui/react'
function App() {
  useEffect(() => {}, [])

  return (
    // <>
    //   <header className="header">
    //     <h1>todos</h1>
    //     <AddTodo />
    //   </header>
    //   <section className="main"></section>
    //   <footer className="footer"></footer>
    // </>
    <ChakraProvider>
      <SidebarWithHeader />
    </ChakraProvider>
  )
}

export default App
