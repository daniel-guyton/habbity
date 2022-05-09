import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/provider'
import { Provider } from 'react-redux'
import { Auth0Provider } from '@auth0/auth0-react'

import store from './store'
import App from './components/App'

document.addEventListener('DOMContentLoaded', () => {
  render(
    <React.StrictMode>
      <Provider store={store}>
        <ChakraProvider>
          <BrowserRouter>
            <Auth0Provider
              domain={'whai-2022-chen.au.auth0.com'}
              clientId={'BlsLtFv0v5kfiVayzuSaE0Jru4zBkePc'}
              redirectUri={window.location.origin}
              audience="https://habbity/api"
            >
              <App />
            </Auth0Provider>
          </BrowserRouter>
        </ChakraProvider>
      </Provider>
    </React.StrictMode>,
    document.getElementById('app')
  )
})
