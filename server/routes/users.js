const express = require('express')

const db = require('../db/db')

const router = express.Router()

router.get('/', (req, res) => {
  db.getUsers()
    .then((users) => {
      return res.json(users)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).send({ message: 'Failed to fetch users (ಠ︹ಠ)' })
    })
})

router.post('/', (req, res) => {
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
