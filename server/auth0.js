const jwt = require('express-jwt')
const jwks = require('jwks-rsa')

const domain = 'https://whai-2022-chen.au.auth0.com'
const audience = 'https://localhost:3000/'