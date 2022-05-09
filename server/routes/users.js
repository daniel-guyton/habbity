const express = require('express')
const { authCheck } = require('../authCheck')

const db = require('../db/db')

const router = express.Router()

router.get('/', authCheck, (req, res) => {
  const auth0Id = req.auth.sub
  const auth0 = auth0Id.split('|')[1]
  db.getUser(auth0)
    .then((user) => {
      return res.json(user)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send({ message: 'Failed to fetch users (ಠ︹ಠ)'})
    })
})

router.post('/', authCheck, (req, res) => {
  const user = req.body.user
  db.addUser(user)
    .then((user) => {
      return res.json(user)
    })   
    .catch((err) => {
      console.log(err)
      res.status(500).send({ message: 'Failed to add users ╰(•́ ꞈ •̀)╯' })
    })
})

module.exports = router