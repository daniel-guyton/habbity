// if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
//   const envConfig = require('dotenv').config()
//   if (envConfig.error) throw envConfig.error
// }

const express = require('express')
const path = require('path')
const fs = require('fs')

const server = express()

const habitRoute = require('./routes/habits')
const userRoute = require('./routes/users')

server.use(express.json())
server.use(express.static(path.join(__dirname, '../dist')))

// server.get('/api', (req, res) => {
//   res.json({ message: 'Hello World!' })
// })

server.use('/api/v1/habits', habitRoute)
server.use('/api/v1/users', userRoute)

// this loads React and resulting routes
server.get('*', (req, res) => {
  try {
    const html = fs.readFileSync(
      path.resolve(__dirname, '../dist/index.html'),
      'utf8'
    )
    res.send(html)
  } catch (err) {
    if (err.message.includes('no such file or directory')) {
      return res
        .status(404)
        .send('dist folder not found, try running `npm run build`')
    }
    return res.status(500).send('something went wrong')
  }
})

module.exports = server
