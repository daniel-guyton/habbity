const express = require('express')
const path = require('path')

const server = express()

server.use(express.json())
server.use(express.static(path.join(__dirname, 'public')))

server.use('/api/v1/habits/', require('./routes/habits.js'))
server.use('/api/v1/users/', require('./routes/users.js'))

// this loads React and resulting routes
server.get('*', (req, res) => {
 res.sendFile(path.join(__dirname, './public/index.html'))
})

module.exports = server
