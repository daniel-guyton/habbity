import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/provider'
// import { Provider } from 'react-redux'

// import store from './store'
import App from './components/App'

document.addEventListener('DOMContentLoaded', () => {
  render(
    <React.StrictMode>
      <ChakraProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ChakraProvider>
    </React.StrictMode>,
    document.getElementById('app')
  )
})