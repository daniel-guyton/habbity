require('dotenv').config()
const express = require('express')
const request = require('superagent')
const { authCheck } = require('../authCheck')

const apiKey = process.env.API_KEY
const router = express.Router()

router.get('/', authCheck, (req, res) => {
  request
    .get(
      `https://api.giphy.com/v1/gifs/random?api_key=${apiKey}&tag=motivational&rating=g`
    )
    .then((giphy) => {
    
      return res.json(giphy.body.data)
    })
    .catch((err) => {
      res.status(500).send(err.message)
    })
})

module.exports = router
